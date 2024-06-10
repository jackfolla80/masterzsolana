import {Connection, Keypair, PublicKey} from "@solana/web3.js";
import {mintTo, getOrCreateAssociatedTokenAccount, transfer} from "@solana/spl-token";
import wallet from "./wallet.json";
import wallet2 from "./wallet2.json";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

let myWallet = Keypair.fromSecretKey(new Uint8Array(wallet));
console.log("mywallet: ", myWallet.publicKey);
const ataMyWallet = new PublicKey("71mZtws9ocxjhvqLdDS6g5Us6eWzyBtznAQDQ9TdV41x");
let destination = Keypair.fromSecretKey(new Uint8Array(wallet2));
console.log("destination: ", destination.publicKey);
//oppure usare Keypair.generate()
const mintAccount = new PublicKey("4DazxURHRo3hjfWZUdH6yji3BSJAcDVKKhk6Cysg3r2t");



(async ()=>{

    //Create second token account

    const tokenAccountDestination = await getOrCreateAssociatedTokenAccount(
        connection,
        myWallet,
        mintAccount,
        destination.publicKey
    );

    const ataDestination = tokenAccountDestination.address;
    console.log(ataDestination.toBase58());

    const amount = 1e6;
    //Adesso trasferiamo dei token

    await transfer(

        connection,
        myWallet,
        ataMyWallet,
        ataDestination,
        myWallet,
        amount

    )

    console.log("minted: ", amount , "to Associated Token Account: " , ataDestination.toBase58());


   
})();