import { firestore } from 'firebase/app';
/**
 * Wrapper for firestore server timestamp, mainly used to keep
 * imports clean when using the library.
 */
export default class Timestamp {
    constructor(seconds, nanoseconds) {
        this._native = new firestore.Timestamp(seconds, nanoseconds);
    }
    static fromDate(date) {
        const native = firestore.Timestamp.fromDate(date);
        return new Timestamp(native.seconds, native.nanoseconds);
    }
    static fromMillis(millis) {
        const native = firestore.Timestamp.fromMillis(millis);
        return new Timestamp(native.seconds, native.nanoseconds);
    }
    get native() {
        return this._native;
    }
    get nanoseconds() {
        return this._native.nanoseconds;
    }
    get seconds() {
        return this._native.seconds;
    }
    toDate() {
        return this._native.toDate();
    }
    toMillis() {
        return this._native.toMillis();
    }
    isEqual(other) {
        return this._native.isEqual(other.native);
    }
}
