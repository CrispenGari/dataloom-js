import { DialectType, TMySQLTypes, TPGTypes, TSQLiteTypes } from "../types";
import { inferSQLType } from "../utils";

type TPrimaryKeyColumn<TDialect> = {
  type?: TDialect extends "postgres"
    ? TPGTypes
    : TDialect extends "mysql"
    ? TMySQLTypes
    : TDialect extends "sqlite"
    ? TSQLiteTypes
    : never;
  name?: string;
  autoIncrement?: boolean;
  nullable?: boolean;
  length?: number;
  unique?: boolean;
};

export const PrimaryKeyColumn = <TColumDataType, TDialect extends DialectType>(
  opts?: TPrimaryKeyColumn<TDialect>
) => {
  return function <T, V extends TColumDataType>(
    target: undefined,
    ctx: ClassFieldDecoratorContext<T, V>
  ) {
    return function (args: V): any {
      let type: string = "";
      if (typeof opts === "undefined") {
        type = `${inferSQLType(args)} AUTO_INCREMENT`;
      } else if (!!!opts?.type) {
        const t = inferSQLType(args);
        type = `${t}${
          opts?.autoIncrement
            ? " AUTO_INCREMENT"
            : t === "INT"
            ? " AUTO_INCREMENT"
            : ""
        }`;
      } else {
        type = `${opts.type.toUpperCase()} PRIMARY KEY${
          opts?.length ? `(${opts.length})` : ""
        }${opts?.autoIncrement ? " AUTO_INCREMENT" : ""}`;
      }
      return {
        attributes: `${type}${opts?.unique ? " UNIQUE" : ""}${
          opts?.nullable ? "" : " NOT NULL"
        }`,
        columnName: String(opts?.name ? opts?.name : ctx.name),
      };
    };
  };
};
