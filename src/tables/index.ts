// interface IModel {
//   static findOne(): any;
// }

// class Model {
//   constructor() {}
//   static findOne() {}
// }

// class User extends Model {}

// const user = User.findOne();

// const mysqlTable = function (tableName: string, columns: {}) {
//     this.tableName = tableName
//     this.columns = columns
// };

// mysqlTable.prototype = {
//   select: function () {},
// };

// const users = new (mysqlTable as any)("hello", { id: "Me" });

// const obj = function (name: string) {
//   this.name = name;
//   this.count = 0;
// };

// obj.prototype = {
//   increment: function (count: number) {
//     this.count += count;
//     return this;
//   },
//   decrement: function (count: number) {
//     this.count += count;
//     return this;
//   },
//   print: function () {
//     console.log(`The name ${this.name} has the following count: ${this.count}`);
//   },
// };
// const o = new obj("Hello");

// export const users = mysqlTable(
//   "users",
//   {
//     id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//     fullName: varchar("full_name", { length: 256 }),
//   },
//   (users) => ({
//     nameIdx: index("name_idx").on(users.fullName),
//   })
// );
