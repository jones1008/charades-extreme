import QuerySnapshot from './QuerySnapshot';
/**
 * Firestorm representation of a query. Queries can be chained
 * together, as per the standard firestore SDK.
 * @typeparam T The entity for the query.
 */
export default class Query {
    /**
     * Create a collection query for an [[Entity]].
     * @param Entity T The entity to represent.
     * @param collection The collection to query.
     * @param fields The list of field for the collection.
     * @param native The native firestore query.
     */
    constructor(Entity, collection, fields, native) {
        this._Entity = Entity;
        this._collection = collection;
        this._fields = fields;
        this._native = native;
    }
    /**
     * Applies a where filter to the query.
     * @param property The property to query.
     * @param op The operation to apply.
     * @param value The value to test for.
     */
    where(property, op, value) {
        const field = this._fields.get(property);
        if (field) {
            return this.appendNativeQuery(this._native.where(field.name, op, value));
        }
        throw new Error(`Could not find property in ${this._collection.path}`);
    }
    /**
     * Applies an order by filter to the query.
     * @param property The property to order by.
     * @param sort The order direction. Default value is ascending.
     */
    orderBy(property, sort) {
        const field = this._fields.get(property);
        if (field) {
            return this.appendNativeQuery(this._native.orderBy(field.name, sort));
        }
        throw new Error(`Could not find property in ${this._collection.path}`);
    }
    /**
     * Applies a limit filter to the query.
     * @param amount The maximum number of documents to return.
     */
    limit(amount) {
        return this.appendNativeQuery(this._native.limit(amount));
    }
    /**
     * Applies a start at filter to the query.
     * @param fieldValues The field values to start this query at, in order of the query's order by.
     */
    startAt(...fieldValues) {
        return this.appendNativeQuery(this._native.startAt(...fieldValues));
    }
    /**
     * Applies a start after filter to the query.
     * @param fieldValues The field values to start this query after, in order of the query's order by.
     */
    startAfter(...fieldValues) {
        return this.appendNativeQuery(this._native.startAfter(...fieldValues));
    }
    /**
     * Applies an end at filter to the query.
     * @param fieldValues The field values to end this query at, in order of the query's order by.
     */
    endAt(...fieldValues) {
        return this.appendNativeQuery(this._native.endAt(...fieldValues));
    }
    /**
     * Applies an end before filter to the query.
     * @param fieldValues The field values to end this query before, in order of the query's order by.
     */
    endBefore(...fieldValues) {
        return this.appendNativeQuery(this._native.endBefore(...fieldValues));
    }
    /**
     * Attaches a listener to the query.
     * @param onNext Callback which is called when new snapshot is available.
     * @param onError Callback which is called when an error occurs.
     * @returns An unsubscribe function.
     */
    onSnapshot(onNext, onError) {
        return this._native.onSnapshot((snapshot) => { onNext(this.buildSnapshot(snapshot)); }, onError);
    }
    get() {
        return new Promise((resolve) => {
            this._native.get().then((snapshot) => {
                resolve(this.buildSnapshot(snapshot));
            });
        });
    }
    /**
     * Appends a query to the current query.
     * @param query The query to append.
     */
    appendNativeQuery(query) {
        return new Query(this._Entity, this._collection, this._fields, query);
    }
    /**
     * Creates a firestorm snapshot from the firestore snapshot.
     * @param nativeSnapshot The native query document snapshot.
     */
    buildSnapshot(nativeSnapshot) {
        return new QuerySnapshot(nativeSnapshot, this._Entity, this._collection, this);
    }
}
