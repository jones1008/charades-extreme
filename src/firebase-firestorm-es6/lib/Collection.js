var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import store, { getRepository } from './store';
import { WriteTypes } from './types';
import { QueryBuilder, FirestoreSerializer } from './utils';
import DocumentRef from './fields/DocumentRef';
import Query from './Query';
/**
 * Firestorm representation of a collection reference.
 * @typeparam T The entity for the collection documents.
 * @typeparam P The entity for the collection parent.
 */
class Collection {
    /**
     * Create a collection reference from an [[Entity]] and optional parent.
     * @param E The entity class for the collections documents.
     * @param parent The parent document for the collection.
     */
    constructor(E, parent) {
        this._Entity = E;
        this._parent = parent || null;
        this._path = this.buildPath();
        this._native = this.buildNative();
    }
    /**
     * The path to this collection.
     */
    get path() {
        return this._path;
    }
    /**
     * The parent document reference for the collection.
     */
    get parent() {
        return this._parent;
    }
    /**
     * The native firestore collection reference.
     */
    get native() {
        return this._native;
    }
    /**
     * @hidden
     * Creates the path to the collection.
     */
    buildPath() {
        const { name: collectionName } = getRepository(this._Entity.prototype.constructor.name).collectionConfig;
        let p = `/${collectionName}`;
        if (this._parent) {
            p = `${this._parent.path}${p}`;
        }
        return p;
    }
    /**
     * @hidden
     * Creates the native firestore reference.
     */
    buildNative() {
        const { firestore } = store();
        if (firestore) {
            return firestore.collection(this._path);
        }
        else {
            throw new Error('Undefined firestore');
        }
    }
    ;
    /**
     * Gets a document reference from the collection.
     * @param id The document ID.
     */
    doc(id) {
        return DocumentRef(id, this._Entity, this);
    }
    /**
     * Gets a document with a provided ID
     * @param id The ID of the document.
     *
     * @returns The entity.
     */
    get(id) {
        return new Promise((resolve) => {
            this._native.doc(id).get().then((snapshot) => {
                if (snapshot.exists) {
                    resolve(FirestoreSerializer.deserialize(snapshot, this._Entity, this));
                }
                return resolve(null);
            });
        });
    }
    /**
     * Updates a document from an entity instance.
     * @param entity The entity (with ID) to update.
     *
     * @returns The updated entity.
     */
    update(entity) {
        return new Promise((resolve) => {
            if (!entity.id) {
                throw new Error(`An ID must be provided when updating ${entity.constructor.name}`);
            }
            const _a = FirestoreSerializer.serialize(entity, WriteTypes.Update), { id } = _a, data = __rest(_a, ["id"]);
            this._native.doc(id).update(data).then(() => {
                this.get(entity.id).then((updatedEntity) => {
                    resolve(updatedEntity);
                });
            });
        });
    }
    ;
    /**
     * Creates a new document from an entity instance.
     * @param entity An instance of the entity.
     *
     * @returns The created entity.
     */
    create(entity) {
        return new Promise((resolve) => {
            const _a = FirestoreSerializer.serialize(entity, WriteTypes.Create), { id } = _a, data = __rest(_a, ["id"]);
            if (id) {
                this._native.doc(id).set(data).then(() => {
                    this.get(id).then((snapshot) => {
                        resolve(snapshot);
                    });
                });
            }
            else {
                this._native.add(data).then((result) => {
                    this.get(result.id).then((snapshot) => {
                        resolve(snapshot);
                    });
                });
            }
        });
    }
    ;
    /**
     * Finds a list of documents based on a criteria.
     * @param query The query parameters.
     * @deprecated since v1.1, use query() method to build queries instead.
     * @returns A list of entities matching the criteria.
     */
    find(query) {
        return new Promise((resolve) => {
            let querySnapshotPromise;
            if (query) {
                const fields = getRepository(this._Entity.prototype.constructor.name).fields;
                querySnapshotPromise = QueryBuilder.query(this, fields, query).get();
            }
            else {
                querySnapshotPromise = this._native.get();
            }
            querySnapshotPromise.then((querySnapshot) => {
                resolve(querySnapshot.docs.map((snapshot) => {
                    return FirestoreSerializer.deserialize(snapshot, this._Entity, this);
                }));
            });
        });
    }
    /**
     * Removes a document from the collection.
     * @param id The document ID to remove.
     */
    remove(id) {
        return new Promise((resolve) => {
            this._native.doc(id).delete().then(() => {
                resolve();
            });
        });
    }
    /**
     * Entry point for building queries.
     */
    query() {
        const fields = getRepository(this._Entity.prototype.constructor.name).fields;
        return new Query(this._Entity, this, fields, this._native);
    }
}
/**
 * Collection factory
 * @returns A collection reference.
 */
export default (model, parent) => new Collection(model, parent);
