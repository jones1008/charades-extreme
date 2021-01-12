import store from '../store';
import { FieldConversionType } from '../types';
import { CaseConverter } from './';
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
    static configure(fieldConfig, property, type, fieldType) {
        const { config } = store();
        let name = '';
        // Providing a field name in the config overrides an conversions.
        if (fieldConfig.name) {
            name = fieldConfig.name;
        }
        else {
            switch (config.fieldConversion) {
                case FieldConversionType.ToKebabCase:
                    name = CaseConverter.camelToKebabCase(property);
                    break;
                case FieldConversionType.ToSnakeCase:
                    name = CaseConverter.camelToSnakeCase(property);
                    break;
                case FieldConversionType.ToCamelCase:
                    name = CaseConverter.toCamelCase(property);
                    break;
                default:
                    name = property;
                    break;
            }
        }
        return {
            name,
            type: fieldType,
            isArray: Array.isArray(type),
            deserialize: function () { return null; },
            serialize: function () { return null; },
            toData: function () { return null; },
        };
    }
    ;
    /**
     * Utility for running a processor function on a field value or array of values.
     * @param isArray Whether the field is configured to have array values.
     * @param fieldValue The value(s) for the field.
     * @param processSingle Process a single value.
     */
    static process(isArray, fieldValue, processSingle) {
        if (isArray) {
            return fieldValue.map(processSingle);
        }
        else {
            return processSingle(fieldValue);
        }
    }
    ;
}
