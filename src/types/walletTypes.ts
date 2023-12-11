export interface IWallet {
    getPrivateKeyHex(): string;
    address: string;
  }