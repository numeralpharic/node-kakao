export declare enum KnownKickoutType {
    CHANGE_SERVER = -2,
    LOGIN_ANOTHER = 0,
    ACCOUNT_DELETED = 1
}
export type KickoutType = KnownKickoutType | number;
export interface KickoutRes {
    reason: KickoutType;
}
