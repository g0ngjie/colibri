
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

    // 匹配规则列表
    const tableList = ref<ITableRowData[]>([]);
    // 搜索关键字
    const searchKey = ref<string>("");

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
        // 需要同步一下命中率
        noticeContentByPopup(NoticeKey.HIT_RATE, null);
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

    // 根据id删除
    const removeById = (id: string) => {
        tableList.value = tableList.value.filter(item => item.id !== id)
    }
    // 复制
    const duplicateById = (id: string) => {
        const target = tableList.value.find(item => item.id === id);
        if (target) {
            const newItem = deepOClone(target);
            newItem.id = uuid();
            newItem.label = `${newItem.label || ''}_copy`;
            newItem.switch_on = false;
            newItem.expand = true;
            tableList.value.push(newItem);
        }
    }
    // 上移位
    const moveUpById = (id: string) => {
        const target = tableList.value.find(item => item.id === id);
        if (target) {
            const index = tableList.value.indexOf(target);
            if (index > 0) {
                tableList.value.splice(index, 1);
                tableList.value.splice(index - 1, 0, target);
            }
        }
    }
    // 下移位
    const moveDownById = (id: string) => {
        const target = tableList.value.find(item => item.id === id);
        if (target) {
            const index = tableList.value.indexOf(target);
            if (index < tableList.value.length - 1) {
                tableList.value.splice(index, 1);
                tableList.value.splice(index + 1, 0, target);
            }
        }
    }

    // 清理命中率
    const clearHitRate = (id: string) => {
        tableList.value.forEach(item => {
            if (item.id === id) {
                item.hit = 0;
            }
        })
        // 需要同步一下命中率
        noticeContentByPopup(NoticeKey.HIT_RATE, null);
    }

    // 更新搜索关键字
    const updateSearchKey = (key: string) => {
        searchKey.value = key;
    }

    // 搜索结果集
    const interceptors = computed(() => {
        if (searchKey.value) {
            return tableList.value.filter(item => {
                return (item.label || '').includes(searchKey.value) || item.match_url.includes(searchKey.value);
            })
        }
        else return tableList.value;
    })

    return {
        interceptors,
        tableList,
        addRow,
        updateSwitchById,
        collapseAll,
        clearAll,
        isEmpty,
        removeById,
        duplicateById,
        moveUpById,
        moveDownById,
        updateSearchKey,
        clearHitRate,
    }
})