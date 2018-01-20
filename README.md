I'm currently rewriting pretty much the entire program in the [rewrite branch](https://github.com/GarboMuffin/nicehash-calculator/tree/rewrite). It's not done yet but it's a WIP.

This README and anything the program says to run might be a litte outdated (made some changes to how you're supposed to run it) but the installation, usage, and arguments section of this README are accurate.

# NiceHash Profit Calculator

A customizable script to calculate the profitability of buying hashing power on nicehash (spoiler: don't expect much)

## Installation

1. Install [git](https://git-scm.com/)
1. Install a recent version of [node](https://nodejs.org/en/), whatever the current LTS is will work
1. Run these commands:

```bash
git clone https://github.com/GarboMuffin/nicehash-calculator
cd nicehash-calculator
npm install
```

## Usage

```bash
# Build the files, run this once when you download it and whenver you make changes
$ npm run build

# Run the thing, make sure you ran the above first!
# Of course replace [...arguments] with any arguments or remove it.
$ npm start -- [...arguments]
# If you don't like the above this will also work
$ node dist/index [...arguments]
```

## Arguments

There's lots of them. You can put things in arguments.txt for them to be read automatically. (see the existing arguments.txt for an example)

| argument | description | usage |
|:----------------:|:---------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------:|
| `--show-percent` | additionally shows how much % you will make/lose of your investment |  |
| `--min-profit=X` | only output data if the profit is greater than X btc or percent | `--min-profit=0.01` or `--min-profit=10%` |
| `--only-revenue` | only output revenue information |  |
| `--prompt` | wait for enter is pressed after each coin |  |
| `--find-min` | find the minimum prices instead of average prices   note: much slower. this changes the output to have EU/US categories as they are different |  |
| `--location=X` | only find the prices in a certain marketplace. used with `--find-min` | `--location=eu` or `--location=us` |
| `--no-color` | disables color |  |
| `--no-header` | hides the header containing disclaimers and donation addresses |  |
| `--fixed` | unfinished, please do not use. all results are inaccurate. |  |
| `--fixed-speed=X` | (for fixed orders) the requested speed to be used in price calculations, unit changes with algo | `--fixed-speed=1` |

Additionally, you can specify names, abbreviations, or algos to enable only those coins. For example `ts-node index xmr decred ethash` would run this script on monero (because of XMR), decred, ethereum, and ethereum classic (because of ethash).

## Supported Coins

```bash
$ ts-node index list
Supported coins:
 * 365Coin (Keccak) (disabled by default)
 * Aeon (CryptoNight) (disabled by default)
 * Bipcoin (CryptoNight) (disabled by default)
 * Bitcoin (SHA256)
 * Bitcoin Cash (SHA256)
 * Bytecoin (CryptoNight) (disabled by default)
 * Creativecoin (Keccak) (disabled by default)
 * Dash (X11) (disabled by default)
 * Dashcoin (CryptoNight) (disabled by default)
 * Decred (Decred) (disabled by default)
 * Digitalnote (CryptoNight) (disabled by default)
 * Dogecoin (Scrypt) (disabled by default)
 * Ethereum (DaggerHashimoto)
 * Ethereum Classic (DaggerHashimoto)
 * Expanse (DaggerHashimoto) (disabled by default)
 * Fantomcoin (CryptoNight) (disabled by default)
 * Feathercoin (NeoScrypt) (disabled by default)
 * Gamecredits (Scrypt) (disabled by default)
 * Halcyon (NeoScrypt) (disabled by default)
 * Hush (Equihash) (disabled by default)
 * Karbowanec (CryptoNight) (disabled by default)
 * Komodo (Equihash) (disabled by default)
 * Krypton (DaggerHashimoto) (disabled by default)
 * Lbry (Lbry) (disabled by default)
 * Litecoin (Scrypt)
 * Maxcoin (Keccak) (disabled by default)
 * Monacoin (Lyra2REv2) (disabled by default)
 * Monero (CryptoNight)
 * Musicoin (DaggerHashimoto) (disabled by default)
 * Orbitcoin (NeoScrypt) (disabled by default)
 * Pascal (Pascal) (disabled by default)
 * Phoenixcoin (NeoScrypt) (disabled by default)
 * Quazarcoin (CryptoNight) (disabled by default)
 * Shift (DaggerHashimoto) (disabled by default)
 * Sia (Sia) (disabled by default)
 * Sibcoin (X11Gost) (disabled by default)
 * Signatum (Skunk) (disabled by default)
 * Smartcoin (Keccak) (disabled by default)
 * Soilcoin (DaggerHashimoto) (disabled by default)
 * Sumokoin (CryptoNight) (disabled by default)
 * Ubiq (DaggerHashimoto) (disabled by default)
 * Vertcoin (Lyra2REv2) (disabled by default)
 * Vivo (NeoScrypt) (disabled by default)
 * ZCash (Equihash)
 * ZClassic (Equihash) (disabled by default)
 * Zencash (Equihash) (disabled by default)
```

## Disclaimer

I am not responsible for any losses that come as a result of this program. The results of this program do not neccessarily reflect real world results. Your money is your responsibility. This does not account for fees (nicehash, pool, withdraw, exchange, transaction fees when the mempool is full...) or pool luck (this assumes constant 100% pool luck, which is not realistic. i've seen pool luck of >8000% one time...). Conservsion rates can change very quickly making any results here obsolete.

## Send me money

If this is useful consider sending some money my way.

BTC: 1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ  
BTC (SegWit): bc1qvwfx77aqe2ssu4as39mskmhp22v0dmjtapvmjw  
LTC: LfRV8T392L7M2n3pLk2DAus6bFhtqcfAht  
ETH: 0x86dd805eb129Bfb268F21455451cD3C4dAA1c5F9  
