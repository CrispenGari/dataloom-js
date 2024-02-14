import { PoolConnection } from "mysql2";
import { ConnectionResult } from "../types";
import { PoolClient } from "pg";
import { Database } from "sqlite3";
import { SQLiteStatements } from "../statements/sqlite";
import { PGStatements } from "../statements/postgres";
import { MySQLStatements } from "../statements/mysql";
import { getTableAttributes } from "../utils";
import { inspect } from "util";
import { UnknownDialectException } from "../exceptions";

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
        entities.forEach((entity) => {
          const { columns, tableName } = getTableAttributes(
            entity,
            conn.dialect
          );
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
          const { columns, tableName } = getTableAttributes(
            entity,
            conn.dialect
          );
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
      case "sqlite":
        entities.forEach((entity) => {
          const { columns, tableName } = getTableAttributes(
            entity,
            conn.dialect
          );
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
      default:
        throw new UnknownDialectException(
          "Unknown dialect option, dialect can only be, (postgres, mysql or sqlite)."
        );
    }
  }
}

class Executor {
  static execute(sql: string, args: any[], conn: ConnectionResult): void;
  static execute(sql: string, args: any[], conn: ConnectionResult): void;
  static execute(sql: string, args: any[], conn: ConnectionResult): void;
  static execute(sql: string, args: any[], conn: ConnectionResult) {
    if (conn.client instanceof Database) {
      return;
    }
    if (conn.dialect === "postgres") {
      conn.client;
    } else {
      conn.client;
    }
  }
}
