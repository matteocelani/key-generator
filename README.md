# Wallet Private Key Generator

Offline private key generation for Ethereum wallets.

## Key Generation Methodology

In the process of generating keys for Ethereum wallets, it begins by randomly creating a private key with `randomBytes` from Node.js. Subsequently, the public key is derived from the private key using the `secp256k1` elliptic curve cryptography algorithm [[1]](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography). The Ethereum address is generated by applying the `Keccak256` hash [[2]](https://he3.app/en/blogs/understanding-keccak256-hash-a-guide-for-developers/) to the public key.

Finally, the Ethereum address is converted into an ICAP format, using a base 36 transformation and a checksum algorithm for the correct formatting and validity of the ICAP address.

For further details and clarifications on the generation of Ethereum keys and addresses, it is recommended to consult chapter 4 of the book "Mastering Ethereum": [Keys Addresses](https://github.com/ethereumbook/ethereumbook/blob/develop/04keys-addresses.asciidoc).

## Usage

### Installation

```bash
npm install
```

### Compilation

```bash
npm run build
```

This command compiles the TypeScript code into JavaScript.

### Execution

```bash
npm start
```

Generates a wallet with address and private key.

### Testing

```bash
npm run test
```

Tests are implemented using Jest and are located in the `test` folder.
