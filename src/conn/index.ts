import pg from "pg";
import sqlite3 from "sqlite3";
import mysql from "mysql2/promise";
import {
  PostgresConnectionOptions,
  MysqlConnectionOptions,
  SQLiteConnectionOptions,
  ConnectionResult,
  ConnectionOptions,
} from "../types";

export async function getConnection(
  options: PostgresConnectionOptions
): Promise<{ client: pg.Pool; dialect: "postgres" }>;

export async function getConnection(
  options: MysqlConnectionOptions
): Promise<{ client: mysql.Pool; dialect: "mysql" }>;

export async function getConnection(
  options: SQLiteConnectionOptions
): Promise<{ client: sqlite3.Database; dialect: "sqlite" }>;

export async function getConnection(
  options: ConnectionOptions
): Promise<ConnectionResult> {
  if (options.dialect === "mysql") {
    const client = await mysql.createPool({ ...options.config });
    return { client, dialect: options.dialect };
  } else if (options.dialect === "postgres") {
    const client = await new pg.Pool({
      ...options.config,
    });

    return { client, dialect: options.dialect };
  }
  const client = new sqlite3.Database(options.config.filename);
  return { client, dialect: options.dialect };
}
