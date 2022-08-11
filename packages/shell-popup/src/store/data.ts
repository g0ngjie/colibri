
import { computed, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { ITableRowData } from "@/interfaces";

export const useData = defineStore('data', () => {
    const title = ref<string>("标题: ")
    // 匹配规则列表
    const tableList = ref<ITableRowData[]>([]);

    const list: ITableRowData[] = [
        { id: '1', match_url: '1', method: 'GET', filter_type: 'regex', hit: 0, switch_on: true, },
        { id: '2', match_url: '2', method: 'ANY', filter_type: 'normal', hit: 0, switch_on: true, },
        { id: '3', match_url: '3', method: "PATCH", filter_type: 'normal', hit: 0, switch_on: true, },
        { id: '4', match_url: '4', method: "DELETE", filter_type: 'normal', hit: 0, switch_on: true, },
        { id: '4', match_url: '4', method: "PUT", filter_type: 'normal', hit: 0, switch_on: true, },
        { id: '4', match_url: '4', method: "POST", filter_type: 'normal', hit: 0, switch_on: true, },
    ]
    onMounted(() => {
        tableList.value = list;
    })

    return {
        title,
        tableList,
    }
})