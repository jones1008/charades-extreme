import { FieldTypes } from '../types';
import FieldUtils from '../utils/FieldUtils';
import { getOrCreateRepository } from '../store';
import { GeoPoint } from '../';
/**
 * Deserializes a firestore geopoint into a firestorm geopoint.
 * @param isArray Is the field an array.
 * @param value The firestore geopoint(s) representation.
 */
const deserialize = (isArray, value) => {
    return FieldUtils.process(isArray, value, (v) => new GeoPoint(v.latitude, v.longitude));
};
/**
 * Serializes our representation of a geopoint into a firestorm geopoint;
 * @param isArray Whether the field is an array.
 * @param value The firestorm geopoint(s) representation.
 */
const serialize = (isArray, value) => {
    return FieldUtils.process(isArray, value, (v) => v.native);
};
/**
 * Converts our firestorm representation of geopoint to human-readable format.
 * @param isArray Whether the field is an aray
 * @param value The firestorm geopoint(s) representation.
 */
const toData = (isArray, value) => FieldUtils.process(isArray, value, (v) => ({
    latitude: v.latitude,
    longitude: v.longitude,
}));
/**
 * Registers a geopoint field.
 * @param fieldConfig The field configuration for the geopoint.
 */
export default function (fieldConfig) {
    return function (target, key) {
        const type = Reflect.getMetadata('design:type', target, key);
        // Process the field configuration.
        const field = FieldUtils.configure(fieldConfig || {}, key, type(), FieldTypes.GeoPoint);
        // Serialization Functions
        field.deserialize = (value) => deserialize(field.isArray, value);
        field.serialize = (value) => serialize(field.isArray, value);
        field.toData = (value) => toData(field.isArray, value);
        // Register the field for the parent entity.
        const repository = getOrCreateRepository(target.constructor.name);
        repository.fields.set(key, field);
    };
}
;
