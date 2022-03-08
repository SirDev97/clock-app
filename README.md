# Frontend Mentor - Clock app

This is a solution to the [Clock app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/clock-app-LMFaxFwrM).

## 📑 Table of contents

- [Overview 👁‍🗨](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots 📸](#screenshots)
  - [Links 🔗](#links)
- [My process ⚙](#my-process)
  - [Built with 🛠](#built-with)
  - [What I learned 📚](#what-i-learned)
  - [Useful resources 🔍](#useful-resources)
- [Author 🖋](#author)
- [Acknowledgments 🙏](#acknowledgments)

## Overview

### The challenge

Users should be able to:

    ✅ View the optimal layout for the site depending on their device's screen size
    ✅ See hover states for all interactive elements on the page
    ✅ View the current time and location information based on their IP address
    ✅ View additional information about the date and time in the expanded state
    ✅ Be shown the correct greeting and background image based on the time of day they're visiting the site
    ✅ Generate random programming quotes by clicking the refresh icon near the quote

### Screenshots

![](https://github.com/SirDev97/clock-app/blob/main/assets/solution/daytime-desktop.jpeg?raw=true)
![](https://github.com/SirDev97/clock-app/blob/main/assets/solution/nighttime-desktop.jpeg?raw=true)
![](https://github.com/SirDev97/clock-app/blob/main/assets/solution/combined.png?raw=true)

### Links

- Solution URL: [Github](https://github.com/SirDev97/clock-app)
- Live Site URL: [Github-Pages](https://sirdev97.github.io/clock-app/)

## My process

### Built with

- HTML5
- CSS
- Flexbox
- JavaScript
- Fetch API
- Mobile-first workflow

### What I learned

One of the problems that took me the most amount of time was selecting the content of the detailed data section with my javascript so I can change the font color for the night time view. One way was to select all of the content children by class name and directly modify their style one by one, but that was adding alot of unnecessary noise to the code. The workaround I found was getting all of the required elements by tag name and looping through the HTMLCollection with a for of loop.

```js
const detailDataContent = document.querySelector('.collapsible__content');
const pList = detailDataContent.getElementsByTagName('p');
const spanList = detailDataContent.getElementsByTagName('span');

for (let item of pList) item.style.color = '#fff';
for (let item of spanList) item.style.color = '#fff';
```

I probably could of avoided this issue in the first place if I didnt select the paragraphs and span elements by tag name in my css and also if I used more utility classes in genreal, but given that this was not such a big project I didnt feel the need to do so.

### Useful resources

- [Fetch with async/await](https://dmitripavlutin.com/javascript-fetch-async-await/) - This is an amazing article that answerd alot of my fetch request questions with async and await. I really think it's worth the read.
- [Loops in nodeLists and HTMLCollections](https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements) - The top answer here really gives a good explanation on the proper ways loops should be used in a nodeList or an HTMLCollection.

## Author

- LinkedIn - [Alkin Maystorov](https://www.linkedin.com/in/alkin-maystorov/)
- Github - [@SirDev97](https://github.com/SirDev97)
- Frontend Mentor - [@SirDev97](https://www.frontendmentor.io/profile/SirDev97)

## Acknowledgments

- [Digital Clock - Aaron Farrar](https://codepen.io/afarrar/pen/JRaEjP) - Inspiration for updating the clock in real time.
