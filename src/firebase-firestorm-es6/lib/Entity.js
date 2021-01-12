import { getRepository } from './store';
/**
 * Represention of a document in a collection.
 */
export default class Entity {
    /**
     * Converts an entity into a human-readable format.
     */
    toData() {
        const { fields } = getRepository(this.constructor.name);
        const result = {};
        result.id = this.id;
        fields.forEach((fieldConfig, key) => {
            const k = key;
            result[key] = fieldConfig.toData(this[k]);
        });
        Object.keys(result).forEach((key) => {
            result[key] === undefined ? delete result[key] : '';
        });
        return result;
    }
}
