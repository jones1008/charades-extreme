import { FieldTypes } from '../types';
import FieldUtils from '../utils/FieldUtils';
import { getOrCreateRepository } from '../store';
/**
 * Deserializes an object to a firestorm object.
 * @param isArray Is the field an array.
 * @param value The registered fields of the object.
 * @param field The fields for the object.
 */
const deserialize = (isArray, value, fields, Entity) => {
    return FieldUtils.process(isArray, value, (v) => {
        const result = new Entity();
        fields.forEach((value, key) => {
            if (v[value.name]) {
                result[key] = value.deserialize(v[value.name]);
            }
        });
        return result;
    });
};
/**
 * Serializes an firestorm object into a firestore object;
 * @param isArray Whether the field is an array.
 * @param value The firestorm object.
 * @param fields The registered fields of the object.
 * @param writeType Whether it is a create or update operation.
 */
const serialize = (isArray, value, fields, writeType) => {
    return FieldUtils.process(isArray, value, (v) => {
        const result = {};
        fields.forEach((value, key) => {
            if (v[key] || value.type === FieldTypes.Timestamp) {
                result[value.name] = value.serialize(v[key], writeType);
                if (!result[value.name])
                    delete result[value.name];
            }
        });
        return result;
    });
};
/**
 * Converts our object to human-readable format.
 * @param isArray Whether the field is an aray
 * @param value The firestorm geopoint(s) representation.
 * @param fields The registered fields of the object.
 */
const toData = (isArray, value, fields) => {
    return FieldUtils.process(isArray, value, (v) => {
        const result = {};
        fields.forEach((fieldConfig, key) => {
            result[key] = fieldConfig.toData(v[key]);
        });
        Object.keys(result).forEach((key) => {
            result[key] === undefined ? delete result[key] : '';
        });
        return result;
    });
};
/**
 * Registers a new map with firestorm.
 * @param fieldConfig The field configuration
 */
export default function (fieldConfig = {}) {
    return function (target, key) {
        const type = Reflect.getMetadata('design:type', target, key);
        const field = FieldUtils.configure(fieldConfig, key, new type(), FieldTypes.Map);
        if (field.isArray && !fieldConfig.entity) {
            throw new Error(`Map arrays must be provided with an entity in ${target}[${key}]`);
        }
        field.entity = fieldConfig.entity || type;
        const repository = getOrCreateRepository(target.constructor.name);
        repository.fields.set(key, field);
        const childRepository = getOrCreateRepository(field.entity.prototype.constructor.name);
        childRepository.parent = repository;
        field.serialize = (value, writeType) => {
            return serialize(field.isArray, value, childRepository.fields, writeType);
        };
        field.deserialize = (value) => {
            return deserialize(field.isArray, value, childRepository.fields, field.entity);
        };
        field.toData = (value) => {
            return toData(field.isArray, value, childRepository.fields);
        };
    };
}
;
