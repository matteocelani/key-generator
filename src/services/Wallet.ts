import { PrivateKeyGenerator } from "./PrivateKeyGenerator";
import { AddressGenerator } from "./AddressGenerator";
// Import interface
import { IWallet } from "../types/walletTypes";

export class Wallet implements IWallet {
  private privateKey: Buffer;
  public address: string;
  public publicKey: string;

  constructor(privateKey: Buffer) {
    this.privateKey = privateKey;
    const generated = AddressGenerator.computeAddress(privateKey);
    this.address = generated.address;
    this.publicKey = generated.publicKey;
  }

  public static createRandomWallet(): Wallet {
    const privateKey = PrivateKeyGenerator.generate();
    return new Wallet(privateKey);
  }

  public getAddressChecksum(): string {
    return AddressGenerator.toChecksumAddress(this.address);
  }

  public getIcap(): string {
    return AddressGenerator.toIcap(this.address);
  }

  public getPrivateKeyHex(): string {
    return this.privateKey.toString("hex");
  }
}
