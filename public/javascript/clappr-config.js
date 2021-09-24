/* eslint-disable */
Clappr.Log.setLevel(Clappr.Log.LEVEL_INFO)

function onReadyCallback() {
  var _hideTimeout;

  document.addEventListener('keydown', function(event) {
    clearTimeout(_hideTimeout);
    document.querySelector('.snackbar').innerText = 'The key pressed has the code ' + event.keyCode + ' and value ' + getKeyName(event.keyCode);
    document.querySelector('.snackbar').className += ' show';
    _hideTimeout = setTimeout(function() { document.querySelector('.snackbar').className = 'snackbar' }, 3000);
  });
};

function getKeyName(keyCode) {
  var keys = Clappr.Browser.Keys
  for (var keyName in keys) {
    if (keys[keyName] === keyCode) {
      return keyName
    }
  }
  return 'UNKNOWN'
}

var searchParams;
window.URLSearchParams && (searchParams = new window.URLSearchParams(window.location.search));

var player = new Clappr.Player({
  source: searchParams && searchParams.get('source') || 'http://clappr.io/highline.mp4',
  height: searchParams && searchParams.get('height') || '320px',
  width: searchParams && searchParams.get('width') || '640px',
  tvsKeyMapping: { deviceToMap: searchParams && searchParams.get('deviceToMap') || 'browser' },
  playback: { controls: true },
  plugins: [window.TVsKeyMappingPlugin],
  events: { onReady: onReadyCallback },
});

player.attachTo(document.body);
