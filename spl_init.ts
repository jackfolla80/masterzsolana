import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {createMint} from "@solana/spl-token";
import wallet from "./wallet.json";
import { create } from "domain";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
let myWallet = Keypair.fromSecretKey(new Uint8Array(wallet));

(async ()=>{

    const mint = await createMint(
        connection,
        myWallet,
        myWallet.publicKey,
        null,
        6
    );

    console.log("mint account: ", mint.toBase58());

})();