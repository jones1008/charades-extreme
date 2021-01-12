import { getOrCreateRepository } from '../store';
/**
 * Registers a collection with firestorm.
 * @param config The configuration for the collection.
 */
export default (config) => {
    return (target) => {
        const repository = getOrCreateRepository(target.prototype.constructor.name);
        repository.collectionConfig = config;
        repository.entity = target.prototype.constructor;
    };
};
