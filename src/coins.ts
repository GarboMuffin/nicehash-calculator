/*
 * All coins supported by this script.
 */

import {Hash, HashRate} from "./hash";
import {Algorithms as Algorithm} from "./algorithms";

import {coin as Bitcoin} from "./coins/sha/bitcoin";
import {coin as BitcoinCash} from "./coins/sha/bitcoincash";
import {coin as Ethereum} from "./coins/ethash/ethereum";
import {coin as EthereumClassic} from "./coins/ethash/ethereumclassic";
import {coin as Expanse} from "./coins/ethash/expanse";
import {coin as Musicoin} from "./coins/ethash/musicoin";
import {coin as Ubiq} from "./coins/ethash/ubiq";
import {coin as Litecoin} from "./coins/scrypt/litecoin";
import {coin as Dogecoin} from "./coins/scrypt/dogecoin";
import {coin as Gamecredits} from "./coins/scrypt/gamecredits";
import {coin as Vertcoin} from "./coins/lyra2rev2/vertcoin";
import {coin as ZCash} from "./coins/equihash/zcash";
import {coin as ZClassic} from "./coins/equihash/zclassic";
import {coin as Pascal} from "./coins/pascal/pascal";
import {coin as Monero} from "./coins/cryptonight/monero";
import {coin as Maxcoin} from "./coins/keccak/maxcoin";
import {coin as Feathercoin} from "./coins/neoscrypt/feathercoin";
import {coin as Siacoin} from "./coins/sia";
import {coin as Decred} from "./coins/decred";
import {coin as Dash} from "./coins/x11/dash";
import {coin as Lbry} from "./coins/lbry";
import {coin as Sibcoin} from "./coins/sibcoin";
import {coin as Signatum} from "./coins/signatum";

export interface Coin {
  name: string
  names?: string[]

  NiceHash: {
    hashrate: HashRate
    id: Algorithm
  }

  WhatToMine: {
    hashrate: number
    id: number
  }

  enabled: boolean
}

export var coins: Coin[] = [
  Bitcoin,
  BitcoinCash,
  Ethereum,
  EthereumClassic,
  Expanse,
  Musicoin,
  Ubiq,
  Litecoin,
  Dogecoin,
  Gamecredits,
  Vertcoin,
  ZCash,
  ZClassic,
  Pascal,
  Monero,
  Maxcoin,
  Feathercoin,
  Siacoin,
  Decred,
  Dash,
  Lbry,
  Sibcoin,
  Signatum,
];

// sorts the coins alphabetically
coins.sort(function(a, b) {
  var atext = a.name.toUpperCase();
  var btext = b.name.toUpperCase();
  return (atext < btext) ? -1 : (atext > btext) ? 1 : 0;
});
