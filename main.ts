import { getConnection } from "./src";

import { PrimaryKeyColumn, Table } from "./src/columns";
import { Dataloom } from "./src/loom";
class Model {
  constructor() {}
  static findOne() {}
}

@Table({ name: "Hello" })
class User extends Model {
  @PrimaryKeyColumn({ type: "int", autoIncrement: true })
  colors: string = "hey";

  @PrimaryKeyColumn({ type: "int" })
  age: number = 2;
}
(async () => {
  const conn = await getConnection({
    config: { filename: "hello.db" },
    dialect: "sqlite",
  });
  const loom = new Dataloom({ conn, entities: [User] });
  await loom.synchronize();
})();

// console.log(Object.getOwnPropertyDescriptors(new User())); // helps me in migrations
// console.log(Object.getOwnPropertyDescriptor(new User(), "age"));
// console.log(Object.getOwnPropertySymbols(new User()));
// console.log((new User() as any).tableName);
