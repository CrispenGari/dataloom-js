interface PrimaryKeyOptions {
  type?: string;
  name?: string;
  autoIncrement?: boolean;
}

interface ITable {
  name?: string;
}

export const Table = (options: ITable) => {
  return function <T extends { new (...args: any[]): {} }>(
    baseClass: T,
    ctx: ClassDecoratorContext
  ) {
    return class extends baseClass {
      tableName = options.name ? options.name : ctx.name;
      constructor(...args: any[]) {
        super(args);
      }
    };
  };
};

export const PrimaryKeyColumn = <TInfer>({
  autoIncrement = true,
  name,
  type,
}: PrimaryKeyOptions) => {
  return function <T, V extends TInfer>(
    target: undefined,
    ctx: ClassFieldDecoratorContext<T, V>
  ) {
    return function (args: V) {
      console.log({ args });
      return `${String(name ? name : ctx.name)} ${type} ${
        autoIncrement ? "AUTO_INCREMENT" : ""
      }` as any;
    };
  };
};
