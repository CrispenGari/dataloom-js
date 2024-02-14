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
  | { client: mysql.Pool; dialect: "mysql" }
  | { client: pg.Pool; dialect: "postgres" }
  | { client: sqlite3.Database; dialect: "sqlite" };

// sql datatypes

export type TSQLiteTypes =
  | "int"
  | "smallint"
  | "bigint"
  | "float"
  | "double precision"
  | "numeric"
  | "text"
  | "varchar"
  | "char"
  | "boolean"
  | "date"
  | "time"
  | "timestamp"
  | "json"
  | "blob";

export type TMySQLTypes =
  | "int"
  | "smallint"
  | "bigint"
  | "float"
  | "double"
  | "numeric"
  | "text"
  | "varchar"
  | "char"
  | "boolean"
  | "date"
  | "time"
  | "timestamp"
  | "json"
  | "blob";

export type TPGTypes =
  | "int"
  | "smallint"
  | "bigint"
  | "serial"
  | "bigserial"
  | "smallserial"
  | "float"
  | "double precision"
  | "numeric"
  | "text"
  | "varchar"
  | "char"
  | "boolean"
  | "date"
  | "time"
  | "timestamp"
  | "interval"
  | "uuid"
  | "json"
  | "jsonb"
  | "bytea"
  | "array"
  | "inet"
  | "cidr"
  | "macaddr"
  | "tsvector"
  | "point"
  | "line"
  | "lseg"
  | "box"
  | "path"
  | "polygon"
  | "circle"
  | "hstore";
