import { DialectType, TMySQLTypes, TPGTypes, TSQLiteTypes } from "../types";
import { inferSQLType } from "../utils";

type TColumn<TDialect> = {
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
  defaultValue?: any;
  length?: number;
  unique?: boolean;
};

export const Column = <TColumDataType, TDialect extends DialectType>(
  opts?: TColumn<TDialect>
) => {
  return function <T, V extends TColumDataType>(
    target: undefined,
    ctx: ClassFieldDecoratorContext<T, V>
  ) {
    return function (args: V): any {
      let type: string = "";
      if (typeof opts === "undefined" || !!!opts?.type) {
        type = inferSQLType(args);
      } else {
        type = `${opts.type.toUpperCase()}${
          opts?.length ? `(${opts.length})` : ""
        }`;
      }
      return {
        attributes: `${type}${opts?.autoIncrement ? " AUTO_INCREMENT" : ""}${
          opts?.unique ? " UNIQUE" : ""
        }${opts?.nullable ? "" : " NOT NULL"}${
          opts?.defaultValue
            ? ` DEFAULT ${opts?.defaultValue}`
            : args
            ? ` DEFAULT ${args}`
            : ""
        }`,
        columnName: String(opts?.name ? opts.name : ctx.name),
      };
    };
  };
};
