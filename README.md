# node-pepwave

[![npm version](https://badge.fury.io/js/pepwave.svg)](https://badge.fury.io/js/pepwave)

PEPWAVE API Client for Node.js

# Install

```
$ npm install pepwave --save
```

# Overview

For now this client just has available `login` and `getGeoInfo` functions.

```javascript
const Pepwave = require('pepwave');

const pepwave = new Pepwave({
  url: 'http://192.168.50.1',
  username: 'admin',
  password: 'admin',
});

pepwave
  .login()
  .then(console.log)
  .catch(console.error);
```

# Pepwave API

## .login()

Logins into Pepwave with `username` and `password` provided in constructor.

```javascript
pepwave
  .login()
  .then((response) => {
    // response:
    //
    // {
    //   "stat": "ok",
    //   "response": {
    //     "permission": {
    //       "GET": 1,
    //       "POST": 1
    //     }
    //   }
    // }
  });
```

## .getGeoInfo()

Get latitude and longitude from connected GPS.

```javascript
pepwave
  .getGeoInfo()
  .then((response) => {
    // response:
    //
    // {
    //   "data": {
    //     "geoinfo": {
    //       "timestamp": "1505234274",
    //       "latlng": {
    //         "timestamp": "1505234267",
    //         "lat": "29.095247",
    //         "lng": "-110.96005"
    //       }
    //     }
    //   }
    // }
  });
```
**Note**: Before using this function make sure you have called `.login()` first.
