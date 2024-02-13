import pg from "pg";
import sqlite3 from "sqlite3";
import mysql from "mysql2/promise";
export type DialectType = "postgres" | "mysql" | "sqlite";

export type PostgresConnectionOptions = {
  dialect: "postgres";
  config: pg.PoolConfig;
};
export type MysqlConnectionOptions = {
  dialect: "mysql";
  config: mysql.PoolOptions;
};
export type SQLiteConnectionOptions = {
  dialect: "sqlite";
  config: {
    filename: string;
  };
};
export type ConnectionOptions =
  | PostgresConnectionOptions
  | MysqlConnectionOptions
  | SQLiteConnectionOptions;

export type ConnectionResult =
  | { client: mysql.PoolConnection; dialect: "mysql" }
  | { client: pg.PoolClient; dialect: "postgres" }
  | { client: sqlite3.Database; dialect: "sqlite" };
