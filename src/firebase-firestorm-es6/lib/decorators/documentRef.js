import { FieldTypes } from '../types';
import FieldUtils from '../utils/FieldUtils';
import { getOrCreateRepository, getRepository } from '../store';
import { Collection, DocumentRef } from '../';
/**
 * Deserializes a firestore document reference into a firestorm document reference.
 * @param isArray Is the field an array.
 * @param value The firestore geopoint(s) representation.
 */
const serialize = (isArray, value) => {
    return FieldUtils.process(isArray, value, (v) => v.native);
};
/**
 * Deserializes firestore document ref(s) into our representation.
 * @param isArray Is the field an array.
 * @param entity The entity of the document.
 * @param value The firestore document ref(s).
 */
const deserialize = (isArray, entity, value) => {
    const deserializeValue = (firestoreDocRef) => {
        let parentEntityName = entity.prototype.constructor.name;
        let firestoreParent = firestoreDocRef.parent || null;
        /**
         * Recursive function to construct the parent tree of a document referenc.e
         * @param entityName Name of the entity (in the repository store).
         * @param firestoreCollectionRef The firestore collection reference.
         */
        const buildCollectionTree = (entityName, firestoreCollectionRef) => {
            const collectionRepository = getRepository(entityName);
            if (collectionRepository.entity) {
                if (!collectionRepository.parent) {
                    return Collection(collectionRepository.entity);
                }
                if (firestoreCollectionRef.parent
                    && firestoreCollectionRef.parent.parent
                    && collectionRepository.parent.entity) {
                    return Collection(collectionRepository.entity, DocumentRef(firestoreCollectionRef.parent.id, collectionRepository.entity, buildCollectionTree(collectionRepository.parent.entity.prototype.constructor.name, firestoreCollectionRef.parent.parent)));
                }
            }
        };
        return DocumentRef(firestoreDocRef.id, entity, buildCollectionTree(parentEntityName, firestoreParent));
    };
    if (isArray) {
        return value.map(deserializeValue);
    }
    else {
        return deserializeValue(value);
    }
};
/**
 * Converts a document reference into a human-readable format.
 * If the document ref's data has been fetched, include the data,
 * otherwise skip it.
 * @param isArray Is the field an array.
 * @param value Our document ref(s) to convert.
 */
const toData = (isArray, value) => {
    const valueToData = (v) => {
        if (v.isFetched() && v.cached !== null) {
            return v.cached.toData();
        }
    };
    if (isArray) {
        return value.map(valueToData).filter((v) => Boolean(v));
    }
    else {
        return valueToData(value);
    }
};
/**
 * Registers a document reference field.
 * @param docRefConfig The field configuration.
 */
export default function (docRefConfig) {
    return function (target, key) {
        const type = Reflect.getMetadata('design:type', target, key);
        const field = FieldUtils.configure(docRefConfig, key, type(), FieldTypes.DocumentReference);
        field.entity = docRefConfig.entity;
        // Serialization Functions
        field.serialize = (value) => {
            return serialize(field.isArray, value);
        };
        field.deserialize = (value) => {
            return deserialize(field.isArray, field.entity, value);
        };
        field.toData = (value) => {
            return toData(field.isArray, value);
        };
        // Register the document reference field.
        const repository = getOrCreateRepository(target.constructor.name);
        repository.fields.set(key, field);
    };
}
;
