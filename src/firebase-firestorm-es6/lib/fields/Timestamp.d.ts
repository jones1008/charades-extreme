import { firestore } from 'firebase/app';
import { ITimestamp } from '../types';
/**
 * Wrapper for firestore server timestamp, mainly used to keep
 * imports clean when using the library.
 */
export default class Timestamp implements ITimestamp {
    private _native;
    constructor(seconds: number, nanoseconds: number);
    static fromDate(date: Date): Timestamp;
    static fromMillis(millis: number): Timestamp;
    readonly native: firestore.Timestamp;
    readonly nanoseconds: number;
    readonly seconds: number;
    toDate(): Date;
    toMillis(): number;
    isEqual(other: ITimestamp): boolean;
}
