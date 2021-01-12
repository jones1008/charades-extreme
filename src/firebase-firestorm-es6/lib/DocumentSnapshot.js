import { FirestoreSerializer } from './utils';
export default class DocumentSnapshot {
    /**
     * Creates a document snapshot.
     * @param nativeSnapshot The firestore DocumentSnapshot.
     * @param Entity The entity to represent.
     * @param collection The parent collection for the entity.
     */
    constructor(nativeSnapshot, Entity, collection) {
        this._nativeSnapshot = nativeSnapshot;
        this._doc = FirestoreSerializer.deserialize(nativeSnapshot, Entity, collection);
    }
    /**
     * The document in the snapshot.
     */
    get doc() { return this._doc; }
    /**
     * Whether or not the document exists.
     */
    get exists() { return this._nativeSnapshot.exists; }
    /**
     * The document reference.
     */
    get ref() { return this._doc.ref; }
    /**
     * The metadata for the reference.
     */
    get metadata() { return this._nativeSnapshot.metadata; }
}
