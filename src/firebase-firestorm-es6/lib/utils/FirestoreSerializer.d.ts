import { firestore } from 'firebase/app';
import { ICollection, WriteTypes } from '../types';
import Entity from '../Entity';
interface ISerializedResult {
    id?: string;
    [key: string]: any;
}
/**
 * Class to help with serialization between [[Entity]] objects and firestore documents.
 */
export default class FirestoreSerializer {
    /**
     * Serializes an [[Entity]] to an object which can be inserted into firestore.
     * @param entity Our representation of the entity.
     */
    static serialize<T extends Entity>(entity: T, writeType: WriteTypes): ISerializedResult;
    /**
     * Deserializes a firestore document into an [[Entity]].
     * @param doc The firestore document.
     * @param Model The [[Entity]] class to create an instance of.
     */
    static deserialize<T extends Entity>(doc: firestore.DocumentSnapshot, Model: new () => T, parentCollection: ICollection<T>): T;
}
export {};
