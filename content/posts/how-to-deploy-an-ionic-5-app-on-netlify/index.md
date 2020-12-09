---
title: "How to deploy an Ionic 5 app on Netlify?"
template: post
slug: how-to-deploy-an-ionic-5-app-on-netlify
draft: false
featured: false
date: "2020-11-21T15:00:00.000Z"
description: "Deploy Ionic 5 apps in 3 easy steps"
cover: "ionic-netlify.png"
category: Code
tags:
  - NodeJS
  - Ionic
  - Angular
---

If you used Netlify before this should be very easy and straightforward.

### Host it on Git(Hub?)

Because Netlify asks you for a Git repository.

### Choose your repo

Go to [this Netlify page](https://app.netlify.com/start) and choose your repo and branch.

### Basic build settings

Build command: `ionic build --prod `

Publish directory: `www`

Done!

### Extra:

If your build fails with the following error:

```bash
1:25:45 PM: $ ionic build --prod
1:25:45 PM: bash: ionic: command not found
1:25:45 PM: ​
1:25:45 PM: ────────────────────────────────────────────────────────────────
1:25:45 PM:   "build.command" failed
1:25:45 PM: ────────────────────────────────────────────────────────────────
1:25:45 PM: ​
1:25:45 PM:   Error message
1:25:45 PM:   Command failed with exit code 127: ionic build --prod
1:25:45 PM: ​
1:25:45 PM:   Error location
1:25:45 PM:   In Build command from Netlify app:
1:25:45 PM:   ionic build --prod
1:25:45 PM: ​
1:25:45 PM:   Resolved config
1:25:45 PM:   build:
1:25:45 PM:     command: ionic build --prod
1:25:45 PM:     commandOrigin: ui
1:25:45 PM:     publish: /opt/build/repo/www
```

it means you have to install the Ionic CLI as a dependency because you probably have it installed globally in your machine but Netlify doesn't right!?

To fix it run: `npm i -D @ionic/cli` then commit, push and Netlify will re-build and deploy automatically.

### Extra 2:

Your routes are probably not going to work if you access them directly.

To fix that use this build command instead: `ionic build --prod && echo '/* /index.html 200' > www/_redirects`

Or create a file called `_redirects` inside your `src` directory and add the following to your `angular.json` file:

```json
{
  "glob": "_redirects",
  "input": "src/",
  "output": "./"
}
```

In `projects 👉🏻 app 👉🏻 architect 👉🏻 build 👉🏻 options 👉🏻 assets`

### Extra 3:

If you previously deployed a ReactJS app you will notice that the Ionic/Angular one takes a bit longer. Don't worry. It's normal. That's because it has to install Ionic and Cordova plugins before it can actually build your code.
