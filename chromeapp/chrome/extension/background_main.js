
var contentful = require('contentful');

var fetchEntry = function() {

 
  var client = contentful.createClient({
	  space: 'wo8ajfmrrki1',
	  accessToken: '655151496bd45f257be01b2488fde49dfc379f36d6a7fddd082453d5976927f4'
  });
  client.getEntry('1OXEx1Eaz6IwGyIkQeAW44')
  .then((entry) => console.log(entry));
}

var syncContentfulWithRepeatDelay = function(seconds) {
	// Do once, then...
	fetchEntry();
	// Repeat after delay.
	window.setInterval(function() {
		fetchEntry();
	}, 1000 * seconds);
}

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
      width: 1100,
      height: 720,
      minWidth: 800,
      minHeight: 600
    },
    function(win) {
      if (!this.X) { return; }
      var window = win.contentWindow;
      window.onload = function() {
        this.$addWindow(window);
        var Y = this.X.subWindow(window, 'Contentful Signage');
        this.DOM.init(Y);
      }.bind(this);
      win.onClosed.addListener(function() {
        this.$removeWindow(window);
      }.bind(this));  
    }.bind(this));

	// Sync content via Contentful
	syncContentfulWithRepeatDelay(4);
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
