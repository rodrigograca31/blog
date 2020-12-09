---
title: "How to display a JSON object in a React or Angular component"
template: post
slug: how-to-display-a-json-object-in-a-react-or-angular-component
draft: false
featured: false
date: "2020-11-28T15:00:00.000Z"
description: "Ever needed to quickly see the shape of a given object without looking through logs?"
cover: "json.png"
category: Code
tags:
  - JavaScript
  - Angular
  - React
---

Lets say you received the following JSON object from your API or some other place:

```javascript
const person = {
  name: "rodrigo",
  last: "graça",
};
```

### How do you display it!?

You could log it: `console.log(person)`, but what if you are looping through an array of objects and need to display the object in your UI to see its shape instead of all elements logged and having to search through them?

The most practical way is to display the actual JSON object in the UI inside their unique element.

This is how you go about it:

# React

In react you can use the native JavaScript `JSON.stringify()` function directly like so:

```javascript
function App() {
  const person = {
    name: "rodrigo",
    last: "graça",
  };

  return <div>Person 1: {JSON.stringify(person)}</div>;
}

export default App;
```

# Angular

Angular is a bit more tricky and you have to do the following:

You have your component class:

```javascript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  person = {
    name: "rodrigo",
    last: "graça",
  };
}
```

and then your component view/template:

```javascript
<div>Person 1: {{ person | json }}</div>
```

More [info here about the Angular JSON pipe](https://angular.io/api/common/JsonPipe)

That's it. [Let me know on Twitter](https://twitter.com/rodrigograca31) if you have any questions/comments.
