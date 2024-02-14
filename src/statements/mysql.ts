export class MySQLStatements {
  // dropping table
  static DROP_TABLE = (tableName: string): string =>
    `DROP TABLE IF EXISTS ${tableName};`;

  // creating table
  static CREATE_NEW_TABLE = (tableName: string, fields: string[]): string =>
    `CREATE TABLE ${tableName} (${fields.join(", ")});`;
  static CREATE_NEW_TABLE_IF_NOT_EXITS = (
    tableName: string,
    fields: string[]
  ): string =>
    `CREATE TABLE IF NOT EXISTS ${tableName} (${fields.join(", ")});`;
}
