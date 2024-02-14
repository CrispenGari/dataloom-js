import { PoolConnection } from "mysql2";
import { ConnectionResult } from "../types";
import { Database } from "sqlite3";
import { MySQLStatements } from "../statements/mysql";
import { getTableAttributes } from "../utils";
import { UnknownDialectException } from "../exceptions";
import { SQLiteStatements } from "../statements/sqlite";
import { PGStatements } from "../statements/postgres";

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
    const { entities, conn } = this.options;
    switch (this.options.conn.dialect) {
      case "mysql":
        entities.forEach(async (entity) => {
          const { columns, tableName } = getTableAttributes(
            entity,
            conn.dialect
          );
          if (drop) {
            await Executor.execute(
              MySQLStatements.DROP_TABLE(tableName),
              [],
              conn
            );
            await Executor.execute(
              MySQLStatements.CREATE_NEW_TABLE(tableName, columns),
              [],
              conn
            );
          } else {
            await Executor.execute(
              MySQLStatements.CREATE_NEW_TABLE_IF_NOT_EXITS(tableName, columns),
              [],
              conn
            );
          }
        });
        break;
      case "postgres":
        entities.forEach(async (entity) => {
          const { columns, tableName } = getTableAttributes(
            entity,
            conn.dialect
          );
          if (drop) {
            await Executor.execute(
              PGStatements.DROP_TABLE(tableName),
              [],
              conn
            );
            await Executor.execute(
              PGStatements.CREATE_NEW_TABLE(tableName, columns),
              [],
              conn
            );
          } else {
            await Executor.execute(
              PGStatements.CREATE_NEW_TABLE_IF_NOT_EXITS(tableName, columns),
              [],
              conn
            );
          }
        });

        break;
      case "sqlite":
        entities.forEach(async (entity) => {
          const { columns, tableName } = getTableAttributes(
            entity,
            conn.dialect
          );
          if (drop) {
            await Executor.execute(
              SQLiteStatements.DROP_TABLE(tableName),
              [],
              conn
            );
            await Executor.execute(
              SQLiteStatements.CREATE_NEW_TABLE(tableName, columns),
              [],
              conn
            );
          } else {
            await Executor.execute(
              SQLiteStatements.CREATE_NEW_TABLE_IF_NOT_EXITS(
                tableName,
                columns
              ),
              [],
              conn
            );
          }
        });
        break;
      default:
        throw new UnknownDialectException(
          "Unknown dialect option, dialect can only be, (postgres, mysql or sqlite)."
        );
    }
  }
}

class Executor {
  static async execute<TResults>(
    sql: string,
    args: any[],
    conn: ConnectionResult
  ): Promise<TResults>;
  static async execute<TResults>(
    sql: string,
    args: any[],
    conn: ConnectionResult
  ): Promise<TResults>;
  static async execute<TResults>(
    sql: string,
    args: any[],
    conn: ConnectionResult
  ): Promise<TResults>;

  static async execute<TResults>(
    sql: string,
    args: any[],
    conn: ConnectionResult
  ) {
    const { client, dialect } = conn;
    if (client instanceof Database) {
      const res = await client.exec(sql);
      return res;
    }
    if (dialect === "postgres") {
      const res = await client.query(sql);
      console.log({ res });
      await client.end();
      return res;
    } else {
      const res = await client.query(sql);
      await client.end();
      return res;
    }
  }
}
