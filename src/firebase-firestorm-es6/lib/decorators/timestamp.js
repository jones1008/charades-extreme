import { firestore } from 'firebase/app';
import { FieldTypes, WriteTypes } from '../types';
import FieldUtils from '../utils/FieldUtils';
import { getOrCreateRepository } from '../store';
import { Timestamp } from '../fields';
/**
 * Serializes our representation of a timestamp to firestores.
 * @param isArray Is the field an array.
 * @param updateOnWrite Should the value be auto-updated on creation & updates.
 * @param updateOnCreate Should the value be auto-updated on creation.
 * @param updateOnUpdate Should the value be auto-updated on updates.
 * @param writeType Whether the write is a create or update.
 * @param value A manual value to provide.
 */
const serialize = (isArray, updateOnWrite, updateOnCreate, updateOnUpdate, writeType, value) => {
    return FieldUtils.process(isArray, value, (v) => {
        const isAutoWriteCondition = writeType === WriteTypes.Create && (updateOnWrite || updateOnCreate);
        const isAutoUpdateConfition = writeType === WriteTypes.Update && (updateOnWrite || updateOnUpdate);
        if (isAutoWriteCondition || isAutoUpdateConfition) {
            return firestore.FieldValue.serverTimestamp();
        }
        else if (v && v.native) {
            return v.native;
        }
        else {
            return undefined;
        }
    });
};
/**
 * Deserializes a firestore timestamp into a firestorm timestamp.
 * @param isArray Is the field an array.
 * @param value The firestore timestamp to deserialize.
 */
const deserialize = (isArray, value) => {
    return FieldUtils.process(isArray, value, (v) => {
        return new Timestamp(v.seconds, v.nanoseconds);
    });
};
/**
 * Converts a firestorm timestamp into a string representation.
 * @param isArray Is the field an array.
 * @param format A custom formatter for the date value.
 * @param value A firestorm timestamp.
 */
const toData = (isArray, format, value) => {
    return FieldUtils.process(isArray, value, (v) => format(v.toDate()));
};
export default function (fieldConfig) {
    return function (target, key) {
        let _fieldConfig = fieldConfig || {};
        // Configure the field.
        const type = Reflect.getMetadata('design:type', target, key);
        const field = FieldUtils.configure(_fieldConfig, key, type(), FieldTypes.Timestamp);
        field.updateOnWrite = _fieldConfig.updateOnWrite || false;
        field.updateOnCreate = _fieldConfig.updateOnCreate || false;
        field.updateOnUpdate = _fieldConfig.updateOnUpdate || false;
        field.format = _fieldConfig.format || ((date) => date.toLocaleString());
        field.deserialize = (value) => {
            return deserialize(field.isArray, value);
        };
        // Serialization Functions.
        field.serialize = (value, writeType) => {
            return serialize(field.isArray, field.updateOnWrite, field.updateOnCreate, field.updateOnUpdate, writeType, value);
        };
        field.toData = (value) => {
            return toData(field.isArray, field.format, value);
        };
        // Register the timestamp field.
        const repository = getOrCreateRepository(target.constructor.name);
        repository.fields.set(key, field);
    };
}
;
