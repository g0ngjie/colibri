import { NoticeKey } from "./consts";
/**
 * 通知 popup -> content
 * @param key
 * @param value
 */
export declare function noticeContentByPopup(key: NoticeKey, value: any): void;
/**
 * 通知 content -> document
 */
export declare function noticeDocumentByContent(key: NoticeKey, value: any): void;
/**
 * 通知 popup
 */
export declare function noticePopup(key: NoticeKey, value: any): void;
/**
 * 通知 background
 * @param key
 * @param value
 */
export declare function noticeBackground(key: NoticeKey, value: any): void;
