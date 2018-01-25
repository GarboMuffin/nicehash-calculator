# NiceHash Calculator Rewrite

## This is not yet ready for normal use

A JavaScript program to calculate the profitability of buying hashing power on NiceHash.

## Installation / Downloads

### Requirements

- A version of [nodejs](https://nodejs.org/en/) >= 8

### Downloading

TODO (use tags and releases instead of `git clone`?)

## Usage

```bash
node . [...arguments]
```

---

## Features being removed

- `--show-percent` - Always enabled
- `--min-profit=XX` - Useless
- `--only-revenue` - Useless

## Major TODOs

- [X] Improve the code
- [X] Support more types of outputs (json output maybe?)
- [ ] Add better support for fixed orders (doubt this is gonna happen)
- [X] [Create a website showing the results of this program in an easier to access form.](https://nicehash.garbomuffin.com/)
- [X] Avoid hard coding coins and instead download them from the WhatToMine API
- [ ] Include fees
  - Thinking about where to apply the fee
- [X] Add back `--find-min` or similar
- [ ] Add back `--location=XX` or similar for `--find-min`
- [ ] Useful API
