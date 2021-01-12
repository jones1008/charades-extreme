import { FirestoreSerializer } from './utils';
/**
 * A wrapper around the Firestore QuerySnapshot class.
 */
export default class QuerySnapshot {
    /**
     * Creates a query snapshot from firestore snapshot.
     * @param nativeSnapshot The native query snapshot.
     * @param Entity The entity to represention.
     * @param collection The collection for the entity.
     * @param query The query which was run.
     */
    constructor(nativeSnapshot, Entity, collection, query) {
        /**
         * Helper function to deserialize snapshot value.
         * @hidden
         */
        this.deserializeValue = (nativeValue) => {
            return FirestoreSerializer.deserialize(nativeValue, this._Entity, this._collection);
        };
        this._Entity = Entity;
        this._collection = collection;
        this._nativeSnapshot = nativeSnapshot;
        this._docs = nativeSnapshot.docs.map(this.deserializeValue);
        this._query = query;
    }
    /**
     * The docs in the snapshot.
     */
    get docs() { return this._docs; }
    /**
     * The number of docs in the snapshot.
     */
    get size() { return this._nativeSnapshot.size; }
    /**
     * Whether or not the snapshot is empty.
     */
    get empty() { return this._nativeSnapshot.size === 0; }
    /**
     * The snapshot metadata.
     */
    get metadata() { return this._nativeSnapshot.metadata; }
    /**
     * The query which resulted in the snapshot.
     */
    get query() { return this._query; }
    /**
     * Executes a callback function on the snapshot docs.
     * @param callback The function to run on each doc.
     */
    forEach(callback) {
        this._docs.forEach(callback);
    }
    /**
     * Returns an array of the document changes since the last snapshot.
     * @param opts Options to control what type of changes to include in the results.
     */
    docChanges(opts) {
        const changes = this._nativeSnapshot.docChanges(opts).map((change) => {
            const doc = this.deserializeValue(change.doc);
            return {
                doc,
                newIndex: change.newIndex,
                oldIndex: change.oldIndex,
                type: change.type,
            };
        });
        return changes;
    }
}
