# Player app

Fully functional web based mp3 player built with React and Node

![Alt Demo](https://raw.githubusercontent.com/jedluk/random/master/player/player_demo.gif)

Currently under migration to electron

## Launch the app

(Assuming you are in the root dir)

1. Install dependencies

```
> cd client && yarn install
> cd ../server && yarn install
```

2. Fire app

```
> yarn run start // from server dir
```

You are ready to go now !
Visit & enjoy the app on `http://localhost:3000`.

## Features

- player with options: start/stop, skip backward && forward, restart
- auto switch to next song
- handy track list with columns: title, artist, album, year and genre
- quick search for songs
- traversing directories in side panel
- filtering by artist, album and year
- theme picker (5 available themes!)

## TODO LIST

- [ ] fork project and create Electron based desktop app (WIP)
- [ ] basic e2e test suite with Cypress
- [x] HATEOAS driven API
