export class UnknownDialectException extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, UnknownDialectException.prototype);
  }
}

export class NoPrimaryKeyException extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, NoPrimaryKeyException.prototype);
  }
}

export class TooManyPrimaryKeyException extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, TooManyPrimaryKeyException.prototype);
  }
}
export class InvalidTableNameException extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, InvalidTableNameException.prototype);
  }
}
