---
title: "How to write secure front-end code:"
template: post
slug: how-to-write-secure-front-end-code
draft: false
featured: false
date: "2020-11-08T15:00:00.000Z"
description: "There are a few things you should consider/fix if you need your front-end code to be secure."
cover: "front-end.jpeg"
category: Code
tags:
  - Security
---

Here are some tips to apply when trying to write front-end code for projects that need extra security, or for all of them since security is important everywhere.

1. [Don't use innerHtml](#dont-use-innerhtml)
2. [Don't use JWT](#dont-use-jwt)
3. [Don't send sourcemaps to production](#dont-send-sourcemaps-to-production)
4. [Never trust any user data.](#never-trust-any-user-data)
5. [Use "noopener" on link tags](#use-noopener-on-link-tags)
6. [Don't keep any secrets](#dont-keep-any-secrets)
7. [Environment variables aren't secure!](#environment-variables-arent-secure)
8. [Keep dependencies low](#keep-dependencies-low)
9. [Configure your CSP properly](#configure-your-csp-properly)
10. [Remove .git folder](#remove-git-folder)

### Don't use innerHtml

`HTMLElementObject.innerHtml` is quite dangerous because it allows your JS code to manipulate the page HTML, which an attacker can take advantage of by providing HTML code instead of text like you expected.

React even calls this function by another name: `dangerouslySetInnerHTML` which tells you something doesn't it?

Instead, you should use `textContent` to accomplish the same task.

### Don't use JWT

JWT is less secure in many ways. You will probably store it in `localStorage` and that is vulnerable to XSS attacks... An attacker can execute JS and read the `localStorage` while if you use cookies there are other mechanisms that prevent JS from reading cookies (`httponly` flag).

Also, it's readable by the client which means if you save sensitive information like an email it could leak (in one HTTP request or XSS attack).

### Don't send sourcemaps to production

Nowadays build tools will produce a [source map](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) (`.map` file) which is only used for development but many of those tools still produce such source maps for the production builds too.

Because of that an attacker can decompress your code 100% and read it entirely as you wrote it. Try to disable the building of source maps for production or remove them from the server afterward.

These are my 2 favorite tools to transform source maps back into readable code: [unsourcemap](https://github.com/timmc/unsourcemap) and [shuji](https://github.com/paazmaya/shuji), the latter is better in my opinion.

### Never trust any user data.

Ever! Filter everything on the front-end and backend! Yes, both! I know it's a pain in the ass but has to be done in both because an attacker can easily bypass your front-end validation code and send the request himself directly to the API. Remove dangerous "things" and always treat your data as data, never as code (avoid `eval()`, `exec()` and similar functions at all costs!)

### Use "noopener" on link tags

Why? Because when the browser opens a new tab from a link in your page with `target="_blank"` it gives it access to your `window` object. That makes it so that the new tab (potential malicious site) can manipulate things in your current tab (your site) like `window.location`.

[More about why you should use noopener here](https://dev.to/dhilipkmr/why-should-you-use-noopener-beware-of-security-flaws-3i57)

As of Nov 6, 2020 the HTML standard changed and [Chrome has implemented such change in order to mitigate this issue](https://bugs.chromium.org/p/chromium/issues/detail?id=898942#c28)

### Don't keep any secrets

Don't keep any secret data on your front-end. No passwords, nothing. Like I mentioned above an attacker can read your source code exactly like you wrote it if you left the sourcemaps accessible, and even if you didn't it's easy to find and read such "secrets".

### Environment variables aren't secure!

In case you don't know `.env` files in ReactJS and other frameworks/tools are just a "gimmicky" and those variables end up as strings in your code and like I said in the previous point they can be read by an attacker.

### Keep dependencies low

This will help both with the final bundle size and security. The former is obvious but the latter is due to you including less "strangers code" which you don't know well and can contain/add vulnerabilities that you are not aware of.

### Configure your CSP properly

[CSP (Content Security Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) should be used to restrict the damage an attacker can make by only allowing scripts from your domain or CDNs you trust, in addition, you can disable inline and eval code and only allow HTTPS sources, etc.

### Remove .git folder

I've seen countless sites exposing their `.git/config` and `.git/HEAD` because they probably make a folder in their server and `git clone` their project repo and tell the server to read `index.html` or similar and forget that all other folders at the same level or deeper are readable by the server at the request of a browser...

This makes it so that an attacker can basically clone your repo as if they had access to your git repo. That brings problems like making it possible to read server-side code or go back in git history and gather more information that may have been removed from code due to security concerns.

Checkout my article of [my browser extensions](https://blog.rodrigograca.com/the-chrome-extensions-i-use-why/) for more information about this topic.

---

Do you have any other extra tips? [Send me a tweet](https://twitter.com/rodrigograca31) with them and I will include it in the article!
