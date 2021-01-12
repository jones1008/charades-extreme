import { IEntity, IDocumentRef, FirestormData } from './types';
/**
 * Represention of a document in a collection.
 */
export default class Entity implements IEntity {
    id: string;
    ref: IDocumentRef<this>;
    /**
     * Converts an entity into a human-readable format.
     */
    toData(): FirestormData;
}
