import { firestore } from 'firebase/app';
import { Entity } from './';
import { IFieldMeta, ICollection, IQuery } from './types';
import QuerySnapshot from './QuerySnapshot';
/**
 * Firestorm representation of a query. Queries can be chained
 * together, as per the standard firestore SDK.
 * @typeparam T The entity for the query.
 */
export default class Query<T extends Entity> implements IQuery<T> {
    private _Entity;
    private _collection;
    private _native;
    private _fields;
    /**
     * Create a collection query for an [[Entity]].
     * @param Entity T The entity to represent.
     * @param collection The collection to query.
     * @param fields The list of field for the collection.
     * @param native The native firestore query.
     */
    constructor(Entity: new () => T, collection: ICollection<T>, fields: Map<string, IFieldMeta>, native: firestore.Query);
    /**
     * Applies a where filter to the query.
     * @param property The property to query.
     * @param op The operation to apply.
     * @param value The value to test for.
     */
    where(property: keyof T, op: firestore.WhereFilterOp, value: any): Query<T>;
    /**
     * Applies an order by filter to the query.
     * @param property The property to order by.
     * @param sort The order direction. Default value is ascending.
     */
    orderBy(property: keyof T, sort?: firestore.OrderByDirection): Query<T>;
    /**
     * Applies a limit filter to the query.
     * @param amount The maximum number of documents to return.
     */
    limit(amount: number): Query<T>;
    /**
     * Applies a start at filter to the query.
     * @param fieldValues The field values to start this query at, in order of the query's order by.
     */
    startAt(...fieldValues: any[]): Query<T>;
    /**
     * Applies a start after filter to the query.
     * @param fieldValues The field values to start this query after, in order of the query's order by.
     */
    startAfter(...fieldValues: any[]): Query<T>;
    /**
     * Applies an end at filter to the query.
     * @param fieldValues The field values to end this query at, in order of the query's order by.
     */
    endAt(...fieldValues: any[]): Query<T>;
    /**
     * Applies an end before filter to the query.
     * @param fieldValues The field values to end this query before, in order of the query's order by.
     */
    endBefore(...fieldValues: any[]): Query<T>;
    /**
     * Attaches a listener to the query.
     * @param onNext Callback which is called when new snapshot is available.
     * @param onError Callback which is called when an error occurs.
     * @returns An unsubscribe function.
     */
    onSnapshot(onNext: (snapshot: QuerySnapshot<T>) => void, onError?: (error: Error) => void): (() => void);
    get(): Promise<QuerySnapshot<T>>;
    /**
     * Appends a query to the current query.
     * @param query The query to append.
     */
    private appendNativeQuery;
    /**
     * Creates a firestorm snapshot from the firestore snapshot.
     * @param nativeSnapshot The native query document snapshot.
     */
    private buildSnapshot;
}
