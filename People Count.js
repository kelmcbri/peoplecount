// DJ Uittenbogaard - duittenb@cisco.com
// JW Ruys - jruys@cisco.com
//
// v0.1       Info: Count maximum people, show notification when >max nr of people in the room
// v0.2       Changed text display method
// 5/28/2020  Forked Repository - Keller McBride kelmcbri@cisco.com
// v0.3       Touch 10 clean warning added
const xapi = require('xapi');
const maxPeople = 5
const alertDuration = 30
console.log('MACRO STARTED - COVID-19 People Count');

// display text on screen - can also be replaced by play-message, show-image, call-security etc
function displayTextOnScreen(text) {
  xapi.command('UserInterface Message Alert Display', {
  Title: 'COVID-19 ALERT',
  Text: text, Duration: alertDuration,
  });
}

// Process updated People Count STATUS data
function postStatusCall(amount) {
   console.log('DEBUG - Detected: ' + amount + ', max: ' + maxPeople);
   if (amount > maxPeople) {
       console.log('DEBUG - Alerting');
       displayTextOnScreen("Too many people detected                       Room capacity = " + maxPeople)
   }
}

// Process updated System Wake Status data
function postWakeStatus(wakestatus) {
   if (wakestatus == 'Off') {
       console.log('DEBUG - Alerting');
       displayTextOnScreen("Please Clean Touch10 before using.")
   }
}

// Get dynamic PEOPLE COUNT STATUS updates
xapi.status.on('RoomAnalytics PeopleCount Current', (numberofpeople) => postStatusCall(numberofpeople));
// Get dynamic WAKE STATUS updates
xapi.feedback.on('/Status/Standby/State', (wakestatus) => postWakeStatus(wakestatus));
