/**
 * Utility functions to convert between different case notations.
 */
export default class CaseConverter {
    /**
     * Converts a camelCase string to snake_case.
     * @param str The camelCase string to convert.
     *
     * @returns A snake_case representation of the string.
     */
    static camelToSnakeCase: (str: string) => string;
    /**
     * Converts a camelCase string to kebab-case
     * @param str The camelCase string to convert.
     *
     * @returns A kebab-case representation of the string.
     */
    static camelToKebabCase: (str: string) => string;
    /**
     * Converts either a snake_case or kebab-case string to camelCase.
     * @param str The snake/kebab case string to convert.
     *
     * @returns A camelCase representation of the string.
     */
    static toCamelCase: (str: string) => string;
}
