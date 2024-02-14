import { PrimaryKeyGeneratedColumn, getConnection } from "./src";
import { PrimaryKeyColumn, Entity, Column } from "./src";
import { Dataloom } from "./src/loom";
class Model {
  constructor() {}
  static findOne() {}
}

@Entity({ keepCase: true, tableName: "users" })
class User extends Model {
  // @PrimaryKeyGeneratedColumn()
  // _id: number = 18;

  @PrimaryKeyColumn<number, "mysql">({
    type: "int",
    autoIncrement: true,
  })
  id: number;

  @Column<string, "mysql">({
    type: "varchar",
    name: "name",
    length: 255,
    nullable: false,
    unique: true,
    defaultValue: "Bob",
  })
  name: string;

  @Column<string, "mysql">({
    name: "username",
    length: 255,
    nullable: true,
    unique: true,
  })
  username!: string;

  @Column()
  email: string;

  @Column()
  age: number = 19;
}

(async () => {
  // const conn = await getConnection({
  //   config: {
  //     database: "hi",
  //     host: "127.0.0.1",
  //     port: 5432,
  //     password: "root",
  //     user: "postgres",
  //   },
  //   dialect: "postgres",
  // });
  // const conn = await getConnection({
  //   config: { filename: "hello" },
  //   dialect: "sqlite",
  // });
  const conn = await getConnection({
    config: {
      database: "hi",
      host: "127.0.0.1",
      port: 3306,
      password: "root",
      user: "root",
    },
    dialect: "mysql",
  });
  const loom = new Dataloom({ conn, entities: [User], logger: "console" });
  await loom.synchronize({ drop: false });

  // await conn.client.query("SELECT * FROM users;");

  // conn.client.close({ type: "conn", name: "close" }, false);

  // conn.client.destroy();
  // conn.client.close()
})();
