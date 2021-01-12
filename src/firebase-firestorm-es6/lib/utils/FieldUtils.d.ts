import { IFieldMeta, IFieldConfig, FieldTypes } from '../types';
/**
 * Utility functions for fields.
 */
export default class FieldUtils {
    /**
     * Produces the metadata for a field based on the field configuration, and firestorm configuration.
     * @param fieldConfig The field configuration specified in the decorator.
     * @param property The name of the class field property.
     * @param type The type of the field.
     *
     * @returns The configured field.
     */
    static configure<T>(fieldConfig: IFieldConfig, property: string, type: T, fieldType: FieldTypes): IFieldMeta;
    /**
     * Utility for running a processor function on a field value or array of values.
     * @param isArray Whether the field is configured to have array values.
     * @param fieldValue The value(s) for the field.
     * @param processSingle Process a single value.
     */
    static process<T>(isArray: boolean, fieldValue: T | T[], processSingle: ((singleValue: T, ...values: any) => any)): any;
}
