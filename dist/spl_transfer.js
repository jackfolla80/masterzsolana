"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const wallet_json_1 = __importDefault(require("./wallet.json"));
const wallet2_json_1 = __importDefault(require("./wallet2.json"));
const connection = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
let myWallet = web3_js_1.Keypair.fromSecretKey(new Uint8Array(wallet_json_1.default));
console.log("mywallet: ", myWallet.publicKey);
const ataMyWallet = new web3_js_1.PublicKey("71mZtws9ocxjhvqLdDS6g5Us6eWzyBtznAQDQ9TdV41x");
let destination = web3_js_1.Keypair.fromSecretKey(new Uint8Array(wallet2_json_1.default));
console.log("destination: ", destination.publicKey);
//oppure usare Keypair.generate()
const mintAccount = new web3_js_1.PublicKey("4DazxURHRo3hjfWZUdH6yji3BSJAcDVKKhk6Cysg3r2t");
(() => __awaiter(void 0, void 0, void 0, function* () {
    //Create second token account
    const tokenAccountDestination = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, myWallet, mintAccount, destination.publicKey);
    const ataDestination = tokenAccountDestination.address;
    console.log(ataDestination.toBase58());
    const amount = 1e6;
    //Adesso trasferiamo dei token
    yield (0, spl_token_1.transfer)(connection, myWallet, ataMyWallet, ataDestination, myWallet, amount);
    console.log("minted: ", amount, "to Associated Token Account: ", ataDestination.toBase58());
}))();
