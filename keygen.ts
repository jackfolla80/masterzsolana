import {Keypair} from "@solana/web3.js";

const wallet = Keypair.generate();

console.log(wallet);