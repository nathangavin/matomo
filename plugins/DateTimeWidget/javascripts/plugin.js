/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

window.addEventListener('load', function() {
  console.log('starting timer');
  this.setInterval(updateTime, 500);
});

function updateTime() {
  const siteTimeStamp = document.querySelector('#siteTimeStamp');
  const localTimeStamp = document.querySelector('#localTimeStamp');
  if (!(siteTimeStamp || localTimeStamp)) {
    console.log('doesnt Exist');
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

  const localDateStr = extractTimeString(currentDate);
  const siteDateStr = extractTimeString(adjustedDate);

  localTimeStamp.innerHTML = localDateStr;
  siteTimeStamp.innerHTML = siteDateStr;
}

function extractTimeString(date) {
  const fullYear = normaliseLength(date.getFullYear());
  const monthOneIndexed = normaliseLength(date.getMonth() + 1);
  const dayOfMonth = normaliseLength(date.getDate());
  const hourIn24 = normaliseLength(date.getHours());
  const minute = normaliseLength(date.getMinutes());
  return `${fullYear}/${monthOneIndexed}/${dayOfMonth} ${hourIn24}:${minute}`;
}

function normaliseLength(dateTimeNumber) {
  return dateTimeNumber < 10 ? `0${dateTimeNumber}` : `${dateTimeNumber}`;
}

