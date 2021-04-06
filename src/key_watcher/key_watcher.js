import { CorePlugin, Events, Log, version } from '@clappr/core'
import { KeyMap } from '../keys_mapping/map'

export default class TVsKeyMappingPlugin extends CorePlugin {
  get name() { return 'tvs_key_mapping' }

  get supportedVersion() { return { min: version } }

  constructor(core) {
    Events.register('CORE_SMART_TV_KEY_PRESSED')
    Events.register('CONTAINER_SMART_TV_KEY_PRESSED')
    super(core)
    this.start = this.start.bind(this)
    this._triggerKeyDownEvents = this._triggerKeyDownEvents.bind(this)

    this._deviceName = this.options.tvsKeyMapping && this.options.tvsKeyMapping.deviceToMap

    this._deviceName
      ? this.start(this._deviceName)
      : Log.warn(this.name, 'tvsKeyMapping.deviceToMap was not configured. Call the start method with a valid name to activate the plugin.')
  }

  start(device) {
    if (!device) return Log.warn(this.name, 'No one device name was received. The plugin will not fire events as expected.')
    if (!KeyMap[device]) return Log.warn(this.name, 'The device name is not valid. The plugin will not fire events as expected.')

    this._deviceName = device
    document.addEventListener('keydown', this._triggerKeyDownEvents)
  }

  _triggerKeyDownEvents(ev) {
    const keyName = this._getKeyNameFromEvent(ev)

    if (typeof keyName === 'undefined') return Log.warn(this.name, 'The key code is not mapped. The plugin will not fire events as expected.')

    this.core.trigger(Events.Custom.CORE_SMART_TV_KEY_PRESSED, keyName)
  }

  _getKeyNameFromEvent(ev) {
    const keyMapForDevice = KeyMap[this._deviceName]
    const keyName = keyMapForDevice && keyMapForDevice[ev.keyCode]
    return keyName
  }
}
