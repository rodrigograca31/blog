---
title: "How to install the latest NodeJS on Raspberry PI 0 W?"
template: post
slug: how-to-install-latest-nodejs-on-raspberry-pi-0-w
draft: false
featured: false
date: "2020-11-14T15:00:00.000Z"
description: "Officially you can't install above v11.15.0, but unofficially you can get the latest one. Here's how!"
cover: "rasp-0.jpg"
category: Code
tags:
  - NodeJS
---

TL;DR; Officially you can't install above ~~v10.21.0~~ v11.15.0, but unofficially you can get the latest one, currently 14.15.1.

The fastest way to get the latest officially supported version is:

```bash
wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v.last.sh | bash
```

[The script is provided by this repo](https://github.com/sdesalas/node-pi-zero)

With that script in mind and the knowledge that NodeJS foundation offers "unofficial builds" [plus this comment](https://github.com/sdesalas/node-pi-zero/issues/20#issuecomment-577949515) you might be able to install the latest version (currently 14.15.1) using this script:

```bash
export NODE_VER=14.15.1
if ! node --version | grep -q ${NODE_VER}; then
  (cat /proc/cpuinfo | grep -q "Pi Zero") && if [ ! -d node-v${NODE_VER}-linux-armv6l ]; then
    echo "Installing nodejs ${NODE_VER} for armv6 from unofficial builds..."
    curl -O https://unofficial-builds.nodejs.org/download/release/v${NODE_VER}/node-v${NODE_VER}-linux-armv6l.tar.xz
    tar -xf node-v${NODE_VER}-linux-armv6l.tar.xz
  fi
  echo "Adding node to the PATH"
  PATH=$(pwd)/node-v${NODE_VER}-linux-armv6l/bin:${PATH}
fi
node --version # or whatever ....
```

Copy the script above to a shell script file like `latest-node.sh` and do `chmod +x latest-node.sh` and then run it `./latest-node.sh`

Or `wget https://gist.githubusercontent.com/rodrigograca31/01e6848c6ec02758690a94c4e272832f/raw/8ecaee43a89f972063914bf7b3e5002b8d348a62/latest-node.sh`

Then add the following line to your `.bashrc` file:

```bash
PATH=/home/pi/node-v14.15.1-linux-armv6l/bin:${PATH}
```

(Note the version and location!)

Alternatively you can get `v10.21.0` by simply running:

```bash
sudo apt-get install -y nodejs
```

### Furthermore:

Some tutorials will tell you to do:

```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

But that's a waste of time because you will get the following message:

> \#\# Installing the NodeSource Node.js 14.x repo...
>
> \#\# You appear to be running on ARMv6 hardware. Unfortunately this is not currently supported by the NodeSource Linux distributions. Please use the 'linux-armv6l' binary tarballs available directly from nodejs.org for Node.js 4 and later.

This is because the Raspberry PI 0 (and Raspberry PI 1) architectures are ARMv6 and not the more common ARMv7/ARMv8.

If you take a look at NodeJS [10.x](https://nodejs.org/dist/v10.23.0/), [12.x](https://nodejs.org/dist/v12.19.1/), [14.x](https://nodejs.org/dist/v14.15.1/), architectures list you will notice the last one that was compiled to ARMv6 was [version v11.15.0](https://nodejs.org/dist/v11.15.0/) or [check here](https://nodejs.org/dist/index.json).

That's why when you run `apt install` you get 10.x

With that said, if you are thinking of using `n` or `nvm` to switch your NodeJS version and get a higher one know that I tried that myself and it was compiling for about 2 hours on the Raspberry PI 0 before I decided to force it to stop.

P.S. This is an unofficial way to install the latest version of NodeJS (meaning they no longer have unit tests validated) and I cannot grantee everything will work flawless but for my use case everything is working. (Twitch API connection and motor hat control)

[Let me know on Twitter](https://twitter.com/rodrigograca31) if you have any questions/comments.
