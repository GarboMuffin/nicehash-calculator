# NiceHash Profit Calculator
A customizable script to calculate the profitability of buying hashing power on nicehash (spoiler: don't expect much)

## Installation
1. Install [git](https://git-scm.com/)
2. Install a recent version of [node](https://nodejs.org/en/), whatever the current LTS is will work
3. Run these commands:
```bash
git clone https://github.com/GarboMuffin/nicehash-calculator
cd nicehash-calculator
npm install
npm install -g ts-node typescript
```

## Usage
```bash
ts-node index [...args]
```

## Arguments
There's lots of them. You can put things in arguments.txt for them to be read automatically. (see the existing arguments.txt for an example)

| argument | description | usage |
|:----------------:|:---------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------:|
| `--show-percent` | additionally shows how much % you will make/lose of your investment |  |
| `--min-profit=X` | only output data if the profit is greater than X btc or percent | `--min-profit=0.01` or `--min-profit=10%` |
| `--only-revenue` | only output revenue information |  |
| `--prompt` | wait for enter is pressed after each coin |  |
| `--fixed` | unfinished, please do not use. all results are inaccurate. |  |
| `--find-min` | find the minimum prices instead of average prices   note: much slower. this changes the output to have EU/US categories as they are different |  |
| `--location=X` | only find the prices in a certain marketplace. used with `--find-min` | `--location=eu` or `--location=us` |
| `--no-color` | disables color |  |
| `--no-header` | hides the header containing disclaimers and donation addresses |  |
| `--fixed-speed=X` | (for fixed orders) the requested speed to be used in price calculations, unit changes with algo | `--fixed-speed=1` |

Additionally, you can specify names, abbreviations, or algos to enable only those coins. For example `ts-node index xmr decred ethash` would run this script on monero, decred, ethereum, and ethereum classic.

## supported coins
```
λ ts-node index list
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

Most of these coins are unprofitable to mine and thus are not aliased to their algo. (eg. cryptonight does not include quazarcoin or whatever, just monero)

## Disclaimer
I am not responsible for any losses that come as a result of this program. The results of this program do not neccessarily reflect real world results. Your money is your responsibility. This does not account for fees (nicehash, pool, withdraw, exchange, transaction fees when the mempool is full...) or pool luck (this assumes constant 100% pool luck, which is not realistic. i've seen pool luck of >8000% one time...). Conservsion rates can change very quickly making any results here obsolete.

## Tips
Send me money even though I don't deserve it.

BTC: 1EecFw5Nq8ACAUKVptUPkakgXb2sbPQa7Z  
BTC (SegWit): bc1qvwfx77aqe2ssu4as39mskmhp22v0dmjtapvmjw  
ETH: 0x86dd805eb129Bfb268F21455451cD3C4dAA1c5F9  
