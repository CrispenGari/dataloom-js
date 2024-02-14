import {
  InvalidTableNameException,
  NoPrimaryKeyException,
  TooManyPrimaryKeyException,
} from "../exceptions";
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
    throw new InvalidTableNameException(
      "The table name must contain few characters, None found. Make sure that all your table classes are decorated with @Entity."
    );
  }
  if (pks.length === 0) {
    throw new NoPrimaryKeyException(
      `Each and every table decorated with @Entity must have exactly 1 primary key column. None was found in table "${tableName}".`
    );
  }
  if (pks.length !== 1) {
    throw new TooManyPrimaryKeyException(
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
      if (Object.values(attr).length === 1) {
        tableName =
          dialect === "postgres"
            ? `"${attr.__tableName__}"`
            : `\`${attr.__tableName__}\``;
      } else if (Object.values(attr).length === 0) {
      } else {
        if (attr.attributes?.pkField) {
          pks.push(attr.columnName);
        }
        if (dialect === "postgres" && attr.attributes?.autoIncrement) {
          const field_sql = `"${attr.columnName}" BIGSERIAL${
            attr.attributes?.pkField ? " PRIMARY KEY" : ""
          }${attr.attributes?.unique ? " UNIQUE" : ""}${
            attr.attributes?.nullable ? "" : " NOT NULL"
          }${
            attr.attributes?.defaultValue
              ? `DEFAULT '${attr.attributes.defaultValue}'`
              : ""
          }`;
          columns.push(field_sql);
        } else {
          if (dialect === "postgres") {
            const field_sql = `"${attr.columnName}" ${attr.attributes.type}${
              attr.attributes?.pkField ? " PRIMARY KEY" : ""
            }${attr.attributes?.unique ? " UNIQUE" : ""}${
              attr.attributes?.nullable ? "" : " NOT NULL"
            }${
              attr.attributes?.defaultValue
                ? ` DEFAULT '${attr.attributes.defaultValue}'`
                : ""
            }`;
            columns.push(field_sql);
          } else if (dialect === "mysql") {
            const field_sql = `\`${attr.columnName}\` ${attr.attributes.type}${
              attr.attributes?.autoIncrement ? " AUTO_INCREMENT" : ""
            }${attr.attributes?.pkField ? " PRIMARY KEY" : ""}${
              attr.attributes?.unique ? " UNIQUE" : ""
            }${attr.attributes?.nullable ? "" : " NOT NULL"}${
              attr.attributes?.defaultValue
                ? ` DEFAULT '${attr.attributes.defaultValue}'`
                : ""
            }`;
            columns.push(field_sql);
          } else {
            const field_sql = `\`${attr.columnName}\` ${attr.attributes.type}${
              attr.attributes?.autoIncrement ? " AUTO INCREMENT" : ""
            }${attr.attributes?.pkField ? " PRIMARY KEY" : ""}${
              attr.attributes?.unique ? " UNIQUE" : ""
            }${attr.attributes?.nullable ? "" : " NOT NULL"}${
              attr.attributes?.defaultValue
                ? ` DEFAULT '${attr.attributes.defaultValue}'`
                : ""
            }`;
            columns.push(field_sql);
          }
        }
      }
    });
  maybeSyncError(tableName, pks);
  return {
    tableName,
    columns,
  };
};
