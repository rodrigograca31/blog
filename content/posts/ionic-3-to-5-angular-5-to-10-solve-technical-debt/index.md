---
title: "Migrating Ionic 3 to 5 and Angular 5 to 10 to solve technical debt"
template: post
slug: ionic-3-to-5-angular-5-to-10-solve-technical-debt
draft: false
featured: false
date: "2020-10-24T17:00:00.000Z"
description: "A collection of things that I had to do/learn to convert an Ionic 3 - Angular 5 app from 2018 to Ionic 5 - Angular 10 in 2020"
cover: "angular-ionic.png"
category: Code
tags:
  - Ionic
  - Angular
---

This post is a collection of things that I had to do/learn to convert an Ionic 3 - Angular 5 app from 2018 to Ionic 5 - Angular 10 in 2020 to solve increasing [technical debt](https://en.wikipedia.org/wiki/Technical_debt) going forward as it was the best option versus upgrading version by version. I'm by no means an expert in Angular but I got 5+ years of experience with Ionic and I've just gone through the process so if you want to hire me to do it to your app I'm always [open to new opportunities](https://blog.rodrigograca.com/resume)

First, make sure you have the latest Cordova and Ionic:

```bash
npm i -g ionic
npm i -g cordova
```

_P.S. Check my article on [interesting node global packages you should be using](https://blog.rodrigograca.com/node-packages-you-should-be-using/)_

Then, start a new project/app: `ionic start [NAME] blank --cordova`

Now copy page by page to your new project.

I generated them first using `ionic generate page [NAME]` and then copied the class contents to the new class.

By doing this you will notice a few differences like:

1. `[NAME].ts` changed to `[NAME].page.ts`
1. `[NAME].html` changed to `[NAME].page.html`
1. `[NAME].scss` changed to `[NAME].page.scss`
1. `[NAME]-routing.module.ts` is new and contains the route declarations.

---

- As I just mentioned now there's an additional `[NAME]-routing.module.ts` file per page which can have additional routes. I opted for keeping all my routes in `app-routing.module.ts` for consistency and ease of use (seeing all app routes at once).

- If you had styles in 1 component that another one used but now is not getting them you should move them to `global.scss` file or as a last resort add the `.scss` file to the `styleUrls` array of the second component.

- Component or pages now specify `styleUrls` each time, unlike before that it would just "magically find it" I guess. 🤔

- Each class `implments OnInit` which is a [typescript way to basically declare the shape of your component/page class](https://stackoverflow.com/questions/38834625/whats-the-difference-between-extends-and-implements-in-typescript). I'm pretty confident you can remove those 2 words without causing problems.

- `import { [NAME] } from "ionic-angular";` changed to `import { [NAME] } from "@ionic/angular";`

- Decorators/types like `Slides` and `Content` "changed location" as well as name. For example:

```js
import { Content, Slides } from "ionic-angular";
// changed to:
import { IonContent, IonSlides } from "@ionic/angular";
```

```javascript
@ViewChild(Slides) slides: Slides;
@ViewChild(Content) content: Content;
// changed to:
@ViewChild(IonSlides) slides: IonSlides;
@ViewChild(IonContent) content: IonContent;
```

- Providers are no longer a thing, they are all called "services" now. A service is something you use to share code or state between components/pages, I for example use a utils service as well as a data-sharing service. If you had a provider you should generate a service using `ionic g service [NAME]` and copy code over to it.

- `ionViewDidLoad` doesn't exist anymore, you probably want to use `ionViewWillEnter` instead, more here: https://ionicframework.com/docs/angular/lifecycle or one of the angular lifecycle methods: https://angular.io/guide/lifecycle-hooks

- Here are some useful new commands to get a sense of what the new "things are":

```bash
ionic g page [NAME]
ionic g service [NAME]
ionic g component [NAME]
```

- If you previously used `NavController` to navigate between pages: `this.navCtrl.push(XPage, data)` you will have to create your routes first and use the angular router properly and do something like `this.router.navigate(["vocabulary"], { relativeTo: this.route });`, this is the same as the previous: `this.navCtrl.push(VocabularyPage, data);` but now you will have to save `data` first using a service and get it back on the other page. Previously was as simple as: `navParams.get("cat");`

- Pages don't have the `@IonicPage()` decorator anymore.

- `[centeredSlides]="false"` is not a thing anymore, you can leave it but it will give your warnings. You probably want to

- `ion-slide` doesn't have a `div.slide-zoom` inside and then your content inside it anymore. It's `ion-slide` and then your content directly and `ion-slide` is `display: flex;` that means that if you had elements directly inside they will change position, I just wrapped them in a div. The div is `display: block` and elements inside will probably go back to the previous place.

- `.content { color: $appGrey; }` doesnt work anymore since you have to use the CSS 3? 4? variables, I did it like so: `.content { color: $appGrey; --color: none; }`

- The same goes for backgrounds and paddings of ion-content:

```CSS
#menu-page {
    background: $appYellow;
    font-size: 0;
    // https://ionicframework.com/docs/api/content/#css-custom-properties
    --background: none;
    --padding-top: 16px;
    --padding-end: 16px;
    --padding-bottom: 16px;
    --padding-start: 16px;
}
```

If you inspect the shadow dom it has a div just for the background, this code sets its background to `none` so that it becomes transparent and then sets the outer div background.

- Robot font isn't as easily available as before: `@import "roboto";` and `* { font-family: "Roboto"; }`

Now you have to download if from Google Fonts and configure it like so:

```CSS
@font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: local("Roboto Medium"), local("Roboto-Medium"),
    url("./assets/fonts/Roboto-Medium.ttf") format("woff2");
}
@font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local("Roboto Regular"), local("Roboto-Regular"),
    url("./assets/fonts/Roboto-Regular.ttf") format("woff2");
}
@font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local("Roboto Bold"), local("Roboto-Bold"),
    url("./assets/fonts/Roboto-Bold.ttf") format("woff2");
}

* {
    font-family: "Roboto";
}
```

- SASS variables aren't "magically" available to your sass pages/components like before you will need to import them at the top of your SASS like so: `@import "../../theme/variables.scss";`...

- If you were using REM or EM sizes for font or paddings, etc your layout changed quite a bit because of that. To fix it set the font size back to 10px, aka 62.5% and ion.app to...

```CSS
body, html {
    // compensate for whatever they changed and the root font isnt 62.5% as before (10px)
    font-size: 10px;
    font-size: 62.5%;
}
ion-app .md, ion-app .ios {
    font-size: 1.4rem;
}
```

- Paths in SASS files changed:

```CSS
background-image: url("../assets/imgs/wrong_icon.png");
// to
background-image: url("../../../assets/imgs/wrong_icon.png");
```

If you have them wrong you will get the following error:

```bash
./src/app/games/matching/matching.page.scss
Module Error (from ./node_modules/postcss-loader/src/index.js):
(Emitted value instead of an instance of Error) CssSyntaxError: /home/unknown/git/temp_delete/aviation2/aviation-english/matching.page.scss:58:2: Can't resolve '../assets/imgs/plane.png' in '/home/unknown/git/temp_delete/aviation2/aviation-english/src/app/games/matching'
```

- `[navPush]="page"` isnt a thing anymore, instead do `routerLink="/page"` or make a click function and use the Angular router like so: `this.router.navigate(["page"], { relativeTo: this.route.parent });` where `private router: Router, private route: ActivatedRoute` from `import { ActivatedRoute, Router } from "@angular/router";`

- If you get a similar error message: `NullInjectorError: R3InjectorError(TestPageModule)[Keyboard -> Keyboard -> Keyboard -> Keyboard]: NullInjectorError: No provider for Keyboard!` just go to your app.module.ts and import the given class `import { Keyboard } from "@ionic-native/keyboard/ngx";` and pass it to the `providers` array: `providers: [Keyboard]`

- `AlertController` changed from `this.alertController.create({...}).present();` to `this.alertController.create({...}).then((result) => { result.present(); });`

**Don't forget to**:

- Add the icon and splash screen into the new project and regenerate the new assets with `cordova-res` or `ionic cordova resources`.
- Copy your signing key, package name and version to generate the same app....
- Copy configuration files like `.editorconfig`, `.gitignore`, `.prettierrc`, `README.md`, etc.

**Optional**:

- I recommend you remove and re-add the default plugins that come with the new project to update them to the latest version and new way of working with them. (plugins are now stored in `package.json`)

```
ionic cordova plugin rm cordova-plugin-ionic-webview && ionic cordova plugin add cordova-plugin-ionic-webview
```

**Pro tips**:

1. Add `--prod` to your release builds to save tuns of space!

`ionic cordova build android --release --prod`

(My `.apk` went from 29MiB to 23MiB!)

2. If you are on Linux compress your PNGs using `pngquant`:

`find . -name '*.png' -exec pngquant --ext .png --force {} \;`

<!-- Questions for you:

my inicial screen depends on 1 image and I can see if loading (flashing) really quick... I tried to configure the slpash to not dissapear automatially and I call it inside `this.platform.ready().then(() => {` like `splashScreen.hide();` but even then I still see the image loading... This even is suposed to fire onLoad of body tag and this should not happen.... or should it? since the image is actually added to the HTML later? 🤔 Do you know how I can solve this?

THIS COULD DO it but for the splash screen but I also want to only show 1 view after all images loaded https://stackoverflow.com/questions/56310793/ionic-4-loading-until-images-in-page-loaded -->

#### Conclusion:

It's quite easy to make the necessary changes and took me about 5+ afternoons to "convert" 3 components, 3 services, 13 pages.
Performance improved slightly, about 5%. The app size got reduced to 2/3.
