import { FieldConversionType, } from './types';
let store = {
    repositories: new Map(),
    config: {
        fieldConversion: FieldConversionType.NoConversion,
    }
};
/**
 * Initializes firestorm with an instance of firestore.
 * @param firestore A firestore instance.
 * @param config Configuration options for firestorm.
 */
export const initialize = (firestore, config) => {
    store.firestore = firestore;
    if (config) {
        Object.keys(config).forEach((key) => {
            store.config[key] = config[key];
        });
    }
};
/**
 * Resets the store
 */
export const destroy = () => {
    store = {
        repositories: store.repositories,
        firestore: undefined,
        config: {
            fieldConversion: FieldConversionType.NoConversion,
        },
    };
};
/**
 * Gets a repository with a given name
 * @param key The name of the [[Entity]] class
 */
export const getRepository = (key) => {
    if (store.repositories.has(key)) {
        return store.repositories.get(key);
    }
    throw new Error(`Repository ${key} is not defined`);
};
/**
 * Creates a repository with a given name if it doesn't
 * exist, and returns the repository.
 * @param key The name of the [[Entity]] class
 */
export const getOrCreateRepository = (key) => {
    if (!store.repositories.has(key)) {
        store.repositories.set(key, {
            collectionConfig: {},
            fields: new Map(),
            subcollections: new Map(),
        });
    }
    return getRepository(key);
};
export default () => store;
