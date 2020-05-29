# peoplecount
Webex Room device people counter - alerts when room is too full.  Also alerts to clean Touch tablet when leaving standby mode.


Edit the two constants in the peoplecount.js
maxPeople = 5         // What is the maximum occupancy of this room?
alertDuration = 30    // How many seconds to display the alert on the Touch 10 and Monitor.

For the macro to work, set PeopleCountOutOfCall and PeoplePresenceDetector to TRUE in Setup->Configuration->RoomAnalytics.

This code is forked from jruys/peoplecount  05/28/2020
KM Added: Alert when system comes out of Standby (someone enters the room) to clean the Touch 10 tablet before using.
