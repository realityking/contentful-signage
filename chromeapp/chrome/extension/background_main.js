
/**
 * Creates the window for the application.
 *
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
var runApp = function() {
  if (chrome.power) {
    chrome.power.requestKeepAwake('display');
  }
  chrome.app.window.create('main.html',
    {
      id: 'ContentfulSignageWindow',
      state: 'fullscreen',
      width: 1280,
      height: 720,
    },
    function(win) {
      // win.fullscreen();

    }.bind(this));
}.bind(this);

/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  runApp();
});


/**
 * Listens for the app restarting then re-creates the window.
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 */
chrome.app.runtime.onRestarted.addListener(function() {
  runApp();
});
