import { DialectType } from "../types";

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

export const maybeSyncError = (tableName: string, pks: string[]) => {
  if (!!!tableName) {
    throw Error(
      "The table name must contain few characters, None found. Make sure that all your table classes are decorated with @Entity."
    );
  }
  if (pks.length === 0) {
    throw Error(
      `Each and every table decorated with @Entity must have exactly 1 primary key column. None was found in table "${tableName}".`
    );
  }
  if (pks.length !== 1) {
    throw Error(
      `Each and every table decorated with @Entity must have exactly 1 primary key column. Found "${
        pks.length
      }" primary key columns (${pks.join(", ")}) in table "${tableName}".`
    );
  }
};

export const getTableAttributes = (entity: any, dialect: DialectType) => {
  const columns: string[] = [];
  let tableName: string = "";
  const pks: string[] = [];

  Object.entries(Object.getOwnPropertyDescriptors(new entity()))
    .map(([key, value]) => ({ ...value.value }))
    .forEach((attr) => {
      if (String(attr.attributes).indexOf("PRIMARY KEY") !== -1) {
        pks.push(attr.columnName);
      }
      if (Object.values(attr).length === 1) {
        tableName =
          dialect === "postgres"
            ? `"${attr.__tableName__}"`
            : `\`${attr.__tableName__}\``;
      } else if (Object.values(attr).length === 0) {
      } else {
        if (String(attr.attributes).indexOf("AUTO_INCREMENT") !== -1) {
          const attributes = String(attr.attributes).replace(
            "AUTO_INCREMENT",
            dialect === "mysql"
              ? "AUTOINCREMENT"
              : dialect === "postgres"
              ? "AUTO INCREMENT"
              : "AUTO_INCREMENT"
          );
          columns.push(
            dialect === "postgres"
              ? `"${attr.columnName}" ${attributes}`
              : `\`${attr.columnName}\` ${attributes}`
          );
        } else {
          columns.push(
            dialect === "postgres"
              ? `"${attr.columnName}" ${attr.attributes}`
              : `\`${attr.columnName}\` ${attr.attributes}`
          );
        }
      }
    });

  maybeSyncError(tableName, pks);
  return {
    tableName,
    columns,
  };
};
