import Entity from './Entity';
import { IDocumentSnapshot, ICollection } from './types/collection.types';
import { IDocumentRef } from './types';
import { firestore } from 'firebase/app';
export default class DocumentSnapshot<T extends Entity> implements IDocumentSnapshot<T> {
    /**
     * @hidden
     */
    private _nativeSnapshot;
    /**
     * @hidden
     */
    private _doc;
    /**
     * Creates a document snapshot.
     * @param nativeSnapshot The firestore DocumentSnapshot.
     * @param Entity The entity to represent.
     * @param collection The parent collection for the entity.
     */
    constructor(nativeSnapshot: firestore.DocumentSnapshot, Entity: new () => T, collection: ICollection<T>);
    /**
     * The document in the snapshot.
     */
    readonly doc: T;
    /**
     * Whether or not the document exists.
     */
    readonly exists: boolean;
    /**
     * The document reference.
     */
    readonly ref: IDocumentRef<T>;
    /**
     * The metadata for the reference.
     */
    readonly metadata: firestore.SnapshotMetadata;
}
