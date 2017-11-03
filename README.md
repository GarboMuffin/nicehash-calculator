# nicehash profit calculator
a customizable script to calculate the profitability of buying hashing power on nicehash (spoiler: don't expect much)

## installation
1. install [git](https://git-scm.com/)
2. install [node](https://nodejs.org/en/) 8 or 9 or whatever the latest is
3. these commands:
```bash
git clone https://github.com/GarboMuffin/nicehash-calculator
cd nicehash-calculator
npm install
npm install -g ts-node typescript
```

## usage
```bash
ts-node index [...args]
```

## arguments
there's lots of them. you can put things in arguments.txt for them to be read automatically.

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
