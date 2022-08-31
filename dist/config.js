/*
 * Created on Tue Jul 07 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultConfiguration = void 0;
    exports.DefaultConfiguration = {
        locoBookingHost: 'booking-loco.kakao.com',
        locoBookingPort: 443,
        // eslint-disable-next-line max-len
        locoPEMPublicKey: `-----BEGIN PUBLIC KEY-----\nMIIBIDANBgkqhkiG9w0BAQEFAAOCAQ0AMIIBCAKCAQEApElgRBx+g7sniYFW7LE8ivrwXShKTRFV8lXNItMXbN5QSC8vJ/cTSOTS619Xv5Zx7xXJIk4EKxtWesEGbgZpEUP2xQ+IeH9oz0JxayEMvvD1nVNAWgpWE4pociEoArsK7qY3YwXb1CiDHo9hojLv7djbo3cwXvlyMh4TUrX2RjCZPlVJxk/LVjzcl9ohJLkl3eoSrf0AE4kQ9mk3+raEhq5Dv+IDxKYX+fIytUWKmrQJusjtre9oVUX5sBOYZ0dzez/XapusEhUWImmB6mciVXfRXQ8IK4IH6vfNyxMSOTfLEhRYN2SMLzplAYFiMV536tLS3VmG5GJRdkpDubqPeQIBAw==\n-----END PUBLIC KEY-----`,
        agent: 'win32',
        version: '3.4.2',
        appVersion: '3.4.2.3187',
        osVersion: '10.0',
        // 2 == sub, 1 == main
        deviceType: 2,
        // 0 == wired(WIFI), 3 == cellular
        netType: 0,
        // 999: pc
        mccmnc: '999',
        countryIso: 'KR',
        language: 'ko',
        subDevice: true,
        deviceModel: '',
        loginTokenSeedList: ['PITT', 'INORAN'],
    };
});
//# sourceMappingURL=config.js.map