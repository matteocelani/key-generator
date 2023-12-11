import { randomBytes } from "crypto";

export class PrivateKeyGenerator {
  static generate(): Buffer {
    return randomBytes(32);
  }
}
