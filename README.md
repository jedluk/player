# Player app

Fully functional multi-platform (MacOS/Windows/Linux) mp3 player built with Electron/React/Node.

![Alt Demo](https://raw.githubusercontent.com/jedluk/random/master/player/player_demo.gif)

## Features

- handy player with options: start/stop, skip backward && forward, restart, volume setter
- auto switch to next song
- main grid with audio metadata: title, artist, album, year and genre
- quick search for songs
- traversing local directories in side panel
- filtering by artist, album and year
- theme picker (5 available themes!)
- i18n (EN, PL, more to come...)

## Development

First of all make sure you have node in version >= 14 installed on your machine. To check this simply type:
```sh
node -v
```
in your terminal. Then install necessary dependencies in client and server directories (please make sure to install dependencies using yarn)
```sh
cd client && yarn install
cd ../server && yarn install
```

There are different ways of running app (or it's parts). You can:
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

## Building native app

To build native app go to server diectory and run 
```
yarn run build-electron
```
As a first stage react production build is made. Then it's being copied to server and finally everything is bundled into one app. After awhile you should be able to see your app in dist folder. Depending on your operation system different binaries are located there (like DMG images on MacOS or .exe on Windows)

## TODO LIST

- [x] fork project and create Electron based desktop app
- [ ] basic e2e test suite with Cypress
- [x] HATEOAS driven API
