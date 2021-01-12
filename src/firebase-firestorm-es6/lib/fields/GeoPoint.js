import { firestore } from 'firebase/app';
/**
 * Wrapper for firestore geopoint class, mainly used to keep
 * imports clean when using the library.
 */
export default class GeoPoint {
    constructor(latitude, longitude) {
        this._native = new firestore.GeoPoint(latitude, longitude);
    }
    get native() {
        return this._native;
    }
    get latitude() {
        return this._native.latitude;
    }
    set latitude(value) {
        this._native = new firestore.GeoPoint(value, this.longitude);
    }
    get longitude() {
        return this._native.longitude;
    }
    set longitude(value) {
        this._native = new firestore.GeoPoint(this.latitude, value);
    }
    isEqual(other) {
        return this._native.isEqual(other.native);
    }
}
