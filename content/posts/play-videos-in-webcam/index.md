---
title: "Linux: How to play videos on your webcam? (virtual camera)"
template: post
slug: play-videos-in-webcam
draft: false
featured: false
date: "2020-09-09T18:00:00.000Z"
description: "Have you ever wanted to prank someone or do something different?"
cover: "obs.png"
category: Code
tags:
  - Code
---

I don't know why you would want to do this but In case you want to prank your friends/class or [do something like this.](https://www.youtube.com/watch?v=4qwLwQ-RliI)
I just had some fun as of late... 😁🤭

After all, now we use webcams for everything. From online classes to talking to friends.

All the commands you need:

```bash
sudo apt-get install v4l2loopback
sudo apt-get install v4l2loopback-dkms
sudo apt-get install v4l2loopback-utils

sudo modprobe v4l2loopback
v4l2-ctl --list-devices

ffmpeg -re -i video.mp4 -map 0:v -f v4l2 /dev/video2
```

You can also use OBS to play things in your camera using [this plugin](https://github.com/CatxFish/obs-v4l2sink) but it's not being maintained and apparently, it is [being incorporated directly into OBS.](https://github.com/obsproject/obs-studio/pull/3182)

After running the first 5 commands and [installing the OBS obs-v4l2sink plugin](https://github.com/CatxFish/obs-v4l2sink/releases) you can open OBS and go to "Tools --> v4l2sink", write the correct Device Path that you get by running line 6 (`v4l2-ctl --list-devices`) and hit "Start".

![OBS - v4l2sink](obs-V4L2.png)

Your browser, zoom, or other programs that is read the dummy webcam will start displaying whatever is being captured in OBS.

[Let me know on Twitter](https://twitter.com/rodrigograca31) what you use this for, I'm curious.
