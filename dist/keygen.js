"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const wallet = web3_js_1.Keypair.generate();
console.log(wallet);
