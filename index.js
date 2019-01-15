#!/usr/bin/env node
const wallpaper = require('wallpaper')
const fs = require('fs');
const path = require('path');
const parseArgs = require('minimist')
const isUrl = require('is-url-superb');
const got = require('got');
const tempfile = require('tempfile');

const params = parseArgs(process.argv.slice(2));
const INTERVAL_TIME = 60000
const wallpaperList = ['1.jpg', '2.jpg']

let state = {
  imageUrl: '',
  choosenWalpaper: 0,
  wallpaperName: '',
}

state.imageUrl = params.url || ''
state.wallpaperName = wallpaperList[state.choosenWalpaper]

const setWallpaper = async (name, imageUrl) => {
  const currentWallpaper = await wallpaper.get()
  if (isUrl(imageUrl) && !currentWallpaper.endsWith(name)) {
    const file = tempfile(path.extname(imageUrl))
    state.wallpaperName = path.basename(imageUrl)
  
    got
      .stream(imageUrl)
      .pipe(fs.createWriteStream(file))
      .on('finish', async () => {
        await wallpaper.set(file);
      })
  } else if (!currentWallpaper.endsWith(name)) {
      await wallpaper.set(__dirname + '/wallpapers/' + name)
  }
}

setWallpaper(state.wallpaperName, state.imageUrl)
if (params.watch) {
  setInterval(() => {
    setWallpaper(state.wallpaperName, state.imageUrl)
  }, INTERVAL_TIME)
}
