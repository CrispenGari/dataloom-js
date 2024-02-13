import { ConnectionResult } from "../types";

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
}

export class Dataloom {
  private readonly options: ILoom;
  constructor(options: ILoom) {
    this.options = options;
  }
  async synchronize() {
    /*
      CREATE TABLE IF NOT EXITS tablename(

      )
    */
  }
}

class Executor {}
