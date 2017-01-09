

var contentful = require('contentful');
var config = require('../../config.js');

import _ from 'lodash';

var client = contentful.createClient({
  space: config.spaceId,
  accessToken: config.cdaAccessToken
});

// Properties
var nextSyncToken;
var entries;
var assets;


function cacheSyncTokenInMemory(syncToken) {
	nextSyncToken = syncToken;
}

function getSyncToken() {
	return nextSyncToken;
}

function handleInitialResponse(response) {
	cacheSyncTokenInMemory(response.nextSyncToken);
	
	entries = response.entries; 
	assets = response.assets;
	
	return entries;
}

function mergeEntries(responseEntries, cachedEntries) {
	
	var mergedEntries = _.unionBy(responseEntries, cachedEntries, "id");
	
	mergedEntries = _.filter(mergedEntries, function(entry) {
		return entry.type != "DeletedEntry"
	});
	return mergedEntries;
}

function handleResponse(response) {
	cacheSyncTokenInMemory(response.nextSyncToken);
	
	// TODO: check assets as well.
	if (response.entries === undefined || response.entries.length == 0) {
		return null;
	}
	
	entries = mergeEntries(response.entries, entries)
	return entries
}

function initialSync() {
		
    client.sync({initial: true})
    .then(handleInitialResponse);
}

function nextSync() {
	
	client.sync({ nextSyncToken: getSyncToken() })
	.then(handleResponse);
}

function testMergeArrays() {
	console.log("Start test merging arrays")
	var entriesA = [
		{
			"id": "1",
			"name": "jp"
		},
		{
			"id": "2",
			"name": "rouven",
			"type": "Entry"
		}
	];
	var entriesB = [
		{
			"id": "1",
			"name": "not-jp"
		},
		{
			"type" : "DeletedEntry",
			"id": "2",
			"name": "rouven"
		},
		{
			"id": "3",
			"name": "snoop doggy dogg"
		}
	];
	console.log("Merged entries are");
	console.log(mergeEntries(entriesB, entriesA));
	console.log("End test script");
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