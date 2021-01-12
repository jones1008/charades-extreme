import { firestore } from 'firebase/app';
import { IEntity, ICollectionQuery, ICollection, IFieldMeta } from '../types';
/**
 * Utility functions to build firestore-compatiable queries.
 */
export default class QueryBuilder {
    /**
     * Converts a firestom query into a firestore query.
     * @param collectionRef The native firestore collection reference.
     * @param query The firestorm query
     */
    static query<T extends IEntity>(collection: ICollection<T>, fields: Map<string, IFieldMeta>, query: ICollectionQuery<T>): firestore.Query;
}
