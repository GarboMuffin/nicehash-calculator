# nicehash profit calculator
a highly customizable script to calculate the profitability of buying hashing power on nicehash.

## usage
```bash
$ npm install
$ npm install -g ts-node typescript
$ ts-node index <...args>
```

## arguments
put arguments in arguments.txt for them to be used by default

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

## supported coins
 * bitcoin
 * bitcoin cash
 * ethereum
 * ethereum classic
 * zcash
 * sia
 * decred
 * pascal
 * dash
 * litecoin
 * monero
 * keccak
 * lbry
