# Prodigy

Fully functional multi platform (MacOS/Windows/Linux) mp3 player built with Electron/React/Node. Built in memory of Keith Flint, one of my favorite vocalist.

Links to download app (valid until June 15, 2021)
- [Windows installer](https://easyupload.io/4pdcq9)
- [MacOS dmg](https://easyupload.io/okvd8l)
- [Linux Appimage](https://easyupload.io/7i2pgo)

![Alt Demo](https://raw.githubusercontent.com/jedluk/random/master/player/player_demo.gif)

## Features

- basic player option: start/stop, skip backward && forward, restart, volume setter
- auto switch to next song
- main grid with audio metadata: title, artist, album, year and genre
- quick search for songs
- traversing local directories in side panel
- filtering by artist, album and year
- theme picker (6 available themes! ... and it's extremely easy to add new !)*
- i18n (EN, PL, FR, DE ... and it's extremely easy to add new !)*

* see also [Customizing app](#customizing-app)

## Development

App consists of two parts: application view built with React and lightweight HATEOS-driven server built with express. There are different ways to run them in development mode


First of all make sure you have node in version >= 14 installed on your machine. To check this simply type:

```sh
node -v
```

in your terminal. Then install necessary dependencies in client and server directories (please make sure to install dependencies using yarn)

```sh
cd client && yarn install
yarn run i18n
cd ../server && yarn install
```

There are different ways of running app (or its parts). You can:

- run electron in dev environment (fire entire application in dev mode)

```sh
cd server
yarn run electron-dev
```

- run client app separately

```sh
cd client
yarn run start
```

- run server side separately

```sh
cd server
yarn run server:dev
```

- run server and client side simultaneously (launch app in the browser)

```sh
cd server
yarn run start
```

## Customizing app

There are two things which you can extremely easy customize:

- translations
- themes

### Customizing translations

You can add support for new translations in 4 simple steps:

1. Generate translations template

```sh
cd client
yarn run i18n:populate
```
New file will be placed in `client/translations/lang.json`

2. Translate all values , and adjust file name (filename should match your locale)
3. Go to ```AppContext.tsx``` and update ***locales*** array with your locale. You can modify array in a way you want. Basically array determines order in which translations are loaded after clicking button. You can leave only yours locale (no possibilty to change language), or put it somwhere in the array. It must be reflected on server side validation -> please visit ***preferences.js*** and update language base types.
4. Regenerate types on client side (types are creted dynamically based on exisitng data)
```sh
cd client
yarn run i18n
```

### Customizing themes

Process is even simpler comparing to translations. You have to:

1. Visit ***themeMap.ts*** and define your theme based on 3 colors (light primary, dark primary and accent). New type ***must*** be typeof Theme and ***must*** be added to themeMap (you can also drop / update other themes if they are not suitable for You)
2. Update validation on server side by visiting ***preferences.js*** and extending themes base type

## Building native app 

To build native app go to server diectory and run

```
yarn run build-electron
```

As a first stage react production build is made. Then it's being copied to server and finally everything is bundled into one app. After awhile you should be able to see your app in dist folder. Depending on your operation system different binaries are located there (like DMG images on MacOS or Windows installer). 

If you need some kind of customization, please read [electron docs](https://www.electron.build/configuration/configuration).

## TODO LIST

- [x] fork project and create Electron based desktop app
- [ ] basic e2e test suite with Cypress
- [x] HATEOAS driven API
- [x] clean up types

## Want to contribute ?
I have some ideas in my mind about next features but it's always better to groom them together ! Write to me directly on jedrzej.lukasiuk@gmail.com and let's see how this project can grow !
