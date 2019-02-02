const { expect } = require('chai')
const rewire = require("rewire")
const setWallpaper = rewire("../set-wallpaper")

const wallpaperMock = {
  get: async function () {
    return 'path/wallpapers/2.jpg'
  },
  set: async function (path) {
    return true
  }
}
setWallpaper.__set__("wallpaper", wallpaperMock);

describe('setWallpaper', () => {
  it('Should set new wallpaper', async () => {
    const state = {
      imageUrl: '',
      choosenWalpaper: 0,
      wallpaperName: '1.jpg',
    }
    const result = await setWallpaper(state.wallpaperName, state.imageUrl, state)
    expect(result).to.equal('WALLPAPER_SET_FILE')
  })

  it('Should not set the same wallpaper', async () => {
    const state = {
      imageUrl: '',
      choosenWalpaper: 0,
      wallpaperName: '2.jpg',
    }
    const result = await setWallpaper(state.wallpaperName, state.imageUrl, state)
    expect(result).to.equal('WALLPAPER_SET_NONE')
  })
})
