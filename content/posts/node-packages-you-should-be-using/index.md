---
title: "7 node packages you should be using:"
template: post
slug: node-packages-you-should-be-using
draft: true
featured: false
date: "2020-09-13T18:00:00.000Z"
description: ""
cover: "node-js.png"
category: Code
tags:
  - Code
---

Here are some node (JavaScript) packages that you should be using on a daily bases. They will save you time/money doing various tasks.

## git cz

`npm install -g git-cz`

[git-cz on npmjs.com](https://www.npmjs.com/package/git-cz)

"git commitizen" is a package to help you follow the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).

After staging your changes (`git add .`) run `git cz` and it will ask you a few questions and build your commit message based on them.

## ncu or npm-check

`npm install -g npm-check-updates` or `npm install -g npm-check`

[npm-check-updates on npmjs.com](https://www.npmjs.com/package/npm-check-updates) or [npm-check on npmjs.com](https://www.npmjs.com/package/npm-check)

These are 2 different packages to help you manage/upgrade packages on your projects.

I (and most people) prefer `npm-check-updates` (ncu), its simple to use, and has a cleaner output.

After installing run `ncu` on your project root folder to see the packages that can be upgraded, and `ncu -u` to upgrade them followed by `npm i`.

## tldr

`npm install -g tldr`

[tldr on npmjs.com](https://www.npmjs.com/package/tldr)

As the name suggests this package gives you quick/short access to documentation, more precisely Linux man pages.

## n

`npm install -g n`

[n on npmjs.com](https://www.npmjs.com/package/n)

`n` is a package used to change between node versions.

Its as easy as `n latest` or `n stable` or `n 12.16.3` and you are now running a different node version. You can combine this with other commands to temporarily run something in a different node version

I used this to temporarily bypass a bug in Gulp 4: `n 10.16.3 && gulp default && n 12.16.3`

There's also an alternative called `nvm`.

## ts-node

[ts-node on npmjs.com](https://www.npmjs.com/package/ts-node)

`npm install -g ts-node`

(make sure you have TypeScript installed: `npm install -g typescript `)

If you have been using TypeScript you had to run `tsc file.ts` and then `node file.js` or combine them into one command `tsc file.ts && node file.js`, this is where `ts-node` comes in to save the day.

You just have to run `ts-node file.ts` and it will compile and execute the JavaScript file.

## `npm ci` instead of `npm i`

[npm ci documentation](https://docs.npmjs.com/cli/ci.html)

This one isnt a node package per say but a command `npm ci` that you should be using instead of `npm i` (short for `npm install`).

Why? You ask.

1. It clears your `node_modules` folder first.
2. Install packages based on the `package-lock.json` file respecting exact versions without upgrading.
3. Doesn't modify the `package-lock.json` file.

---

Do you know other useful packages that I should be using? [Tweet them at me](https://twitter.com/rodrigograca31)!

Don't forget to [follow me on Github](https://github.com/rodrigograca31)!
