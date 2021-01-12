import { IDocumentRef, ICollection } from '../types';
import Entity from '../Entity';
declare const _default: <T extends Entity>(id: string, model: new () => T, parent: ICollection<T, any>) => IDocumentRef<T>;
/**
 * DocumentRef Factory
 */
export default _default;
