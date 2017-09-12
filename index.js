'use strict';

const toget = require('toget');
const { parseString } = require('xml2js');

/**
 *
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
     *
     *
     * @type {string}
     */
    this.username = opts.username;

    /**
     *
     *
     * @type {string}
     */
    this.password = opts.password;
  }

  /**
   *
   *
   * @returns
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
   *
   *
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
   *
   *
   * @returns
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
