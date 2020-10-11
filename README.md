# Player app

Fully functional web based mp3 player built with React and Node

![Alt Demo](https://raw.githubusercontent.com/jedluk/random/master/player/player_demo.gif)

Running app with Docker is extremely easy !

## Launch the app

(Assuming you are in the root dir)

```
> docker-compose up
```

Next put your files inside assets directory (it can be either mp3 files or folders containing mp3 files). You are ready to go now !
Visit & enjoy the app on `http://localhost:8080/index.html`.

## Features

- player with options: start/stop, skip backward && forward, restart
- auto switch to next song
- handy track list with columns: title, artist, album, year and genre
- quick search for songs
- traversing directories in side panel
- filtering by artist, album and year

## DEV mode

```
npm run start
```

(processes will run simultaneously)

## TODO LIST

- [ ] fork project and create Electron based desktop app
- [ ] basic e2e test suite with Cypress
