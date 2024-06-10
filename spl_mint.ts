import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "./wallet.json";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

let myWallet = Keypair.fromSecretKey(new Uint8Array(wallet));
let mintAccount = new PublicKey("4DazxURHRo3hjfWZUdH6yji3BSJAcDVKKhk6Cysg3r2t");


(async ()=>{

    const accountToken = await getOrCreateAssociatedTokenAccount(
        connection,
        myWallet,
        mintAccount,
        myWallet.publicKey,
    );

    const ata = accountToken.address;

    console.log("ATA: ", ata.toBase58());  
    const amount = 10e6

    await mintTo(
        connection,
        myWallet,
        mintAccount,
        ata,
        myWallet.publicKey,
        amount

    );

    console.log("Minted", amount, "to", ata.toBase58());

})();