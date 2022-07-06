import { IGlobalState } from "./types";
import { Ref } from "@vue/reactivity";
export declare const OriginFetch: ((input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>) & typeof fetch;
export declare const initFetchState: (state: Ref<IGlobalState>) => Ref<IGlobalState>;
declare function CustomFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
export default CustomFetch;
