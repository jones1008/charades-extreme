/**
 * Utility functions to build firestore-compatiable queries.
 */
export default class QueryBuilder {
    /**
     * Converts a firestom query into a firestore query.
     * @param collectionRef The native firestore collection reference.
     * @param query The firestorm query
     */
    static query(collection, fields, query) {
        const collectionRef = collection.native;
        const { where: whereQueries, orderBy: orderByQueries, startAfter: startAfterQuery, startAt: startAtQuery, endAt: endAtQuery, endBefore: endBeforeQuery, limit: limitQuery, } = query;
        let q = (whereQueries || []).reduce((accum, curr) => {
            const [property, operator, value] = curr;
            const field = fields.get(property);
            if (field) {
                return accum.where(field.name, operator, value);
            }
            throw new Error(`Could not find property ${property} in collection ${collection.path}`);
        }, collectionRef);
        if (orderByQueries) {
            orderByQueries.forEach((obq) => {
                q = q.orderBy(obq[0], obq[1] || 'asc');
            });
            if (startAtQuery || startAfterQuery) {
                let addedStartAt = false;
                if (startAtQuery) {
                    addedStartAt = true;
                    q = q.startAt(startAtQuery);
                }
                if (startAfterQuery && !addedStartAt) {
                    q = q.startAfter(startAfterQuery);
                }
            }
            if (endAtQuery || endBeforeQuery) {
                let addedEndAt = false;
                if (endAtQuery) {
                    addedEndAt = true;
                    q = q.endAt(endAtQuery);
                }
                if (endBeforeQuery && !addedEndAt) {
                    q = q.endBefore(endBeforeQuery);
                }
            }
        }
        if (limitQuery) {
            q = q.limit(limitQuery);
        }
        return q;
    }
}
