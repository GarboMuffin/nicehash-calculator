# NiceHash Profit Calculator for Buyers v2

A JavaScript program to estimate the profitability of buying hashing power on [NiceHash](https://www.nicehash.com/?refby=258346). Feel free to [make an issue](https://github.com/GarboMuffin/nicehash-calculator/issues/new) if you need help using this.

**This project is not affiliated with NiceHash. I am not responsible for any losses that may come as a result of this project.**

## Website

### [You can find the statistics output by this in a simple website without having to setup anything!](https://nicehash.garbomuffin.com/)

## Installing / Downloading

### Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (8 or later will work)

### Downloading

<!-- TODO: use github releases instead? -->

```
git clone https://github.com/GarboMuffin/nicehash-calculator/
cd nicehash-calculator
```

### Setup

```bash
npm install --only=production
npm run build
```

## Usage

```
node index.js [arguments or coins]
```

### Arguments

| Argument | Description |
|--------------|----------------|
| `--experimental-fees` | Enables calculations to include a 3% fee. (experimental) |
| `--no-color` | Disables color |
| `--no-header` | Disables the large message printed at the start |
| `--no-warnings` | Disables warnings |
| `--output=thing` | Changes the format of the output. Valid values for `thing` are `pretty` (default), `json`, and `delayed-json` |
| `--prices=thing` | Changes the prices used in calculations. Valid values for `thing` are `average` (default), `minimum`, and `minimum-with-speed` |
| `--sleep-time=number` | Changes the time waited between each coin in milliseconds. Default is 1000. Replace `number` with some other number |
| `--list-coins` | List enabled coin |
| `--debug` | Makes it really verbose |

### Coins

By default it will run on all coins. This is probably not the behavior you want. To only run on a few coins, you can specify a list of coins for the program. It's probably easiest to understand usage by example:

```bash
# Everything is case insensitive. bItCoIn and bitcoin both have the same effect

# You can specify names of coins to enable only those
# To run on only bitcoin, litecoin, and ethereum you could do:
node index bitcoin litecoin ethereum

# A coin's ticker also works in most cases:
node index btc ltc eth

# Or you can enable entire algorithms:
node index scrypt

# And you can mix coins and algorithms:
node index scrypt bitcoin

# You can prepend a single `-` to disable that coin instead of enabling it.
# Run on all coins except bitcoin:
node index -bitcoin

# Run on all scrypt coins except litecoin:
node index scrypt -litecoin

# And you can use `-` on algorithms as well
# Run on all coins except scrypt coins:
node index -scrypt

# Perhaps this example will explain it best:
# Run on all scrypt coins except litecoin and also run on bitcoin
node index scrypt -litecoin bitcoin
```

### Supported coins

As coins are added to What To Mine they should automatically be supported if they use an algorithm on NiceHash. As coins become inactive they will disappear.

<details>
  <summary>All supported coins as of 11/8/2018 (Click to reveal)</summary>

  ```sh
  $ node index --list-coins
  ...

  Enabled coins:
   * Bitcoin (BTC) (SHA-256)
   * Litecoin (LTC) (Scrypt)
   * Vertcoin (VTC) (Lyra2REv2)
   * Dogecoin (DOGE) (Scrypt)
   * Feathercoin (FTC) (NeoScrypt)
   * Einsteinium (EMC2) (Scrypt)
   * DGB-Scrypt (DGB) (Scrypt)
   * Worldcoin (WDC) (Scrypt)
   * Myriad-Scrypt (XMY) (Scrypt)
   * Dash (DASH) (X11)
   * AUR-Scrypt (AUR) (Scrypt)
   * Québecoin (QBC) (X11)
   * Peercoin (PPC) (SHA-256)
   * Zetacoin (ZET) (SHA-256)
   * Unobtanium (UNO) (SHA-256)
   * Myriad-SHA (XMY) (SHA-256)
   * Gulden (NLG) (Scrypt)
   * Maza (MAZA) (SHA-256)
   * Phoenixcoin (PXC) (NeoScrypt)
   * Orbitcoin (ORB) (NeoScrypt)
   * Maxcoin (MAX) (Keccak)
   * Monero (XMR) (CryptoNightV8)
   * Bytecoin (BCN) (CryptoNight)
   * DigitalNote (XDN) (CryptoNightV7)
   * Viacoin (VIA) (Scrypt)
   * DGB-SHA (DGB) (SHA-256)
   * DGB-Qubit (DGB) (Qubit)
   * Mooncoin (MOON) (Scrypt)
   * Halcyon (HAL) (NeoScrypt)
   * Startcoin (START) (X11)
   * Quark (QRK) (Quark)
   * GameCredits (GAME) (Scrypt)
   * Monacoin (MONA) (Lyra2REv2)
   * Influxcoin (INFX) (X11)
   * Verge-Scrypt (XVG) (Scrypt)
   * Ethereum (ETH) (DaggerHashimoto)
   * Decred (DCR) (Decred)
   * Expanse (EXP) (DaggerHashimoto)
   * Adzcoin (ADZ) (X11)
   * Ethereum Classic (ETC) (DaggerHashimoto)
   * LBRY (LBC) (LBRY)
   * Crown (CRW) (SHA-256)
   * Zcash (ZEC) (Equihash)
   * Zclassic (ZCL) (Equihash)
   * Hush (HUSH) (Equihash)
   * Sibcoin (SIB) (X11Gost)
   * Pascalcoin (PASC) (Pascal)
   * Ubiq (UBQ) (DaggerHashimoto)
   * Komodo (KMD) (Equihash)
   * Zcoin (XZC) (Lyra2Z)
   * Karbo (KRB) (CryptoNight)
   * PascalLite (PASL) (Pascal)
   * Musicoin (MUSIC) (DaggerHashimoto)
   * Deutsche eMark (DEM) (SHA-256)
   * Horizen (ZEN) (Equihash)
   * Cannabiscoin (CANN) (X11)
   * Bitcoin Cash (BCH) (SHA-256)
   * Onix (ONX) (X11)
   * Linx (LINX) (Scrypt)
   * Sumokoin (SUMO) (CryptoNight)
   * SmartCash (SMART) (Keccak)
   * Vivo (VIVO) (NeoScrypt)
   * Monoeci (XMCC) (X11)
   * Creamcoin (CRM) (X11)
   * Metaverse (ETP) (DaggerHashimoto)
   * Pirl (PIRL) (DaggerHashimoto)
   * Electroneum (ETN) (CryptoNight)
   * Trezarcoin (TZC) (NeoScrypt)
   * DeepOnion (ONION) (X13)
   * Verge-Lyra2REv2 (XVG) (Lyra2REv2)
   * Verge-Blake (2s) (XVG) (Blake (2s))
   * Ellaism (ELLA) (DaggerHashimoto)
   * Florin (FLO) (Scrypt)
   * Universal (UNIT) (SHA-256)
   * GoByte (GBX) (NeoScrypt)
   * Crowdcoin (CRC) (NeoScrypt)
   * Dinastycoin (DCY) (CryptoNight)
   * AUR-SHA (AUR) (SHA-256)
   * Innova (INN) (NeoScrypt)
   * Bitcoin Private (BTCP) (Equihash)
   * LitecoinCash (LCC) (SHA-256)
   * Galactrum (ORE) (Lyra2REv2)
   * Ravencoin (RVN) (X16R)
   * Dinero (DIN) (NeoScrypt)
   * MoneroOriginal (XMO) (CryptoNight)
   * Paccoin ($PAC) (X11)
   * Straks (STAK) (Lyra2REv2)
   * Motion (XMN) (X16R)
   * Loki (LOKI) (CryptoNightHeavy)
   * Gincoin (GIN) (Lyra2Z)
   * SimpleBank (SPLB) (NeoScrypt)
   * Mano (MANO) (Lyra2Z)
   * Commercium (CMM) (Equihash)
   * MCT+ (MCT) (Lyra2Z)
   * HelpTheHomeless (HTH) (X16R)
   * Ryo (RYO) (CryptoNightHeavy)
   * Graft (GRFT) (CryptoNightV8)
   * Gravium (GRV) (X16R)
   * Quantum R L (QRL) (CryptoNightV7)
   * Nix (NIX) (Lyra2REv2)
   * Gentarium (GTM) (Lyra2Z)
   * Hanacoin (HANA) (Lyra2REv2)
   * Dubaicoin (DBIX) (DaggerHashimoto)
   * Traid (TRAID) (NeoScrypt)
   * LitecoinPlus (LCP) (Scrypt)
  ```
</details>

## API

nicehash-calculator's functionality can be embedded in other programs, albiet with a lot of spaghetti.

### Reading stdout

It's possible to spawn a new process of the program and read the console output. You'll probably want the arguments `--no-header --no-warnings --output=json` to make it output just machine parsable JSON. `--output=delayed-json` will instead wait until the end and log a single large array instead of an individual object for each coin.

### Using the API directly

If you are already in node, there's a good chance you can use the classes directly. [This is what nicehash.garbomuffin.com does now](https://github.com/GarboMuffin/nicehash-calculator-web/blob/master/src/getData.js), because running an additional node process and parsing stdout has been problematic.

Take the compiled TypeScript and just drop it into your project somewhere (in this example a folder named "nicehash-calculator"); maybe with a link to the commit. It's not in NPM (for now, at least).

```javascript
// imports for options parsing
const parseOptions = require("./nicehash-calculator/options/index").parseOptions;
// imports for the main functionality
const NiceHashCalculator = require("./nicehash-calculator/calculator/NiceHashCalculator").NiceHashCalculator;

// You can also do this in getData() below, but you should only have to do it once.
const options = parseOptions([]); // get the default options
// Disable the header
options.showHeader = false;
// Disable warnings
options.showWarnings = false;
// Choose a reasonable time between each coin to avoid API rate limits
options.sleepTime = 2500;
// Define the coins you want to include. Supports all filtering rules you can use from the CLI
options.coins = [
  "bitcoin"
];

// Returns a promise that resolves with all the data
function getData() {
  return new Promise((resolve, reject) => {
    const result = [];

    // We need to define a custom output handler
    // This happens inside of getData() so that the class can access the `result` list easier
    options.outputHandler.class = class {
      constructor() {
        // disable console output meant for users
        this.pretty = false;
      }

      // Called once for each coin.
      handle(data) {
        // `data` is the raw coin data that you can do anything with
        // here, we just push it to an array so we can return it later
        result.push(data);
      }

      // Called once when everything is finished
      finished() {
        // resole the promise with the result
        resolve(result);
      }
    };

    // construct a calculator object with the options we determined earlier
    const calculator = new NiceHashCalculator(options);

    // start() returns a promise
    calculator.start()
      .catch((err) => {
        reject(err);
      });
  });
}

// example usage
getData().then((result) => console.log(result));
```

## Donations?

Any donations are appreciated:

```
BTC (bech32): bc1qkuz9a4trzgvdq9sru800jtxfz0ld0vtwrqu0nq
BTC: 1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ
BCH: qzjtsdg8uskpa8q5lgt7rxvxm7gv27vk0qrwgyy0nz
LTC: LNTXpx86L2ADQPMC3t78jNvramJ1xMS2F4
ETH: 0xE9eDFAB6565695C01c1978B9782ad1FE22b3E5AC
DOGE: DS7aiQgXqFrmwG3bRK3kzC78Hb114y7Y1R
```
