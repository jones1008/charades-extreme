export var FieldConversionType;
(function (FieldConversionType) {
    FieldConversionType["ToCamelCase"] = "toCamelCase";
    FieldConversionType["ToSnakeCase"] = "toSnakeCase";
    FieldConversionType["ToKebabCase"] = "toKebabCase";
    FieldConversionType["NoConversion"] = "noConversion";
})(FieldConversionType || (FieldConversionType = {}));
;
export var FieldTypes;
(function (FieldTypes) {
    FieldTypes["Standard"] = "standard";
    FieldTypes["Map"] = "map";
    FieldTypes["DocumentReference"] = "documentReference";
    FieldTypes["Timestamp"] = "timestamp";
    FieldTypes["GeoPoint"] = "geoPoint";
})(FieldTypes || (FieldTypes = {}));
;
export var WriteTypes;
(function (WriteTypes) {
    WriteTypes[WriteTypes["Create"] = 0] = "Create";
    WriteTypes[WriteTypes["Update"] = 1] = "Update";
})(WriteTypes || (WriteTypes = {}));
;
