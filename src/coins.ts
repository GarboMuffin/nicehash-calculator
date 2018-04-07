/*
 * All coins supported by this script.
 */

import { Hash, HashRate } from "./hash";
import { Algorithms as Algorithm } from "./algorithms";

// SHA
import { coin as Bitcoin } from "./coins/sha/bitcoin";
import { coin as BitcoinCash } from "./coins/sha/bitcoincash";

// ETHASH
import { coin as Ethereum } from "./coins/ethash/ethereum";
import { coin as EthereumClassic } from "./coins/ethash/ethereumclassic";
import { coin as Expanse } from "./coins/ethash/expanse";
import { coin as Musicoin } from "./coins/ethash/musicoin";
import { coin as Ubiq } from "./coins/ethash/ubiq";
import { coin as Krypton } from "./coins/ethash/krypton";
import { coin as Shift } from "./coins/ethash/shift";
import { coin as Soilcoin } from "./coins/ethash/soilcoin";

// SCRYPT
import { coin as Litecoin } from "./coins/scrypt/litecoin";
import { coin as Dogecoin } from "./coins/scrypt/dogecoin";
import { coin as Gamecredits } from "./coins/scrypt/gamecredits";

// lYRA2REV2
import { coin as Vertcoin } from "./coins/lyra2rev2/vertcoin";
import { coin as Monacoin } from "./coins/lyra2rev2/monacoin";

// EQUIHASH
import { coin as ZCash } from "./coins/equihash/zcash";
import { coin as ZClassic } from "./coins/equihash/zclassic";
import { coin as Hush } from "./coins/equihash/hush";
import { coin as Komodo } from "./coins/equihash/komodo";
import { coin as Zencash } from "./coins/equihash/zencash";

// PASCAL
import { coin as Pascal } from "./coins/pascal/pascal";

// CRYPTONIGHTV7
import { coin as Monero } from "./coins/cryptonightv7/monero";

// CRYPTONIGHT
import { coin as Aeon } from "./coins/cryptonight/aeon";
import { coin as Bipcoin } from "./coins/cryptonight/bipcoin";
import { coin as Bytecoin } from "./coins/cryptonight/bytecoin";
import { coin as Dashcoin } from "./coins/cryptonight/dashcoin";
import { coin as Digitalnote } from "./coins/cryptonight/digitalnote";
import { coin as Fantomcoin } from "./coins/cryptonight/fantomcoin";
import { coin as Karbowanec } from "./coins/cryptonight/karbowanec";
import { coin as Sumokoin } from "./coins/cryptonight/sumokoin";
import { coin as Quazarcoin } from "./coins/cryptonight/quazarcoin";

// KECCAK
import { coin as Maxcoin } from "./coins/keccak/maxcoin";
import { coin as Creativecoin } from "./coins/keccak/creativecoin";
import { coin as ThreeSixtyFiveCoin } from "./coins/keccak/365coin"; // variables can't start with numbers
import { coin as Smartcash } from "./coins/keccak/smartcash";

// NEOSCRYPT
import { coin as Feathercoin } from "./coins/neoscrypt/feathercoin";
import { coin as Halcyon } from "./coins/neoscrypt/halcyon";
import { coin as Orbitcoin } from "./coins/neoscrypt/orbitcoin";
import { coin as Phoenixcoin } from "./coins/neoscrypt/phoenixcoin";
import { coin as Vivo } from "./coins/neoscrypt/vivo";

// OTHER
import { coin as Siacoin } from "./coins/sia";
import { coin as Decred } from "./coins/decred";
import { coin as Dash } from "./coins/x11/dash";
import { coin as Lbry } from "./coins/lbry";
import { coin as Sibcoin } from "./coins/sibcoin";
import { coin as Signatum } from "./coins/signatum";

export interface Coin {
  name: string;
  names?: string[];

  NiceHash: {
    hashrate: HashRate
    id: Algorithm
  };

  WhatToMine: {
    hashrate: number
    id: number
  };

  enabled: boolean;
}

export var coins: Coin[] = [
  // SHA
  Bitcoin,
  BitcoinCash,

  // ETHASH
  Ethereum,
  EthereumClassic,
  Expanse,
  Musicoin,
  Ubiq,
  Krypton,
  Shift,
  Soilcoin,

  // SCRYPT
  Litecoin,
  Dogecoin,
  Gamecredits,

  // LYRA2REV2
  Vertcoin,
  Monacoin,

  // EQUIHASH
  ZCash,
  ZClassic,
  Hush,
  Komodo,
  Zencash,

  // PASCAL
  Pascal,

  // CRYPTONIGHTV7
  Monero,

  // CRYPTONIGHT
  Aeon,
  Bipcoin,
  Bytecoin,
  Dashcoin,
  Digitalnote,
  Fantomcoin,
  Karbowanec,
  Sumokoin,
  Quazarcoin,

  // KECCAK
  Maxcoin,
  Smartcash,
  ThreeSixtyFiveCoin,
  Creativecoin,

  // NEOSCRYPT
  Feathercoin,
  Halcyon,
  Orbitcoin,
  Phoenixcoin,
  Vivo,

  // OTHER
  Siacoin,
  Decred,
  Dash,
  Lbry,
  Sibcoin,
  Signatum,
];

// sorts the coins alphabetically
coins.sort(function (a, b) {
  var atext = a.name.toUpperCase();
  var btext = b.name.toUpperCase();
  return (atext < btext) ? -1 : (atext > btext) ? 1 : 0;
});
