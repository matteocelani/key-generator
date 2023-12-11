import { Wallet } from "./services/Wallet";

try {
  const wallet = Wallet.createRandomWallet();
  console.log(`Address: ${wallet.address}`);
  console.log(`Address (checksum): ${wallet.getAddressChecksum()}`);
  console.log(`ICAP: ${wallet.getIcap()}`);
  console.log(`Public Key: ${wallet.publicKey}`);
  console.log(`Private Key: ${wallet.getPrivateKeyHex()}`);
} catch (error) {
  if (error instanceof Error) {
    console.error("Error: ", error.message);
  } else {
    console.error("Unknown error occurred");
  }
}
