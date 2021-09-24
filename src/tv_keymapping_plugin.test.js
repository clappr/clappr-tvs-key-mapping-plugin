import { Core, Container, Browser, Playback, version } from '@clappr/core'
import TVsKeyMappingPlugin from './tv_keymapping_plugin'
import { KeyMap } from './keys_mapping/map'

const setupTest = (options = {}) => {
  const playback = new Playback(options)
  options.playback = playback
  const container = new Container(options)
  const core = new Core(options)
  const plugin = new TVsKeyMappingPlugin(core)

  core.addPlugin(plugin)
  core.activeContainer = container

  return { plugin, core, container, playback }
}

describe('TVsKeyMappingPlugin', () => {
  test('is compatible with the latest Clappr core version', () => {
    const { plugin, core } = setupTest()

    expect(core.getPlugin(plugin.name).supportedVersion).toEqual({ min: version })
  })

  test('map keys correctly on device Samsung Tizen', () => {
    setupTest({ tvsKeyMapping: { deviceToMap: 'samsung_tizen' } })

    expect(Browser.Keys).not.toBeUndefined()
    expect(Browser.Keys.VK_UP).toBe(38)
    expect(Browser.Keys.VK_RIGHT).toBe(39)
    expect(Browser.Keys.VK_DOWN).toBe(40)
    expect(Browser.Keys.VK_LEFT).toBe(37)
    expect(Browser.Keys.VK_ENTER).toBe(13)
    expect(Browser.Keys.VK_PLAY).toBe(415)
    expect(Browser.Keys.VK_PAUSE).toBe(19)
    expect(Browser.Keys.VK_PLAY_PAUSE).toBe(10252)
    expect(Browser.Keys.VK_STOP).toBe(413)
    expect(Browser.Keys.VK_BACK).toBe(10009)
    expect(Browser.Keys.VK_REWIND).toBe(412)
    expect(Browser.Keys.VK_FAST_FWD).toBe(417)
  })

  test('map keys correctly on device Samsung Orsay', () => {
    setupTest({ tvsKeyMapping: { deviceToMap: 'samsung_orsay' } })

    expect(Browser.Keys).not.toBeUndefined()
    expect(Browser.Keys.VK_UP).toBe(29460)
    expect(Browser.Keys.VK_RIGHT).toBe(5)
    expect(Browser.Keys.VK_DOWN).toBe(29461)
    expect(Browser.Keys.VK_LEFT).toBe(4)
    expect(Browser.Keys.VK_ENTER).toBe(29443)
    expect(Browser.Keys.VK_PLAY).toBe(71)
    expect(Browser.Keys.VK_PAUSE).toBe(74)
    expect(Browser.Keys.VK_PLAY_PAUSE).toBe(402)
    expect(Browser.Keys.VK_STOP).toBe(70)
    expect(Browser.Keys.VK_BACK).toBe(88)
    expect(Browser.Keys.VK_REWIND).toBe(69)
    expect(Browser.Keys.VK_FAST_FWD).toBe(72)
  })

  test('map keys correctly on device LG WebOS', () => {
    setupTest({ tvsKeyMapping: { deviceToMap: 'lg_webos' } })

    expect(Browser.Keys).not.toBeUndefined()
    expect(Browser.Keys.VK_UP).toBe(38)
    expect(Browser.Keys.VK_RIGHT).toBe(39)
    expect(Browser.Keys.VK_DOWN).toBe(40)
    expect(Browser.Keys.VK_LEFT).toBe(37)
    expect(Browser.Keys.VK_ENTER).toBe(13)
    expect(Browser.Keys.VK_PLAY).toBe(415)
    expect(Browser.Keys.VK_PAUSE).toBe(19)
    expect(Browser.Keys.VK_PLAY_PAUSE).toBe(402)
    expect(Browser.Keys.VK_STOP).toBe(413)
    expect(Browser.Keys.VK_BACK).toBe(461)
    expect(Browser.Keys.VK_REWIND).toBe(424)
    expect(Browser.Keys.VK_FAST_FWD).toBe(417)
  })

  test('map keys correctly on device Panasonic', () => {
    setupTest({ tvsKeyMapping: { deviceToMap: 'panasonic' } })

    expect(Browser.Keys).not.toBeUndefined()
    expect(Browser.Keys.VK_UP).toBe(38)
    expect(Browser.Keys.VK_RIGHT).toBe(39)
    expect(Browser.Keys.VK_DOWN).toBe(40)
    expect(Browser.Keys.VK_LEFT).toBe(37)
    expect(Browser.Keys.VK_ENTER).toBe(13)
    expect(Browser.Keys.VK_PLAY).toBe(415)
    expect(Browser.Keys.VK_PAUSE).toBe(19)
    expect(Browser.Keys.VK_PLAY_PAUSE).toBe(402)
    expect(Browser.Keys.VK_STOP).toBe(413)
    expect(Browser.Keys.VK_BACK).toBe(166)
    expect(Browser.Keys.VK_REWIND).toBe(424)
    expect(Browser.Keys.VK_FAST_FWD).toBe(417)
  })

  test('map keys correctly on device Browser', () => {
    setupTest({ tvsKeyMapping: { deviceToMap: 'browser' } })

    expect(Browser.Keys).not.toBeUndefined()
    expect(Browser.Keys.VK_UP).toBe(38)
    expect(Browser.Keys.VK_RIGHT).toBe(39)
    expect(Browser.Keys.VK_DOWN).toBe(40)
    expect(Browser.Keys.VK_LEFT).toBe(37)
    expect(Browser.Keys.VK_ENTER).toBe(13)
    expect(Browser.Keys.VK_PLAY).toBe(415)
    expect(Browser.Keys.VK_PAUSE).toBe(19)
    expect(Browser.Keys.VK_PLAY_PAUSE).toBe(402)
    expect(Browser.Keys.VK_STOP).toBe(413)
    expect(Browser.Keys.VK_BACK).toBe(8)
    expect(Browser.Keys.VK_REWIND).toBe(424)
    expect(Browser.Keys.VK_FAST_FWD).toBe(417)
  })

  test('default to browser key mapping when no device is provided', () => {
    setupTest({ tvsKeyMapping: { deviceToMap: null } })

    expect(Browser.Keys).toBe(KeyMap.browser)
  })

  test('does not define `Browser.Keys` if device is unknown', () => {
    setupTest({ tvsKeyMapping: { deviceToMap: 'unknown device' } })

    expect(Browser.Keys).toBeUndefined()
  })
})
