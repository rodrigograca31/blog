---
title: "9 node packages you should be using on your system!"
template: post
slug: node-packages-you-should-be-using
draft: false
featured: false
date: "2020-09-13T18:00:00.000Z"
description: "Some node packages that will greatly increase your productivity and life quality!"
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

I (and most people) prefer `npm-check-updates` (ncu), it's simple to use, and has a cleaner output.

After installing run `ncu` on your project root folder to see the packages that can be upgraded, and `ncu -u` to upgrade them followed by `npm i`.

## tldr

`npm install -g tldr`

[tldr on npmjs.com](https://www.npmjs.com/package/tldr)

As the name suggests this package gives you quick/short access to documentation, more precisely Linux man pages.

## n

`npm install -g n`

[n on npmjs.com](https://www.npmjs.com/package/n)

`n` is a package used to change between node versions.

It's as easy as `n latest` or `n stable` or `n 12.16.3` and you are now running a different node version. You can combine this with other commands to temporarily run something in a different node version

I used this to temporarily bypass a bug in Gulp 4: `n 10.16.3 && gulp default && n 12.16.3`

There's also an alternative called `nvm`.

## ts-node

[ts-node on npmjs.com](https://www.npmjs.com/package/ts-node)

`npm install -g ts-node`

(make sure you have TypeScript installed: `npm install -g typescript `)

If you have been using TypeScript you had to run `tsc file.ts` and then `node file.js` or combine them into one command `tsc file.ts && node file.js`, this is where `ts-node` comes in to save the day.

You just have to run `ts-node file.ts` and it will compile and execute the JavaScript file.

## ngrok

`npm install -g ngrok `

nrgok allows you to tunnel/port forward your local ports and gives you a public URL to access them.
Let's say you have your local project running on localhost:5000, you can port forward it and have a public URL by doing `ngrok http 5000`.

Now you have a public URL that you can share with anyone to test your project and as soon as you are done you stop the process and it's gone.

P.S. Theres also `npm install -g http-server` but that one only makes a simple local server for the folder you are in, for that I would recommend that you use Python that is already installed on your system `python3 -m http.server 8000`.

## nodemon

`npm install -g nodemon`

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

Did you know that you can use it with other languages? Like: TypeScript and Python!? 🤯

Yes, you can use `nodemon` to execute your python scripts every time the file changes!

Examples:

`nodemon file.js`

`nodemon file.ts`

`nodemon --quiet file.js`

`nodemon --exec python3 file.py`

I recommend you always add `--quiet` to avoid extra debug messages.

By default it will use `node` for `.js` files, `ts-node` for `.ts` and `python` for `.py`. (I had to specify `--exec python3` because my system doesn't have `python` correctly mapped)

## `npm ci` instead of `npm i`

[npm ci documentation](https://docs.npmjs.com/cli/ci.html)

This one isn't a node package per se but a command `npm ci` that you should be using instead of `npm i` (short for `npm install`).

Why? You ask.

1. It clears your `node_modules` folder first.
2. Install packages based on the `package-lock.json` file respecting exact versions without upgrading.
3. Doesn't modify the `package-lock.json` file.

This can be very useful combined with `n` to debug something on a given node version and reinstalling the exact same package versions.

## tetris

`npm install -g tetris`

Yes, Tetris! Just try it!

---

**Pro tip:** run `ncu -g` to list which global packages you have outdated, then run the entire `npm install` command it gives you to update them.

Alternatively, run `npm list -g --depth=0` to list all global packages installed and `npm outdated -g --depth=0` to list the outdated ones, and then `npm update -g` to update them.

The reason I don't recommend the "native" `npm` command is that it doesn't jump major versions and in my case it crashed halfway and left half of my global packages not installed, which was a nightmare to fix. That's why I recommend you list all your packages first and then update them, in case something goes wrong you have the list and can install them back one by one.

---

Do you know other useful packages that I should be using? [Tweet them at me](https://twitter.com/rodrigograca31)!

Don't forget to [follow me on Github](https://github.com/rodrigograca31)!
