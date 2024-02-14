export const inferSQLType = <T>(arg: T) => {
  switch (typeof arg) {
    case "bigint":
      return "BIGINT";
    case "string":
      return "VARCHAR(255)";
    case "number":
      return "INT";
    case "boolean":
      return "BOOLEAN";
    case "symbol":
      return "VARCHAR(255)";
    case "undefined":
      return "VARCHAR(255)";
    case "object":
      return "";
    case "function":
      return "";
    default:
      return "";
  }
};
