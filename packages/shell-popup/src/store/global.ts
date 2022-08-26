
import { ref } from "vue";
import { defineStore } from "pinia";
import {
    setTabIcon,
    setBadge,
    noticeContentByPopup,
    NoticeKey,
    getStorage,
    StorageKey,
    setStorage
} from "@colibri/shared-utils";

export const useGlobal = defineStore('global', () => {
    // 获取全局状态
    const localStatus = getStorage(StorageKey.GLOBAL_SWITCH, false)
    const globalStatus = ref<boolean>(localStatus)

    // 更新全局状态
    const updateGlobalStatus = (bool: boolean) => {
        globalStatus.value = bool;
        // 更新本地数据
        setStorage(StorageKey.GLOBAL_SWITCH, bool);
        // 通知content 是否启用
        noticeContentByPopup(NoticeKey.GLOBAL_SWITCH, bool)
        // 设置徽章状态
        setTabIcon(bool)
        if (!bool) setBadge(undefined)
        // 需要同步一下命中率
        else noticeContentByPopup(NoticeKey.HIT_RATE, null);
    }

    return {
        globalStatus,
        updateGlobalStatus
    }
})