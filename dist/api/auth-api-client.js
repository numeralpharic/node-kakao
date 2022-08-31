/*
 * Created on Thu Jan 28 2021
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./web-client", "../config", "../request", "./header-util", "./struct", "./xvc"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthApiClient = exports.KnownAuthStatusCode = void 0;
    const web_client_1 = require("./web-client");
    const config_1 = require("../config");
    const request_1 = require("../request");
    const header_util_1 = require("./header-util");
    const struct_1 = require("./struct");
    const xvc_1 = require("./xvc");
    /**
     * Status code for auth client results
     */
    var KnownAuthStatusCode;
    (function (KnownAuthStatusCode) {
        KnownAuthStatusCode[KnownAuthStatusCode["INVALID_PHONE_NUMBER"] = 1] = "INVALID_PHONE_NUMBER";
        KnownAuthStatusCode[KnownAuthStatusCode["SUCCESS_WITH_ACCOUNT"] = 10] = "SUCCESS_WITH_ACCOUNT";
        KnownAuthStatusCode[KnownAuthStatusCode["SUCCESS_WITH_DEVICE_CHANGED"] = 11] = "SUCCESS_WITH_DEVICE_CHANGED";
        KnownAuthStatusCode[KnownAuthStatusCode["MISMATCH_PASSWORD"] = 12] = "MISMATCH_PASSWORD";
        KnownAuthStatusCode[KnownAuthStatusCode["EXCEED_LOGIN_LIMIT"] = 13] = "EXCEED_LOGIN_LIMIT";
        KnownAuthStatusCode[KnownAuthStatusCode["MISMATCH_PHONE_NUMBER"] = 14] = "MISMATCH_PHONE_NUMBER";
        KnownAuthStatusCode[KnownAuthStatusCode["EXCEED_PHONE_NUMBER_CHECK_LIMIT"] = 15] = "EXCEED_PHONE_NUMBER_CHECK_LIMIT";
        KnownAuthStatusCode[KnownAuthStatusCode["NOT_EXIST_ACCOUNT"] = 16] = "NOT_EXIST_ACCOUNT";
        KnownAuthStatusCode[KnownAuthStatusCode["NEED_CHECK_PHONE_NUMBER"] = 20] = "NEED_CHECK_PHONE_NUMBER";
        KnownAuthStatusCode[KnownAuthStatusCode["NEED_CHECK_QUIZ"] = 25] = "NEED_CHECK_QUIZ";
        KnownAuthStatusCode[KnownAuthStatusCode["DORMANT_ACCOUNT"] = 26] = "DORMANT_ACCOUNT";
        KnownAuthStatusCode[KnownAuthStatusCode["RESTRICTED_ACCOUNT"] = 27] = "RESTRICTED_ACCOUNT";
        KnownAuthStatusCode[KnownAuthStatusCode["LOGIN_FAILED"] = 30] = "LOGIN_FAILED";
        KnownAuthStatusCode[KnownAuthStatusCode["NOT_VERIFIED_EMAIL"] = 31] = "NOT_VERIFIED_EMAIL";
        KnownAuthStatusCode[KnownAuthStatusCode["MOBILE_UNREGISTERED"] = 32] = "MOBILE_UNREGISTERED";
        KnownAuthStatusCode[KnownAuthStatusCode["UNKNOWN_PHONE_NUMBER"] = 99] = "UNKNOWN_PHONE_NUMBER";
        KnownAuthStatusCode[KnownAuthStatusCode["SUCCESS_SAME_USER"] = 100] = "SUCCESS_SAME_USER";
        KnownAuthStatusCode[KnownAuthStatusCode["SUCCESS_SAME_USER_BY_MIGRATION"] = 101] = "SUCCESS_SAME_USER_BY_MIGRATION";
        KnownAuthStatusCode[KnownAuthStatusCode["TOO_MANY_REQUEST_A_DAY"] = -20] = "TOO_MANY_REQUEST_A_DAY";
        KnownAuthStatusCode[KnownAuthStatusCode["TOO_MANY_REQUEST_AT_A_TIME"] = -30] = "TOO_MANY_REQUEST_AT_A_TIME";
        KnownAuthStatusCode[KnownAuthStatusCode["MISMATCH_PASSCODE"] = -31] = "MISMATCH_PASSCODE";
        KnownAuthStatusCode[KnownAuthStatusCode["EXCEED_DAILY_REQUEST_LIMIT"] = -32] = "EXCEED_DAILY_REQUEST_LIMIT";
        KnownAuthStatusCode[KnownAuthStatusCode["EXCEED_DAILY_REQUEST_LIMIT_VOICECALL"] = -33] = "EXCEED_DAILY_REQUEST_LIMIT_VOICECALL";
        KnownAuthStatusCode[KnownAuthStatusCode["EXCEED_DAILY_REQUEST_LIMIT_WITHOUT_TOKEN"] = -34] = "EXCEED_DAILY_REQUEST_LIMIT_WITHOUT_TOKEN";
        KnownAuthStatusCode[KnownAuthStatusCode["DEVICE_NOT_REGISTERED"] = -100] = "DEVICE_NOT_REGISTERED";
        KnownAuthStatusCode[KnownAuthStatusCode["ANOTHER_LOGON"] = -101] = "ANOTHER_LOGON";
        KnownAuthStatusCode[KnownAuthStatusCode["DEVICE_REGISTER_FAILED"] = -102] = "DEVICE_REGISTER_FAILED";
        KnownAuthStatusCode[KnownAuthStatusCode["INVALID_DEVICE_REGISTER"] = -110] = "INVALID_DEVICE_REGISTER";
        KnownAuthStatusCode[KnownAuthStatusCode["INVALID_PASSCODE"] = -111] = "INVALID_PASSCODE";
        KnownAuthStatusCode[KnownAuthStatusCode["PASSCODE_REQUEST_FAILED"] = -112] = "PASSCODE_REQUEST_FAILED";
        KnownAuthStatusCode[KnownAuthStatusCode["NEED_TERMS_AGREE"] = -126] = "NEED_TERMS_AGREE";
        KnownAuthStatusCode[KnownAuthStatusCode["DENIED_DEVICE_MODEL"] = -132] = "DENIED_DEVICE_MODEL";
        KnownAuthStatusCode[KnownAuthStatusCode["RESET_STEP"] = -940] = "RESET_STEP";
        KnownAuthStatusCode[KnownAuthStatusCode["NEED_PROTECTOR_AGREE"] = -991] = "NEED_PROTECTOR_AGREE";
        KnownAuthStatusCode[KnownAuthStatusCode["ACCOUNT_RESTRICTED"] = -997] = "ACCOUNT_RESTRICTED";
        KnownAuthStatusCode[KnownAuthStatusCode["INVALID_STAGE_ERROR"] = -998] = "INVALID_STAGE_ERROR";
        KnownAuthStatusCode[KnownAuthStatusCode["UPGRADE_REQUIRED"] = -999] = "UPGRADE_REQUIRED";
        KnownAuthStatusCode[KnownAuthStatusCode["VOICE_CALL_ONLY"] = -10002] = "VOICE_CALL_ONLY";
        KnownAuthStatusCode[KnownAuthStatusCode["ACCESSIBILITY_ARS_ONLY"] = -10003] = "ACCESSIBILITY_ARS_ONLY";
        KnownAuthStatusCode[KnownAuthStatusCode["MIGRATION_FAILURE"] = -100001] = "MIGRATION_FAILURE";
        KnownAuthStatusCode[KnownAuthStatusCode["INVAILD_TOKEN"] = -100002] = "INVAILD_TOKEN";
        KnownAuthStatusCode[KnownAuthStatusCode["UNDEFINED"] = -999999] = "UNDEFINED";
    })(KnownAuthStatusCode = exports.KnownAuthStatusCode || (exports.KnownAuthStatusCode = {}));
    /**
     * Provides default pc login api which can obtain OAuthCredential
     */
    class AuthApiClient {
        constructor(client, _name, _deviceUUID, config, xvcProvider) {
            this._name = _name;
            this._deviceUUID = _deviceUUID;
            this.config = config;
            this.xvcProvider = xvcProvider;
            this._client = new web_client_1.DataWebRequest(client);
        }
        get name() {
            return this._name;
        }
        get deviceUUID() {
            return this._deviceUUID;
        }
        async createAuthHeader(form) {
            const header = {};
            (0, header_util_1.fillBaseHeader)(header, this.config);
            (0, header_util_1.fillAHeader)(header, this.config);
            const userAgent = (0, header_util_1.getUserAgent)(this.config);
            header['User-Agent'] = userAgent;
            header['X-VC'] = await this.calculateXVCKey(this.deviceUUID, userAgent, form.email);
            return header;
        }
        fillAuthForm(form) {
            form['device_uuid'] = this._deviceUUID;
            form['device_name'] = this._name;
            if (this.config.deviceModel) {
                form['model_name'] = this.config.deviceModel;
            }
            return form;
        }
        /**
         * Login using given data.
         *
         * @param {LoginForm} form
         * @param {boolean} [forced=false] If true, force login even other devices are login
         */
        async login(form, forced = false) {
            const res = await this._client.requestData('POST', this.getApiPath('login.json'), this.fillAuthForm({ ...form, forced }), await this.createAuthHeader(form));
            if (res.status !== request_1.KnownDataStatusCode.SUCCESS)
                return { status: res.status, success: false };
            return {
                status: res.status,
                success: true,
                result: (0, struct_1.structToLoginData)(res, this._deviceUUID),
            };
        }
        /**
         * Login using token.
         *
         * @param {TokenLoginForm} form
         * @param {boolean} [forced=false] If true, force login even other devices are login
         */
        async loginToken(form, forced = false) {
            const res = await this._client.requestData('POST', this.getApiPath('login.json'), this.fillAuthForm({ ...form, auto_login: true, forced }), await this.createAuthHeader(form));
            if (res.status !== request_1.KnownDataStatusCode.SUCCESS)
                return { status: res.status, success: false };
            return {
                status: res.status,
                success: true,
                result: (0, struct_1.structToLoginData)(res, this._deviceUUID),
            };
        }
        /**
         * Request passcode
         *
         * @param {LoginForm} form
         */
        async requestPasscode(form) {
            const res = await this._client.requestData('POST', this.getApiPath('request_passcode.json'), this.fillAuthForm({ ...form }), await this.createAuthHeader(form));
            return { status: res.status, success: res.status === request_1.KnownDataStatusCode.SUCCESS };
        }
        /**
         * Try to register device with passcode
         *
         * @param {LoginForm} form
         * @param {string} passcode
         * @param {boolean} [permanent=true] If true the device will be registered as permanent
         */
        async registerDevice(form, passcode, permanent = true) {
            const res = await this._client.requestData('POST', this.getApiPath('register_device.json'), this.fillAuthForm({ ...form, passcode, permanent }), await this.createAuthHeader(form));
            return { status: res.status, success: res.status === request_1.KnownDataStatusCode.SUCCESS };
        }
        async calculateXVCKey(deviceUUID, userAgent, email) {
            return (await this.xvcProvider.toFullXVCKey(deviceUUID, userAgent, email)).substring(0, 16);
        }
        getApiPath(api) {
            return `${this.config.agent}/account/${api}`;
        }
        /**
         * Create default AuthClient using config.
         *
         * @param {string} name
         * @param {string} deviceUUID
         * @param {Partial<OAuthLoginConfig>} config
         * @param {XVCProvider} [xvcProvider]
         */
        static async create(name, deviceUUID, config = {}, xvcProvider) {
            return new AuthApiClient(await (0, web_client_1.createWebClient)('https', 'katalk.kakao.com'), name, deviceUUID, Object.assign({ ...config_1.DefaultConfiguration }, config), xvcProvider ? xvcProvider : xvc_1.Win32XVCProvider);
        }
    }
    exports.AuthApiClient = AuthApiClient;
});
//# sourceMappingURL=auth-api-client.js.map