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
        type = `${inferSQLType(args)}`;
      } else if (!!!opts?.type) {
        type = inferSQLType(args);
      } else {
        type = opts.type;
      }
      return {
        attributes: {
          ...opts,
          type: type.toUpperCase(),
          pkField: true,
        },
        columnName: String(opts?.name ? opts?.name : ctx.name),
      };
    };
  };
};
