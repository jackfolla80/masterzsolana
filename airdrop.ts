import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./wallet.json";


const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const myWallet = Keypair.fromSecretKey(new Uint8Array(wallet));

(async ()=>{

    console.log("publicKey: ", myWallet.publicKey);
    const tx = await connection.requestAirdrop(
        myWallet.publicKey,
        2*LAMPORTS_PER_SOL
    );

    console.log(tx);


})();