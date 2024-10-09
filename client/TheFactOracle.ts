import * as borsch from "borsh";
import { Oracle } from "./rust-files/oracle";
import OracleIDL from "./rust-files/oracle.json"
import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import * as fact from "./const";

/**
 * 
 *  let connection = new web3.Connection("https://api.devnet.solana.com","confirmed");
 *  const wallet = web3.Keypair.generate();
 *  const anchorWallet = new anchor.Wallet(wallet);
 * 
 *  const provider = new anchor.AnchorProvider(connection, anchorWallet, {})
 *  anchor.setProvider(provider);
 *
 *  const theFactOracle = new TheFactOracle(provider);
 *  let [value, timestamp] = await theFactOracle.getValueAccount(150);
 * 
 */

export class TheFactOracle {
    programId: web3.PublicKey;
    provider: anchor.Provider;
    program: anchor.Program<Oracle>;

    adminAddress: web3.PublicKey;

    walletUser: web3.Keypair;
    walletSystem: web3.Keypair;

    constructor(provider: anchor.Provider, environment?: "devnet" | "testnet" | "mainnet") {
        this.programId = new web3.PublicKey(fact.DEVNET_FACT_PROGRAM_ID);
        if (environment == "testnet") {
            this.programId = new web3.PublicKey(fact.TESTNET_FACT_PROGRAM_ID);
        } else if (environment == "mainnet") {
            throw new Error("Mainnet not supported yet!");
        }
        
        this.provider = provider;
        this.program = new anchor.Program(OracleIDL as any, this.programId, this.provider);
        
        // adminAddress é o endereço que o programa usa para criar o PDA.
        this.adminAddress = new web3.PublicKey(fact.FACT_PDA_ADMIN);
        this.walletUser = web3.Keypair.generate();
        
    }

    setSystemWallet(wallet: web3.Keypair) {
        this.walletSystem = wallet;
    }

    async getValue(datafeedAccount: anchor.web3.PublicKey) {

        try {
            let txId = await this.program.methods
                .getDatafeed()
                .accounts({
                    datafeed: datafeedAccount,
                    signer: this.walletUser.publicKey,
                })
                .signers([this.walletUser])
                .rpc();
            console.log("getValue TxId => ", txId);


            const latestBlockHash = await this.provider.connection.getLatestBlockhash();

            await this.provider.connection.confirmTransaction({
                signature: txId, 
                blockhash: latestBlockHash.blockhash, 
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight}
            );
        
            let tx = await this.provider.connection.getTransaction(txId, {commitment: "confirmed"});
            // console.log("TX META =>", tx.meta);
            let data = (tx.meta as any).returnData.data;
            // console.log("TX META returnData =>", data);
            const buffer = Buffer.from(data[0], data[1]);
            // console.log("TX META buffer =>", buffer);
            let returned = borsch.deserialize(oracleFeedReturnSchema, OracleFeedReturn, buffer);
            console.log("TX META returned =>", returned);

        } catch (e) {
            console.log("Datafeed not found (getValue)!", e);
        }

    }

    async ADMIN_initialize(datafeedAccount: anchor.web3.PublicKey, feedid: number) {
        if (this.walletSystem == undefined) throw new Error("System wallet not set!");

        try {
            let data = await this.program.account.dataFeed.fetch(datafeedAccount);
            console.log("Datafeed already initialized => ", data);
        } catch (e) {

            let instructionInitialize = await this.program.methods
            .initialize(feedid)
            .accounts({
                datafeed: datafeedAccount,
                signer: this.walletSystem.publicKey,
            })
            .signers([this.walletSystem])
            .rpc()
            ;
            console.log("Instruction Initialize => ", instructionInitialize);
        }
    }

    async ADMIN_setValue(datafeedAccount: anchor.web3.PublicKey, new_value: number) {
        if (this.walletSystem == undefined) throw new Error("System wallet not set!");

        try {
            let data = await this.program.account.dataFeed.fetch(datafeedAccount);
        } catch (e) {
            console.log("Datafeed not found (ADMIN_setValue)!");
        }
        
        const timestamp = Math.floor(Date.now() / 1000);
        
        let instructionSetValue = await this.program.methods
        .setValue(new_value, timestamp, 1)
        .accounts({
            datafeed: datafeedAccount,
            signer: this.walletSystem.publicKey,
        })
        .signers([this.walletSystem])
        .rpc()
        ;
        console.log("Instruction Set Value => ", instructionSetValue);
    }
}

class OracleFeedReturn {
    value = 0;
    timestamp = 0;

    constructor(fields: { value: number, timestamp: number }) {
        this.value = fields.value;
        this.timestamp = fields.timestamp;
    }
}

const oracleFeedReturnSchema = new Map([
    [
        OracleFeedReturn,
        {
        kind: "struct",
        fields: [
            ["value", "u32"],
            ["timestamp", "u32"],
            ["confidence", "u8"],
        ],
        },
    ],
]);
