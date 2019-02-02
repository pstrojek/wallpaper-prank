const wallpaper = require('wallpaper')
const fs = require('fs');
const path = require('path');
const isUrl = require('is-url-superb');
const got = require('got');
const tempfile = require('tempfile');

const setWallpaper = async (name, imageUrl, state) => {
  const currentWallpaper = await wallpaper.get()
  
  if (isUrl(imageUrl) && !currentWallpaper.endsWith('/wallpapers/' + name)) {
    const file = tempfile(path.extname(imageUrl))
    state.wallpaperName = path.basename(imageUrl)
    
    got
      .stream(imageUrl)
      .pipe(fs.createWriteStream(file))
      .on('finish', async () => {
        await wallpaper.set(file);
        return 'WALLPAPER_SET_URL'
      })
  } else if (!currentWallpaper.endsWith('/wallpapers/' + name)) {
    await wallpaper.set(__dirname + '/wallpapers/' + name)
    return 'WALLPAPER_SET_FILE'
  }
  return 'WALLPAPER_SET_NONE'
}

module.exports = setWallpaper;
