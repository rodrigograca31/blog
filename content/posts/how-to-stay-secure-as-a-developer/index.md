---
title: What do I do to stay secure as a developer? 🤔
template: post
slug: how-to-stay-secure-as-a-developer
draft: false
featured: true
date: "2020-07-15T21:00:00.000Z"
description: >-
  Tips and tricks to stay secure as a developer
cover: "./secure.jpg"
category: Code
tags:
  - Productivity
  - Code
---

130 Top Twitter accounts (including verified) [just got hacked](https://threatpost.com/the-great-twitter-hack-what-we-know-what-we-dont/157538/) by successfully targeting Twitter employees with access to internal systems/tools that allowed updating a Twitter user email address.

This is why we developers have a bigger responsibility to be secure more than anyone. We hold the responsibility to protect ourselves also well as the company we work for. Due to our nature, we have access to sensitive information, security credentials, and tools that allow us to read/change/delete data.

Here is my personal list of things I do to stay secure as a developer:

### Sign git commits

Generate a GPG key and sign all your commits from now on by enabling signing globally: `git config --global commit.gpgsign true`. [Here is a guide on how to sign your commits](https://docs.github.com/en/github/authenticating-to-github/signing-commits)

Why sign your commits? In case you don't know all I (as an attacker) need to do is change my email and name to yours, commit, push and you will be blamed. [Yes everyone can commit as you!](https://medium.com/@pjbgf/spoofing-git-commits-7bef357d72f0) To prevent this you should be signing your commits. It will not prevent what I just described but you can deny a given commit because it is not signed or you can block non signed commits from entering the origin.

### Error handle everything

As a general rule of thumb if you don't `Try Catch` a block of code and it crashes it might output some sensitive information like paths, environment variables, DB strings, software versions, or other sensitive information. To avoid this one should always `Try Catch` any code that might break unexpectedly.

### Use "Have I been Pwned"

[haveibeenpwned.com](https://haveibeenpwned.com/) is an awesome service that allows you to search across multiple data breaches to see if your email address has been compromised. You can also subscribe (for free!) to be notified if any of your emails are found to be in any new database leaks. So when you see on the news that millions of accounts have been exposed and you need to change your password, you will know if your email is in this new leak.

I recommend that you add all your email addresses. (Yes the site is run by a trusted person and in a secure way.)

### Monitor your name and email

After you monitor your email in dumps/leaks you should also monitor your name and email around the web. Imagine some hacker is targeting you and he asks for help on a public forum, or your email is exposed somehow, or they are just trying to target your name with SEO optimized articles so that when someone searches for you it will return bad results trashing your name.

### Enable 2FA in all your accounts.

(Second Factor Authentication)

You should enable 2FA everywhere! GitHub, Email, Slack, etc

Avoid SMS based 2FA, because those are [easy to bypass.](https://en.wikipedia.org/wiki/SIM_swap_scam) I recommend you use [Authy](https://authy.com/download/) because they allow you to export the 2FA codes in case you change phones.

### Use a password manager

[Here is a big example](https://twitter.com/glenmaddern/status/1278252319646367744) of a developer almost giving away his GitHub password. He got saved because he was using a password manager that checks the site URL before filling in the email and password fields.

Password managers also allow you to easily generate long and complex passwords which will make it so that you don't repeat the same one across sites. Because password re-usage is super bad! In case your password is compromised on one website they can log in into all your other sites.

It also makes your life so much easier, from autofill to securely sharing of passwords instead of emailing them or something similar.

I use/recommend [LastPass](https://www.lastpass.com/)

Pro TIP: Keep your high-value passwords out of the password manager. Even a password manager might be compromised/hacked, we never know.

Going back to the Twitter hack seems the attacker found clear text credentials on slack... 🤦🏻‍♂️
This is a great example of why you should use a password manager.

### Use long passwords

Yes long passwords, because Math!

Now that you are using a password manager you have no excuses to use long passwords. You just have to set your password manager to generate X length.

Long passwords are better than complex passwords. It's simple, It's pure math:
If the character set is for example `[a-c]` (a,b,c), you can create: `aaaa` up to `zzzz`

To calculate all possibilities you would do:
`size_of_character_set` raised to `length_of_password`

That is: `3^4 = 81`

If you add two new characters like "d" and "e" it will be: `5^4 = 625`

But if you increase the length by two instead it will be: `3^6 = 729`

See the difference? By increasing the length you get more combinations than by increasing the characters set.

![XKCD - Password Strength](https://imgs.xkcd.com/comics/password_strength.png)

### Keep your packages count low

Fewer packages = fewer security bugs
This will not only save you headaches but keep your code more secure and lightweight.
Avoid using packages for simple things.

The other day I had a junior developer tell me he couldn't find a good package to generate 5 random numbers to send as 2F5. 🤦🏻‍♂️ What he should have done is simply make a function to generate a random number with `Math.random()` and call it 5 times. (or even call it only once and use the extra precision to get the 5 numbers)

### Don't use npx!

Its a huge security hazard. If I sent you a random link and said "execute this code on your machine, trust me, it is safe" would you do it? Then why do people use npx? You are essentially running code directly from the internet, and if you make 1 typo you can run any random/malicious code.

### Don't use Windows. 🤮 as simple as that

Windows is another huge security hazard. Its vulnerability after vulnerability. They just had 3 huge patch Tuesdays in a row! 113, 111, and 123 vulnerabilities! 😱
If you care about security I would recommend you use a Linux distribution.

### Stay updated

Updates are important! They usually fix vulnerabilities. Update your OS, your programs, and update your brain on new security flaws. Here is a list of the [podcasts I listen to stay updated on security issues.](https://blog.rodrigograca.com/why-do-i-listen-to-these-podcasts/)

### Frontend code isn't safe.

If you think Webpack or any other bundler makes your code unreadable think again. I still see many junior devs not knowing that their environment variables and all their frontend code can be read as if it was never minified... Have a look at [this awesome script](https://github.com/timmc/unsourcemap)

### Save passwords securely (DB)

Don't use md5, sha1, etc, use bcrypt as of 2020.

### Phishing

Be careful with links in your email or even other places like instant messaging. Don't click or open something if you don't trust it. 1 click is all you need to get hacked in some cases. They could run a 0 day that exploits something on your system with just that 1 click.

### Social engineering

Be aware of social engineering. It's something that many of us don't even think about. Be aware that if someone is actively targeting you, they might do things that you never imagined would be a security concern. Like, strike a conversation to get you to click/open a meme or something else.

### Use VirusTotal.com

[VirusTotal.com](https://www.virustotal.com/) is a website currently owned by Google, where you can upload anything to get it analyzed by 70 different antivirus scanners to detect types of malware/viruses. If a friend/coworker or someone sent you a file of any kind that you don't fully trust, take it, and upload it to the site, if all the antivirus scanners are green you can open it.

### XSS, SQLi, CSRF, etc

Of course, I couldn't let these pass. But you should already know about the common know issues. If you don't, please research them.

---

Remember that "security is like a chain, as strong as the weakest link" if you have a very secure system and there's 1 single hole bad guys will be able to get in. That's why security is so hard.

> We’re all human; we commit mistakes. But there are a plethora of people who are trying to take advantage of a single silly mistake which can cost your business tremendous financial loss. Advanced technology and security practices, no matter how sophisticated, will always be constrained by this human factor.
