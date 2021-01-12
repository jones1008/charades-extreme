import { FieldTypes } from '../types';
import { getRepository } from '../store';
import DocumentRef from '../fields/DocumentRef';
import Collection from '../Collection';
/**
 * Class to help with serialization between [[Entity]] objects and firestore documents.
 */
export default class FirestoreSerializer {
    /**
     * Serializes an [[Entity]] to an object which can be inserted into firestore.
     * @param entity Our representation of the entity.
     */
    static serialize(entity, writeType) {
        const { fields } = getRepository(entity.constructor.name);
        const serialized = {};
        serialized.id = entity.id;
        fields.forEach((value, key) => {
            const k = key;
            if (entity[k] || value.type === FieldTypes.Timestamp) {
                serialized[key] = value.serialize(entity[k], writeType);
                if (!serialized[key])
                    delete serialized[key];
            }
        });
        return serialized;
    }
    /**
     * Deserializes a firestore document into an [[Entity]].
     * @param doc The firestore document.
     * @param Model The [[Entity]] class to create an instance of.
     */
    static deserialize(doc, Model, parentCollection) {
        const { fields, subcollections } = getRepository(Model.prototype.constructor.name);
        const deserialized = new Model();
        deserialized.id = doc.id;
        const ref = DocumentRef(deserialized.id, Model, parentCollection);
        deserialized.ref = ref;
        const docData = doc.data();
        // Deserialize each of the registered fields.
        fields.forEach((value, key) => {
            if (docData[value.name]) {
                let k = key;
                deserialized[k] = value.deserialize(docData[value.name]);
            }
        });
        // Create collection references for registered subcollections.
        subcollections.forEach((value, key) => {
            if (value.entity) {
                let k = key;
                deserialized[k] = Collection(value.entity, ref);
            }
        });
        return deserialized;
    }
}
