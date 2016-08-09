
function showNotification(message) {
  var options = {
      type: 'basic',
      iconUrl: 'icon.png',
      title: '' + message.title,
      message: '' + message.message
  }
  chrome.notifications.create('reminder',options , function(notificationId) {});
}
function getNotification(callback){
  var urlLocal = 'http://localhost:4500/api/v1/sentences'
  var url = 'https://jp-learn.herokuapp.com/api/v1/randoms'

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      callback(resp)
    }
  }
  xhr.send();
}

chrome.notifications.onClicked.addListener(function( notificationId ) {
  chrome.notifications.clear(notificationId, function() {});
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
  getNotification(showNotification)
});