import { FieldTypes } from '../types';
import FieldUtils from '../utils/FieldUtils';
import { getOrCreateRepository } from '../store';
export default function (fieldConfig) {
    return function (target, key) {
        const type = Reflect.getMetadata('design:type', target, key);
        const field = FieldUtils.configure(fieldConfig || {}, key, type(), FieldTypes.Standard);
        field.serialize = (value) => value;
        field.deserialize = (value) => value;
        field.toData = (value) => value;
        const repository = getOrCreateRepository(target.constructor.name);
        repository.fields.set(key, field);
    };
}
;
