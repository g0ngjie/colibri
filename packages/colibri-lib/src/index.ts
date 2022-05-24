import { ref } from "./reactivity";
import { IGlobalState, IMatchContent } from "./types";
import CreateXHR, { initXHRState, OriginXHR } from "./createXHR";
import CreateFetch, { initFetchState, OriginFetch } from "./createFetch";
import { warn } from "./common";

// 初始化共享状态
const globalState = ref<IGlobalState>({
    // 全局状态开关
    switch_on: false,
    // 匹配内容
    matching_content: [],
})

function initState() {
    // 初始化共享状态
    initXHRState(globalState);
    initFetchState(globalState);
    mountInstance(globalState.value.switch_on)
}

function mountInstance(bool: boolean = true) {
    if (bool) {
        window.XMLHttpRequest = CreateXHR
        window.fetch = CreateFetch
    } else {
        window.XMLHttpRequest = OriginXHR
        window.fetch = OriginFetch
    }
}

function isIGlobalState(target: any) {
    return target.hasOwnProperty("switch_on") && target.hasOwnProperty("matching_content")
}

function updateGlobalState(target: unknown) {
    if (isIGlobalState(target)) {
        globalState.value = target as IGlobalState
        mountInstance(globalState.value.switch_on)
    } else warn("unknow type")
}

// 修改共享状态
function update<T = boolean>(switch_on: T)
function update<T = IMatchContent[]>(matching_content: T)
function update<T = IGlobalState>(state: T)
function update<unknow>(target: unknow) {
    if (typeof target === "boolean") {
        globalState.value.switch_on = target
        mountInstance(target)
    } else if (Array.isArray(target)) {
        globalState.value.matching_content = target
    } else updateGlobalState(target)
}

function switchOn(bool: boolean) {
    globalState.value.switch_on = bool
    mountInstance(bool)
}

initState()
export default {
    update,
    switchOn,
}