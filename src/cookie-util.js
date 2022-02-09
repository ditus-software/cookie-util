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
    const ca = document.cookie.split(';');
    const caLen = ca.length;
    const cookieName = `${name}=`;

    for (let i = 0; i < caLen; i += 1) {
      const c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
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
    this.setCookie(name, '', -1, null);
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
    let expires = null;
    if (expireDays) {
      const d = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      expires = `expires=${d.toUTCString()}`;
    } else if (expiryDate) {
      const d = new Date(expiryDate).toUTCString();
      expires = `expires=${d}`;
    }

    document.cookie = `${name}=${value}; ${expires};SameSite=Strict`;
  }
}
