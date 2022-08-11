
import { computed, onMounted, ref, watch } from "vue";
import { defineStore } from "pinia";
import { ITableRowData } from "@/interfaces";
import { uuid, deepOClone } from "@alrale/common-lib";
import {
    getStorage,
    noticeContentByPopup,
    NoticeKey,
    setStorage,
    StorageKey
} from "@colibri/shared-utils";

// 通知content 变更数据
function noticeSync(list: ITableRowData[]) {
    // Proxy -> object
    const currentList = deepOClone(list)
    // 通知
    noticeContentByPopup(NoticeKey.INTERCEPT_LIST, currentList);
    // 同步本地数据
    setStorage(StorageKey.INTERCEPT_LIST, currentList);
}

export const useData = defineStore('data', () => {
    const title = ref<string>("标题: ")
    // 匹配规则列表
    const tableList = ref<ITableRowData[]>([]);

    onMounted(() => {
        const localList = getStorage(StorageKey.INTERCEPT_LIST, []);
        tableList.value = localList;
    })

    // 检测变更
    watch(() => [...tableList.value], (val) => {
        // 通知content 变更数据
        noticeSync(val)
    }, { deep: true })

    // 新增匹配规则
    const addRow = () => {
        tableList.value.push({
            id: uuid(),
            match_url: '',
            method: 'ANY',
            filter_type: 'normal',
            hit: 0,
            switch_on: false,
            expand: true,
        })
    }

    // 编辑 规则开关
    const updateSwitchById = (id: string, bool: boolean) => {
        tableList.value.forEach(item => {
            if (item.id === id) {
                item.switch_on = bool;
            }
        })
    }

    // 全部收起
    const collapseAll = () => {
        tableList.value.forEach(item => {
            item.expand = false;
        })
    }

    // 全部清空
    const clearAll = () => {
        tableList.value = [];
    }

    // 是否为空
    const isEmpty = computed(() => tableList.value.length === 0);

    return {
        title,
        tableList,
        addRow,
        updateSwitchById,
        collapseAll,
        clearAll,
        isEmpty,
    }
})