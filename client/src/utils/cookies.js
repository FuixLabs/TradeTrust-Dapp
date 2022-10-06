/**
 * create new cookie value
 * @param {string} name - cookie name
 * @param {string} value - cookie value
 * @param {number} days - number of days to expire
 */
export const createCookie = (name, value, days) => {
  var date = new Date();
  days = days || 1 / 24;
  date.setTime(+date + days * 86400000);
  window.document.cookie = name + '=' + value + '; expires=' + date.toGMTString() + '; path=/';
  return value;
};

/**
 * read cookie value
 * @param {string} name - cookie name
 */
export const readCookie = (name) => {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

/**
 * erase cookie value
 * @param {string} name - cookie name
 */
export const eraseCookie = (name) => {
  createCookie(name, '', -1);
};
