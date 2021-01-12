import { ICollection, IDocumentRef } from './types';
import Entity from './Entity';
declare const _default: <T extends Entity, P extends Entity>(model: new () => T, parent?: IDocumentRef<P> | undefined) => ICollection<T, P>;
/**
 * Collection factory
 * @returns A collection reference.
 */
export default _default;
