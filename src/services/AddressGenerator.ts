import secp256k1 from "secp256k1";
import createKeccakHash from "keccak";

export class AddressGenerator {
  static computeAddress(privateKey: Buffer): {
    address: string;
    publicKey: string;
  } {
    const publicKey = secp256k1.publicKeyCreate(privateKey, false);
    const pubTrimmed = Uint8Array.prototype.subarray.call(publicKey, 1);
    const addressBuffer = createKeccakHash("keccak256")
      .update(Buffer.from(pubTrimmed))
      .digest();
    const address = Uint8Array.prototype.subarray.call(addressBuffer, -20);
    return {
      address: "0x" + Buffer.from(address).toString("hex"),
      publicKey: Buffer.from(publicKey).toString("hex"),
    };
  }

  static toChecksumAddress(address: string): string {
    address = address.toLowerCase().replace("0x", "");
    const hash = createKeccakHash("keccak256").update(address).digest("hex");
    let ret = "0x";

    for (let i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase();
      } else {
        ret += address[i];
      }
    }

    return ret;
  }

  static toIcap(address: string): string {
    const base36Address = BigInt("0x" + address.toLowerCase().replace("0x", ""))
      .toString(36)
      .toUpperCase();
    const paddedBase36Address = base36Address.padStart(30, "0");
    let tempIban = "XE00" + paddedBase36Address;
    let remainder = AddressGenerator.mod97(tempIban);
    let checkDigits = (98 - remainder).toString().padStart(2, "0");
    tempIban = "XE" + checkDigits + paddedBase36Address;
    remainder = AddressGenerator.mod97(tempIban);
    checkDigits = (98 - remainder).toString().padStart(2, "0");
    const icap = "XE" + checkDigits + paddedBase36Address;

    const matchResult = icap.match(/.{1,4}/g);
    return matchResult ? matchResult.join(" ") : "";
  }

  private static mod97(iban: string): number {
    let remainder = iban
      .split("")
      .map((c) =>
        isNaN(parseInt(c, 36)) ? c.charCodeAt(0) - 55 : parseInt(c, 36)
      )
      .join("");
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
    }
    return parseInt(remainder, 10) % 97;
  }
}
