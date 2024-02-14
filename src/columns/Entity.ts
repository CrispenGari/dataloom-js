type TEntity = {
  tableName?: string;
  keepCase?: boolean;
};

export const Entity = (opts?: TEntity) => {
  return function <T extends { new (...args: any[]): {} }>(
    baseClass: T,
    ctx: ClassDecoratorContext
  ) {
    return class extends baseClass {
      __tableName__ = {
        __tableName__: opts?.keepCase
          ? String(opts?.tableName ? opts.tableName : ctx.name)
          : String(opts?.tableName ? opts.tableName : ctx.name).toLowerCase(),
      };
      constructor(...args: any[]) {
        super(args);
      }
    };
  };
};
