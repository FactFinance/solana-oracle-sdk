# Fact Finance Solana SDK

> Fact Finance Solana SDK is a library that provides a set of tools to interact with the Fact Finance protocol on the Solana blockchain.

## Installation

```bash
  git clone https://github.com/FactFinance/fact-sdk.git
```

Then, install the dependencies:

```bash
  cd fact-sdk
  yarn
```

## Usage

```typescript
  import { TheFactOracle } from 'TheFactOracle';

  const theFactOracle = new TheFactOracle(provider, "testnet");
  let [value, timestamp] = await theFactOracle.getValueAccount(datafeedAccount);
```

### Example

```typescript
  import { TheFactOracle } from 'TheFactOracle';

  const wallet = await getKey();
  const anchorWallet = new anchor.Wallet(wallet);

  let connection = new web3.Connection("https://api.testnet.solana.com", "confirmed");
  const provider = new anchor.AnchorProvider(connection, anchorWallet, {})
  anchor.setProvider(provider);

  const theFactOracle = new TheFactOracle(provider, "testnet");
  const pdaAdmin = new web3.PublicKey(FACT_PDA_ADMIN);
  const testnetProgram = new web3.PublicKey(TESTNET_FACT_PROGRAM_ID);
  const feedId = 150;

  let [datafeedAccount, _] = await anchor.web3.PublicKey.findProgramAddress(
    [pdaAdmin.toBuffer(), Buffer.from("_"), Buffer.from(feedId.toString())], 
    testnetProgram
  );

  let [value, timestamp] = await theFactOracle.getValueAccount(datafeedAccount);

```

## License

MIT
