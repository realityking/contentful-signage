

var contentful = require('contentful');
var config = require('../../config.js');

var client = contentful.createClient({
  space: config.spaceId,
  accessToken: config.cdaAccessToken
});

var nextSyncToken;

function cacheSyncTokenInMemory(syncToken) {
	nextSyncToken = syncToken;
}

function getSyncToken() {
	return nextSyncToken;
}


function parseEntries(entries) {
	for (var i = 0; i < entries.length; i++) {
		// TODO:
	}
}

function initialSync() {
		
    client.sync({initial: true})
    .then((response) => {
		cacheSyncTokenInMemory(response.nextSyncToken);
		parseEntries(response.entries);
	})
}

function nextSync() {
	
	client.sync({ nextSyncToken: getSyncToken() })
	.then((response) => {
		cacheSyncTokenInMemory(response.nextSyncToken);
		parseEntries(response.entries);
	});
}


function syncContentfulWithRepeatDelay(seconds) {
	// Do initial sync
	initialSync();
	// Repeat after delay.
	window.setInterval(function() {
		nextSync();
	}, 1000 * seconds);
}

export { syncContentfulWithRepeatDelay }