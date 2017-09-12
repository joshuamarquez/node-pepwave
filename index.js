'use strict';

const toget = require('toget');
const { parseString } = require('xml2js');

/**
 * PEPWAVE API Client
 *
 * @class Pepwave
 */
class Pepwave {
  /**
   * Creates an instance of Pepwave.
   *
   * @param {object} opts
   * @memberof Pepwave
   */
  constructor(opts) {
    /**
     * toget instance
     *
     * @type {object}
     */
    this.request = toget(opts.url);

    /**
     * Pepwave admin username.
     *
     * @type {string}
     */
    this.username = opts.username;

    /**
     * Pepwave admin password.
     *
     * @type {string}
     */
    this.password = opts.password;
  }

  /**
   * Logins into Pepwave with {@link Pepwave#username} and {@link Pepwave#password}.
   *
   * @returns {object}
   * @memberof Pepwave
   */
  login() {
    const req = this.request();
    this.jar = req.request.jar();

    return req
      .post('/cgi-bin/MANGA/api.cgi')
      .jar(this.jar)
      .body(`func=login&username=${this.username}&password=${this.password}`)
      .then((response) => {
        if (response.error) {
          throw response;
        }

        try {
          return JSON.parse(response.body);
        } catch (e) {
          return response.body;
        }
      });
  }

  /**
   * Get latitude and longitude from connected GPS.
   *
   * @returns {object}
   * @memberof Pepwave
   */
  getGeoInfo() {
    return this.request()
      .get('/cgi-bin/MANGA/data.cgi')
      .query({ option: 'geoinfo' })
      .jar(this.jar)
      .then((response) => {
        if (response.error) {
          throw response;
        }

        return Pepwave._xml2Json(response.body);
      });
  }

  /**
   * Parses XML to JSON.
   *
   * @private
   * @returns {object}
   * @memberof Pepwave
   */
  static _xml2Json(input) {
    return new Promise((resolve, reject) => {
      parseString(input, {
        explicitArray: false,
        mergeAttrs: true,
      }, (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  }
}

module.exports = Pepwave;
