//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
/**
 * Provides methods for working with cookies.
 */
export default class CookieUtil {
  /**
   * Gets the cookie with the specified name.
   *
   * @param {string} name The name of the cookie.
   * @returns {string} The value of the cookie.
   */
  static getCookie(name) {
    if (!name || name.trim() === '') {
      return '';
    }

    // Multiple cookies are separated by the semi-colon. Split them into an
    // array.
    const cookies = document.cookie.split(';');
    const cookieName = `${name}=`.toLowerCase();

    // Loop through each of the cookies.
    for (let i = 0; i < cookies.length; i += 1) {
      // Sometimes cookies will have leading or trailing white space, especially
      // after the first cookie. Some may consider trailing white space to be
      // significant, but some browsers trim it anyway.
      const cookie = cookies[i].trim();

      // If the cookie matches the cookie we are trying to retrieve, then return
      // the cookie.
      if (cookie.toLowerCase().indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }

    return '';
  }

  /**
   * Deletes the cookie with the specified name.
   *
   * @param {string} name The name of the cookie to delete.
   */
  static deleteCookie(name) {
    if (!name || name.trim() === '') {
      return;
    }

    // Multiple cookies are separated by the semi-colon. Split them into an
    // array.
    const cookies = document.cookie.split(';');

    // Loop through each of the cookies.
    for (let i = 0; i < cookies.length; i += 1) {
      // Sometimes cookies will have leading or trailing white space, especially
      // after the first cookie and it must be removed.
      const cookie = cookies[i].trim();
      const cookieName = cookie.substring(0, cookie.indexOf('='));

      // Check if the cookie matches the cookie we are trying to delete.
      if (name.toLowerCase() === cookieName.toLowerCase()) {
        this.setCookie(cookieName, '', -1, null);
      }
    }
  }

  /**
   * Creates the cookie with the specified name, value, and days.
   *
   * @param {string} name The name of the cookie.
   * @param {string} value The value of the cookie.
   * @param {number} expireDays The number of days until the cookie expires.
   * @param {string} expiryDate The date on which the cookie expires.
   */
  static setCookie(name, value, expireDays, expiryDate) {
    if (!name || name.trim() === '') {
      return;
    }

    let expires = null;
    if (expireDays) {
      const d = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      expires = `expires=${d.toUTCString()}`;
    } else if (expiryDate) {
      const d = new Date(expiryDate).toUTCString();
      expires = `expires=${d}`;
    }

    document.cookie = `${name}=${value ?? ''}; ${expires};SameSite=Strict`;
  }
}
