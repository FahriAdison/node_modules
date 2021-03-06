<div align="center">
<a href="https://discord.gg/vJs36ES"><img src="https://cdn.discordapp.com/attachments/707201738255368194/876703475982024704/sHentai.png" width="546" alt="sHentai"></a>
</div>

<h1 align="center" font-weight="bold">sHentai</h1>

<p align="center">
  <a href="https://discord.gg/vJs36ES"><img src="https://img.shields.io/discord/714877734978846830?color=7289da&logo=discord&logoColor=white" alt="Discord Support" /></a>
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/npm/dt/shentai" alt="NPM downloads">
  <img src="https://img.shields.io/npm/v/shentai" alt="NPM version">
</p>

> #### Simple and User-Friendly API for [nHentai](https://nhentai.net).
> #### Recommended for REST API, Bots, Sites

#### Table of content:

* **[Installation](#installation)**
* **[Usage](#usage)**
* **[Methods](#methods)**
  * [getPopular()](#getPopular)
  * [getNew()](#getNew)
  * [getDoujin()](#getDoujin)
  * [getRandom()](#getRandom)
  * [byAuthor()](#byAuthor)
  * [search()](#search)
* **[Data models](#data-models)**
  * [Doujin](#doujin)
  * [Search](#SearchResult-Class)
  * [Search Result](#Search-Result)
* **[Catching Errors without .catch()](#Catching-Errors-without-catch)**
* **[Discord Support](#Support)**
* **[License](#license)**

## Installation
```bash
$ npm install shentai
```

## Usage
```js
// in async function
const nHentai = require('shentai')
const sHentai = new nHentai

// Get a Random Doujin
await sHentai.getRandom().then(doujin => console.log(doujin))

// Get a indicated Doujin
await sHentai.getDoujin(1).then(doujin => console.log(doujin))

// Searching
await sHentai.search('dev').then(search => console.log(search.results))

// Next Page
const search = await sHentai.search('dev')
const nextPage = await search.next()
console.log(nextPage.results)
```

## Methods

### getPopular()

> *Returns the **[not full object](#Search-Result)** of a doujins.*
>
> Usage example:
> ```js
> // in async function
> const doujins = await sHentai.getPopular()
> console.log(doujins)
> ```
> 
> ###### *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[search model](#SearchResult-Class) [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)>*

---

### getNew()

> *Returns the **[not full object](#Search-Result)** of a doujins.*
>
> Usage example:
> ```js
> // in async function
> const doujins = await sHentai.getNew()
> console.log(doujins)
> ```
> 
> ###### *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[search model](#SearchResult-Class) [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)>*

---

### getDoujin()

> | Param | Type  |     Description     |
> |  ---  |  ---  |         ---         |
> |  [id]   | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)/[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | ID of Doujin |
>
> Usage example: 
> ```js
> // in async function
> const doujin = await sHentai.getDoujin(0)
> console.log(doujin)
> ```
>
> ###### *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Doujin model](#doujin) [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>*

---

### getRandom()

> Usage example:
> ```js
> // in async function
> const doujin = await sHentai.getRandom()
> console.log(doujin)
> ```
> 
> ###### *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Doujin model](#doujin) [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>*

---

### byAuthor()

> *Returns the **[not full object](#Search-Result)** of a doujins.*
>
> | Param |  Type  | Description                              |
> | ---   |  ---   | ---                                      |
> | text  | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | Text for entering search input on a site |
>
> Usage example:
> ```js
> // in async function
> const doujins = await sHentai.getPopular()
> console.log(doujins)
> ```
> 
> ###### *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[search model](#SearchResult-Class) [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)>*

---

### search()

> *Returns the **[not full object](#Search-Result)** of a doujins.*
>
> | Param |  Type  | Description                              |
> | ---   |  ---   | ---                                      |
> | text  | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | Text for entering search input on a site |
> 
> Usage example:
> ```js
> // in async function
> const search = await sHentai.search('dev')
> const doujin = await sHentai.getDoujin(search.results[0].id)
> console.log(doujin)
> ```
> 
> ###### *Returns: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[search model](#SearchResult-Class) [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)>*

---

## Data models

### Doujin

##### Doujin data models is a **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**.

```js
{
  id: String, // ID of Doujin
  author: String, // Author name of Doujin
  titles: {
    english: String, // English adaptation of the title
    original: String, //Original name of the title
  },
  pages: Array<String>, // Links of Images of Doujin
  tags: Array<String>, // Tags of Doujin
  cover: String // Link of Cover of Doujin
}
```

---

### SearchResult Class
```js
{
    results: Object[], // Search results on a site
    allDoujinsCount: Number, // Amount of all Doujins, which you can find
    lastPage: Number, // Number of All Pages from Search
    currentPage: Number, // Number of Current Page of Search
    next: Promise<SearchResult>, // Returns this class with new results of search next page
    prev: Promise<SearchResult>, // Returns this class with new results of search previous page
    first: Promise<SearchResult>, // Returns this class with new results of search first page
    last: Promise<SearchResult>, // Returns this class with new results of search last page
    getPage: Promise<SearchResult>, // Returns this class with new results of search indicated page
}
```

---

### Search Result

##### Search data models is a **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** of **[objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**.

```js
[
  {
    id: String, // ID of Doujin
    titles: Object, // english property every time(for user-friendly with fullObject's condition), title of the doujin
    cover: String //url of the cover image
  },
]
```

---

## Catching Errors without .catch()

In a Node.JS 15.x, reject use a strict mode. So, when Promise returns a reject, your app crashes.
<br>So, my library is user-friendly, and i don't want crash your app, if some wrong. So, how you can catch a errors?

For Example:
```js
// in async function
let doujin = await sHentai.getDoujin(0)
if (doujin.status) return console.error(doujin.message);
```
And, your app don't be crashes :)

## Support

[Discord Server](https://discord.gg/vJs36ES)

---

## License
MIT License

Copyright ?? Mikun Hatsune