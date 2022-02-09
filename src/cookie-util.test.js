//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
import CookieUtil from './cookie-util';

describe('CookieUtil', () => {
  describe('getCookie', () => {
    it('returns an empty string when the cookie does not exist.', () => {
      expect(CookieUtil.getCookie('does-not-exist')).toBe('');
    });

    it('returns an empty string when a cookie name is null, empty, or white space.', () => {
      expect(CookieUtil.getCookie(null)).toBe('');
      expect(CookieUtil.getCookie('')).toBe('');
      expect(CookieUtil.getCookie(' ')).toBe('');
    });

    it('returns the value of the cookie with the specified name when there are multiple cookies.', () => {
      CookieUtil.setCookie('the-world', 'is ruled by dogs', 90, null);
      CookieUtil.setCookie('the-desert', 'is ruled by lizards', 90, null);

      expect(CookieUtil.getCookie('the-world')).toBe('is ruled by dogs');
      expect(CookieUtil.getCookie('the-desert')).toBe('is ruled by lizards');
    });

    it('does not consider case (case-insensitive) when retreiving a cookie by name.', () => {
      CookieUtil.setCookie('the-world', 'is ruled by dogs', 90, null);

      expect(CookieUtil.getCookie('The-World')).toBe('is ruled by dogs');
    });
  });

  describe('deleteCookie', () => {
    it('does not fail when the cookie name is null, empty, or white space.', () => {
      CookieUtil.deleteCookie(null);
      CookieUtil.deleteCookie('');
      CookieUtil.deleteCookie(' ');
    });

    it('deletes the cookie with the specified name.', () => {
      CookieUtil.setCookie('the-world', 'is ruled by dogs', 90, null);
      expect(CookieUtil.getCookie('the-world')).toBe('is ruled by dogs');

      CookieUtil.deleteCookie('the-world');

      expect(CookieUtil.getCookie('the-world')).toBe('');
    });

    it('does not consider case (case-insensitive) when deleting a cookie by name.', () => {
      CookieUtil.setCookie('the-world', 'is ruled by dogs', 90, null);

      CookieUtil.deleteCookie('the-World');

      expect(CookieUtil.getCookie('the-world')).toBe('');
    });
  });

  describe('setCookie', () => {
    it('does not fail when the cookie name is null, empty, or white space.', () => {
      CookieUtil.setCookie(null, 'anything', 1, '2022-01-01');
      CookieUtil.setCookie(' ', 'anything', 1, '2022-01-01');
      CookieUtil.setCookie('', 'anything', 1, '2022-01-01');
    });

    it('leaves an empty value as-is.', () => {
      CookieUtil.setCookie('playground', '', 1, '2022-01-01');
      expect(CookieUtil.getCookie('playground')).toBe('');
    });

    it('converts a whitespace value to an empty value.', () => {
      CookieUtil.setCookie('playground', ' ', 1, '2022-01-01');
      expect(CookieUtil.getCookie('playground')).toBe('');
    });

    it('converts a null value to empty.', () => {
      CookieUtil.setCookie('playground', null, 1, '2022-01-01');
      expect(CookieUtil.getCookie('playground')).toBe('');
    });

    it('saves the cookie with the specified name and value.', () => {
      CookieUtil.setCookie('playground', 'for cats', 1, '2022-01-01');
      expect(CookieUtil.getCookie('playground')).toBe('for cats');
    });
  });
});
