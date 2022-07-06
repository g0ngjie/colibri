import { IGlobalState, IMatchContent, IMatchContentMap } from "./types";
declare function update<T = boolean>(switch_on: T): void;
declare function update<T = IMatchContent[]>(matching_content: T): void;
declare function update<T = IGlobalState>(state: T): void;
declare function switchOn(bool: boolean): void;
declare const _default: {
    update: typeof update;
    switchOn: typeof switchOn;
};
export default _default;
export type { IMatchContentMap };