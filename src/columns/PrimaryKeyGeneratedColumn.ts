import { DialectType } from "../types";

interface TPrimaryKeyGeneratedColumn {
  name?: string;
}

export const PrimaryKeyGeneratedColumn = <TColumDataType extends number>(
  opts?: TPrimaryKeyGeneratedColumn
) => {
  return function <T, V extends TColumDataType>(
    target: undefined,
    ctx: ClassFieldDecoratorContext<T, V>
  ) {
    return function (args: V): any {
      return {
        attributes: `INT PRIMARY KEY UNIQUE NOT NULL`,
        columnName: String(opts?.name ? opts?.name : ctx.name),
      };
    };
  };
};
