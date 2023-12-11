import { Wallet } from "@/services/Wallet";
import { AddressGenerator } from "@/services/AddressGenerator";
import { PrivateKeyGenerator } from "@/services/PrivateKeyGenerator";

describe("Complete Wallet Service Tests", () => {
  describe("PrivateKeyGenerator Tests", () => {
    it("should generate a 32-byte private key", () => {
      const privateKey = PrivateKeyGenerator.generate();
      expect(privateKey).toHaveLength(32);
    });
  });

  describe("AddressGenerator Tests", () => {
    it("should compute an address from a given private key", () => {
      const privateKey = PrivateKeyGenerator.generate();
      const { address } = AddressGenerator.computeAddress(privateKey);
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it("should generate a valid checksum address", () => {
      const address = "0xabcdef1234567890abcdef1234567890abcdef12";
      const checksumAddress = AddressGenerator.toChecksumAddress(address);
      expect(checksumAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(checksumAddress).not.toEqual(address.toLowerCase());
      expect(checksumAddress).not.toEqual(address.toUpperCase());
    });

    it("should convert an address to an ICAP format", () => {
      const address = "0xabcdef1234567890abcdef1234567890abcdef12";
      const icap = AddressGenerator.toIcap(address);
      const icap2 = AddressGenerator.toIcap(address);
      expect(icap).toMatch(
        /XE\d\d [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4}/
      );
      expect(icap).toEqual(icap2);
    });
  });

  describe("Wallet Generator Test", () => {
    it("should generate a wallet with a valid address and private key", () => {
      const wallet = Wallet.createRandomWallet();
      expect(wallet).toHaveProperty("address");
      expect(wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(wallet.getPrivateKeyHex()).toHaveLength(64);
    });

    it("should generate unique wallets each time", () => {
      const wallet1 = Wallet.createRandomWallet();
      const wallet2 = Wallet.createRandomWallet();
      expect(wallet1.address).not.toEqual(wallet2.address);
      expect(wallet1.getPrivateKeyHex()).not.toEqual(
        wallet2.getPrivateKeyHex()
      );
    });

    it("should generate an address that matches the private key", () => {
      const wallet = Wallet.createRandomWallet();
      const derivedAddress = AddressGenerator.computeAddress(
        Buffer.from(wallet.getPrivateKeyHex(), "hex")
      );
      expect(wallet.address).toEqual(derivedAddress.address);
    });

    it("should return the correct checksum address from the wallet", () => {
      const wallet = Wallet.createRandomWallet();
      const checksumAddress = wallet.getAddressChecksum();
      expect(checksumAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(checksumAddress).not.toEqual(wallet.address.toLowerCase());
      expect(checksumAddress).not.toEqual(wallet.address.toUpperCase());
    });

    it("should return the correct ICAP from the wallet", () => {
      const wallet = Wallet.createRandomWallet();
      const icap = wallet.getIcap();
      expect(icap).toMatch(
        /XE\d\d [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4} [A-Z0-9]{4}/
      );
    });
  });
});
