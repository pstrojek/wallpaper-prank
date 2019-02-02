#!/usr/bin/env node
const parseArgs = require('minimist')
const setWallpaper = require('./set-wallpaper')

const params = parseArgs(process.argv.slice(2));
const INTERVAL_TIME = 60000
const wallpaperList = ['1.jpg', '2.jpg']

const state = {
  imageUrl: '',
  choosenWalpaper: 0,
  wallpaperName: '',
}

state.imageUrl = params.url || ''
state.wallpaperName = wallpaperList[state.choosenWalpaper]

setWallpaper(state.wallpaperName, state.imageUrl, state)
if (params.watch) {
  setInterval(() => {
    setWallpaper(state.wallpaperName, state.imageUrl, state)
  }, INTERVAL_TIME)
}
