import * as firebase from 'firebase/app';
import { IFireormConfig, IStore, IRepository } from './types';
/**
 * Initializes firestorm with an instance of firestore.
 * @param firestore A firestore instance.
 * @param config Configuration options for firestorm.
 */
export declare const initialize: (firestore: firebase.firestore.Firestore, config?: IFireormConfig | undefined) => void;
/**
 * Resets the store
 */
export declare const destroy: () => void;
/**
 * Gets a repository with a given name
 * @param key The name of the [[Entity]] class
 */
export declare const getRepository: (key: string) => IRepository;
/**
 * Creates a repository with a given name if it doesn't
 * exist, and returns the repository.
 * @param key The name of the [[Entity]] class
 */
export declare const getOrCreateRepository: (key: string) => IRepository;
declare const _default: () => IStore;
export default _default;
