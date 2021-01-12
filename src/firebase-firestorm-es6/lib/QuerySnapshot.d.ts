import { firestore } from 'firebase/app';
import Query from './Query';
import Entity from './Entity';
import { IQuerySnapshot, ICollection, DocumentChange } from './types';
/**
 * A wrapper around the Firestore QuerySnapshot class.
 */
export default class QuerySnapshot<T extends Entity> implements IQuerySnapshot<T> {
    /**
     * @hidden
     */
    private _Entity;
    /**
     * @hidden
     */
    private _collection;
    /**
     * @hidden
     */
    private _nativeSnapshot;
    /**
     * @hidden
     */
    private _docs;
    /**
     * @hidden
     */
    private _query;
    /**
     * Creates a query snapshot from firestore snapshot.
     * @param nativeSnapshot The native query snapshot.
     * @param Entity The entity to represention.
     * @param collection The collection for the entity.
     * @param query The query which was run.
     */
    constructor(nativeSnapshot: firestore.QuerySnapshot, Entity: new () => T, collection: ICollection<T>, query: Query<T>);
    /**
     * The docs in the snapshot.
     */
    readonly docs: T[];
    /**
     * The number of docs in the snapshot.
     */
    readonly size: number;
    /**
     * Whether or not the snapshot is empty.
     */
    readonly empty: boolean;
    /**
     * The snapshot metadata.
     */
    readonly metadata: firestore.SnapshotMetadata;
    /**
     * The query which resulted in the snapshot.
     */
    readonly query: Query<T>;
    /**
     * Executes a callback function on the snapshot docs.
     * @param callback The function to run on each doc.
     */
    forEach(callback: ((doc: T, index: number) => void)): void;
    /**
     * Returns an array of the document changes since the last snapshot.
     * @param opts Options to control what type of changes to include in the results.
     */
    docChanges(opts?: firestore.SnapshotListenOptions): DocumentChange<T>[];
    /**
     * Helper function to deserialize snapshot value.
     * @hidden
     */
    private deserializeValue;
}
