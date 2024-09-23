/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
  * Set up updateTime callback function to run every 500ms to unhide the
  * widget content when its ready, then update the value of the timestamps
  * when necessary.
  */
window.addEventListener('load', function() {
  this.setInterval(updateTime, 500);
});

/**
  * Checks to see if the required html is loaded onto the DOM, then if it is,
  * generates a datetime string for the local environment, as well as the site
  * currently displayed on the dashboard, as defined in the global window.piwik
  * object. Updates the DOM to display these datetime strings.
  */
function updateTime() {
  const localContainer = document.querySelector('.dateTimeWidgetContainer .localDatetimeContainer');
  const siteContainer = document.querySelector('.dateTimeWidgetContainer .siteDatetimeContainer');
  const siteTimeStamp = document.querySelector('#siteTimeStamp');
  const localTimeStamp = document.querySelector('#localTimeStamp');
  if (!(siteTimeStamp ||
        localTimeStamp ||
        localContainer ||
        siteContainer)) {
    return;
  }

  const currentDate = new Date();
  const unixTimeStampMilliseconds = currentDate.getTime();
  const secondsSiteIsAheadOfUTC = window.piwik.timezoneOffset;
  const secondsUTCIsAheadOfLocalTimezone = currentDate.getTimezoneOffset() * 60;

  const adjustedTimeStamp = unixTimeStampMilliseconds +
                            (secondsUTCIsAheadOfLocalTimezone * 1000) +
                            (secondsSiteIsAheadOfUTC * 1000);
  const adjustedDate = new Date(adjustedTimeStamp);

  // optimisation = check new string against old string, only update if different

  if (currentDate.getTime() !== adjustedDate.getTime()) {
    const siteDateStr = extractTimeString(adjustedDate);
    siteTimeStamp.innerHTML = siteDateStr;
    siteContainer.classList.remove('hidden');
  } else {
    siteContainer.classList.add('hidden');
  }

  const localDateStr = extractTimeString(currentDate);
  localTimeStamp.innerHTML = localDateStr;
  localContainer.classList.remove('hidden');
}

/**
  * Takes a standard Date JS object (e.g. new Date()), and
  * returns a string representation, in the format:
  *   YYYY/MM/DD HH:MM
  * The time returned is using 24 hour time.
  * @param {Date} date - any standard JS Date object
  * @returns {string} - Date formatted into YYYY/MM/DD HH:MM
  */
function extractTimeString(date) {
  const fullYear = normaliseLength(date.getFullYear());
  const monthOneIndexed = normaliseLength(date.getMonth() + 1);
  const dayOfMonth = normaliseLength(date.getDate());
  const hourIn24 = normaliseLength(date.getHours());
  const minute = normaliseLength(date.getMinutes());
  return `${fullYear}/${monthOneIndexed}/${dayOfMonth} ${hourIn24}:${minute}`;
}

/**
  * Takes an integer, ideally retrieved from a Date function call such as getMonth(),
  * and normalises the length by adding a leading zero if necessary.
  * @param {number} dateTimeNumber - a number which may need leading zeros added
  * @returns {string} - stringified dateTimeNumber with any necessary leading zeros
  */
function normaliseLength(dateTimeNumber) {
  return dateTimeNumber < 10 ? `0${dateTimeNumber}` : `${dateTimeNumber}`;
}

