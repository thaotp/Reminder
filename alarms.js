(function () {
  'use strict';
  var alarmName = 'remindme';

  function checkAlarm(callback) {
    chrome.alarms.getAll(function(alarms) {
    var hasAlarm = alarms.some(function(a) {
      return a.name == alarmName;
    });

    var newLabel;
    if (hasAlarm) {
      newLabel = 'Cancel alarm';
    } else {
      newLabel = 'Activate alarm';
    }
       // document.getElementById('toggleAlarm').innerText = newLabel;
    if(!hasAlarm) createAlarm();
      if (callback) callback(hasAlarm);
    });
 }

 function createAlarm() {
  console.log('load')
  chrome.alarms.create(alarmName, {
    delayInMinutes: 0.5, periodInMinutes: 1});
  }

  function cancelAlarm() {
    chrome.alarms.clear(alarmName);
  }

 function doToggleAlarm() {
    checkAlarm( function(hasAlarm) {
      if (hasAlarm) {
        cancelAlarm();
      } else {
        createAlarm();
      }
      checkAlarm();
    });
 }

  // $$('#toggleAlarm').addEventListener('click', doToggleAlarm);

  checkAlarm();

})();
