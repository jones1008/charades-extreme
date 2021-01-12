import { getOrCreateRepository } from '../store';
/**
 * Registers a subcollection with firestorm.
 * @param config The subcollection configuration.
 */
export default (config) => {
    return (target) => {
        // Get the parent based on the Entity class.
        const parentRepository = getOrCreateRepository(target.constructor.name);
        const { entity, name } = config;
        // Create a repository for the subcollection and register it as a child
        // of the parent.
        const repository = getOrCreateRepository(entity.prototype.constructor.name);
        repository.collectionConfig = { entity, name };
        repository.parent = parentRepository;
        repository.entity = entity;
        parentRepository.subcollections.set(name, repository);
    };
};
