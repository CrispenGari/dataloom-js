import { PoolConnection } from "mysql2";
import { ConnectionResult } from "../types";
import { PoolClient } from "pg";
import { Database } from "sqlite3";
import { SQLiteStatements } from "../statements/sqlite";
import { PGStatements } from "../statements/postgres";
import { MySQLStatements } from "../statements/mysql";

export const loom = async (conn: ConnectionResult, {}) => {
  const { client, dialect } = conn;
  switch (dialect) {
    case "mysql":
      return;
    case "postgres":
      return;
    case "sqlite":
      return;
    default:
      break;
  }
};

interface ILoom {
  conn: ConnectionResult;
  entities: any[];
  logger: "console" | "file";
}

export class Dataloom {
  private readonly options: ILoom;
  constructor(options: ILoom) {
    this.options = options;
  }

  async synchronize({ drop }: { drop: boolean }) {
    const {
      entities,
      conn: { client, dialect },
    } = this.options;
    switch (this.options.conn.dialect) {
      case "mysql":
        entities.forEach((entity) => {
          const columns: string[] = [];
          let tableName: string = "";
          Object.entries(Object.getOwnPropertyDescriptors(new entity()))
            .map(([key, value]) => ({ ...value.value }))
            .forEach((attr) => {
              if (Object.values(attr).length === 1) {
                tableName = `\`${attr.__tableName__}\``;
              } else if (Object.values(attr).length === 0) {
              } else {
                if (String(attr.attributes).indexOf("AUTO_INCREMENT") !== -1) {
                  const attributes = String(attr.attributes).replace(
                    "AUTO_INCREMENT",
                    "AUTOINCREMENT"
                  );
                  columns.push(`\`${attr.columnName}\` ${attributes}`);
                } else {
                  columns.push(`\`${attr.columnName}\` ${attr.attributes}`);
                }
              }
            });

          if (!!!tableName) {
            throw Error(
              "The table name must contain few characters, None found. Make sure that all your table classes are decorated with @Entity."
            );
          }

          if (drop) {
            const sql = MySQLStatements.CREATE_NEW_TABLE(tableName, columns);
            console.log({ sql });
          } else {
            const sql = MySQLStatements.CREATE_NEW_TABLE_IF_NOT_EXITS(
              tableName,
              columns
            );
            console.log({ sql });
          }
        });
        break;
      case "postgres":
        entities.forEach((entity) => {
          const columns: string[] = [];
          let tableName: string = "";
          Object.entries(Object.getOwnPropertyDescriptors(new entity()))
            .map(([key, value]) => ({ ...value.value }))
            .forEach((attr) => {
              if (Object.values(attr).length === 1) {
                tableName = `"${attr.__tableName__}"`;
              } else if (Object.values(attr).length === 0) {
              } else {
                if (String(attr.attributes).indexOf("AUTO_INCREMENT") !== -1) {
                  const attributes = String(attr.attributes).replace(
                    "AUTO_INCREMENT",
                    "AUTO INCREMENT"
                  );
                  columns.push(`\`${attr.columnName}\` ${attributes}`);
                } else {
                  columns.push(`\`${attr.columnName}\` ${attr.attributes}`);
                }
              }
            });
          if (!!!tableName) {
            throw Error(
              "The table name must contain few characters, None found. Make sure that all your table classes are decorated with @Entity."
            );
          }
          if (drop) {
            const sql = PGStatements.CREATE_NEW_TABLE(tableName, columns);
            console.log({ sql });
          } else {
            const sql = PGStatements.CREATE_NEW_TABLE_IF_NOT_EXITS(
              tableName,
              columns
            );
            console.log({ sql });
          }
        });
        break;
      case "sqlite":
        entities.forEach((entity) => {
          const columns: string[] = [];
          let tableName: string = "";
          Object.entries(Object.getOwnPropertyDescriptors(new entity()))
            .map(([key, value]) => ({ ...value.value }))
            .forEach((attr) => {
              if (Object.values(attr).length === 1) {
                tableName = `\`${attr.__tableName__}\``;
              } else if (Object.values(attr).length === 0) {
              } else {
                columns.push(`\`${attr.columnName}\` ${attr.attributes}`);
              }
            });
          if (!!!tableName) {
            throw Error(
              "The table name must contain few characters, None found. Make sure that all your table classes are decorated with @Entity."
            );
          }
          if (drop) {
            const sql = SQLiteStatements.CREATE_NEW_TABLE(tableName, columns);
            console.log({ sql });
          } else {
            const sql = SQLiteStatements.CREATE_NEW_TABLE_IF_NOT_EXITS(
              tableName,
              columns
            );
            console.log({ sql });
          }
        });
        break;
      default:
        break;
    }
  }
}

class Executor {
  static execute(sql: string, args: any[], client: PoolClient): void;
  static execute(sql: string, args: any[], client: Database): void;
  static execute(sql: string, args: any[], client: PoolConnection): void;
  static execute(
    sql: string,
    args: any[],
    client: PoolConnection | PoolClient | Database
  ) {
    console.log(typeof client);
  }

  static async sqlite(sql: string, args: any[], client: Database) {
    const res = await client.exec(sql);
    console.log(res);
  }
}
