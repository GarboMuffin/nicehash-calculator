# NiceHash Profit Calculator for Buyers v2

A JavaScript program to estimate the profitability of buying hashing power on NiceHash.

Get help by [making an issue](https://github.com/GarboMuffin/nicehash-calculator/issues/new).

**This project is not affiliated with or endorsed by NiceHash.**

This README is a work in progress and very incomplete.

## Installing / Downloading

### Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (8 or later)

### Downloading

TODO: use github releases instead?

```bash
git clone -b rewrite https://github.com/GarboMuffin/nicehash-calculator/
cd nicehash-calculator
# do all the other commands from this directory
```

### Setup

```bash
# --only=production skips dependencies for development. if you are planning to develop do not specify it or do a normal npm install later
npm install --only=production
# builds typescript (.ts) files to javascript (.js)
npm run build

# yarn or pnpm will also work. just run the equivelant command
```

## Usage

```bash
node index [...arguments]
```

Arguments can be things like `--no-header` or `--debug` or more commonly a list of coins to run on. Without specifically specifying any coins it will run on all coins. It's probably easiest to understand usage by example.

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
```

## Donations?

```
BTC (bech32): bc1qkuz9a4trzgvdq9sru800jtxfz0ld0vtwrqu0nq
BTC: 1GarboYPsadWuEi8B2Pv1SvwAsBHVn1ABZ
BCH: qzjtsdg8uskpa8q5lgt7rxvxm7gv27vk0qrwgyy0nz
LTC: LNTXpx86L2ADQPMC3t78jNvramJ1xMS2F4
ETH: 0xE9eDFAB6565695C01c1978B9782ad1FE22b3E5AC
DOGE: DS7aiQgXqFrmwG3bRK3kzC78Hb114y7Y1R
```
