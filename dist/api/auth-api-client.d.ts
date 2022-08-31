import { Long } from 'bson';
import { WebClient } from './web-client';
import { OAuthLoginConfig } from '../config';
import { OAuthCredential } from '../oauth';
import { AsyncCommandResult } from '../request';
import { XVCProvider } from './xvc';
/**
 * Login data
 */
export interface LoginData extends OAuthCredential {
    /**
     * User id
     */
    userId: Long;
    /**
     * Country iso
     */
    countryIso: string;
    /**
     * Country code
     */
    countryCode: string;
    /**
     * Account id
     */
    accountId: number;
    /**
     * Login server time
     */
    serverTime: number;
    /**
     * true if user data should be reset
     */
    resetUserData: boolean;
    /**
     * Story URL
     */
    storyURL: string;
    /**
     * OAuth token type
     */
    tokenType: string;
    /**
     * Auto login account id
     */
    autoLoginAccountId: string;
    /**
     * Displayed account id
     */
    displayAccountId: string;
    /**
     * Main device agent
     */
    mainDeviceAgentName: string;
    /**
     * Main device app version
     */
    mainDeviceAppVersion: string;
}
export interface LoginForm {
    email: string;
    password: string;
}
export interface TokenLoginForm extends LoginForm {
    autowithlock: boolean;
}
/**
 * Status code for auth client results
 */
export declare enum KnownAuthStatusCode {
    INVALID_PHONE_NUMBER = 1,
    SUCCESS_WITH_ACCOUNT = 10,
    SUCCESS_WITH_DEVICE_CHANGED = 11,
    MISMATCH_PASSWORD = 12,
    EXCEED_LOGIN_LIMIT = 13,
    MISMATCH_PHONE_NUMBER = 14,
    EXCEED_PHONE_NUMBER_CHECK_LIMIT = 15,
    NOT_EXIST_ACCOUNT = 16,
    NEED_CHECK_PHONE_NUMBER = 20,
    NEED_CHECK_QUIZ = 25,
    DORMANT_ACCOUNT = 26,
    RESTRICTED_ACCOUNT = 27,
    LOGIN_FAILED = 30,
    NOT_VERIFIED_EMAIL = 31,
    MOBILE_UNREGISTERED = 32,
    UNKNOWN_PHONE_NUMBER = 99,
    SUCCESS_SAME_USER = 100,
    SUCCESS_SAME_USER_BY_MIGRATION = 101,
    TOO_MANY_REQUEST_A_DAY = -20,
    TOO_MANY_REQUEST_AT_A_TIME = -30,
    MISMATCH_PASSCODE = -31,
    EXCEED_DAILY_REQUEST_LIMIT = -32,
    EXCEED_DAILY_REQUEST_LIMIT_VOICECALL = -33,
    EXCEED_DAILY_REQUEST_LIMIT_WITHOUT_TOKEN = -34,
    DEVICE_NOT_REGISTERED = -100,
    ANOTHER_LOGON = -101,
    DEVICE_REGISTER_FAILED = -102,
    INVALID_DEVICE_REGISTER = -110,
    INVALID_PASSCODE = -111,
    PASSCODE_REQUEST_FAILED = -112,
    NEED_TERMS_AGREE = -126,
    DENIED_DEVICE_MODEL = -132,
    RESET_STEP = -940,
    NEED_PROTECTOR_AGREE = -991,
    ACCOUNT_RESTRICTED = -997,
    INVALID_STAGE_ERROR = -998,
    UPGRADE_REQUIRED = -999,
    VOICE_CALL_ONLY = -10002,
    ACCESSIBILITY_ARS_ONLY = -10003,
    MIGRATION_FAILURE = -100001,
    INVAILD_TOKEN = -100002,
    UNDEFINED = -999999
}
/**
 * Provides default pc login api which can obtain OAuthCredential
 */
export declare class AuthApiClient {
    private _name;
    private _deviceUUID;
    config: OAuthLoginConfig;
    xvcProvider: XVCProvider;
    private _client;
    constructor(client: WebClient, _name: string, _deviceUUID: string, config: OAuthLoginConfig, xvcProvider: XVCProvider);
    get name(): string;
    get deviceUUID(): string;
    private createAuthHeader;
    private fillAuthForm;
    /**
     * Login using given data.
     *
     * @param {LoginForm} form
     * @param {boolean} [forced=false] If true, force login even other devices are login
     */
    login(form: LoginForm, forced?: boolean): AsyncCommandResult<LoginData>;
    /**
     * Login using token.
     *
     * @param {TokenLoginForm} form
     * @param {boolean} [forced=false] If true, force login even other devices are login
     */
    loginToken(form: TokenLoginForm, forced?: boolean): AsyncCommandResult<LoginData>;
    /**
     * Request passcode
     *
     * @param {LoginForm} form
     */
    requestPasscode(form: LoginForm): AsyncCommandResult;
    /**
     * Try to register device with passcode
     *
     * @param {LoginForm} form
     * @param {string} passcode
     * @param {boolean} [permanent=true] If true the device will be registered as permanent
     */
    registerDevice(form: LoginForm, passcode: string, permanent?: boolean): AsyncCommandResult;
    private calculateXVCKey;
    private getApiPath;
    /**
     * Create default AuthClient using config.
     *
     * @param {string} name
     * @param {string} deviceUUID
     * @param {Partial<OAuthLoginConfig>} config
     * @param {XVCProvider} [xvcProvider]
     */
    static create(name: string, deviceUUID: string, config?: Partial<OAuthLoginConfig>, xvcProvider?: XVCProvider): Promise<AuthApiClient>;
}
