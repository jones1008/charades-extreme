import { firestore } from 'firebase/app';
import { IGeoPoint } from '../types';
/**
 * Wrapper for firestore geopoint class, mainly used to keep
 * imports clean when using the library.
 */
export default class GeoPoint implements IGeoPoint {
    private _native;
    constructor(latitude: number, longitude: number);
    readonly native: firestore.GeoPoint;
    latitude: number;
    longitude: number;
    isEqual(other: IGeoPoint): boolean;
}
