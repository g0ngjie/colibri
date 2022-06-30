
import { computed, onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { IMatchContentMap } from "@colibri/lib";
import { IMatchContent } from "@colibri/lib/lib/types";

export const useData = defineStore('data', () => {
    const title = ref<string>("标题: ")
    // 匹配规则数据
    const matchMap = ref<IMatchContentMap>({})
    // 匹配规则列表
    const tableList = computed<IMatchContent[]>(() => Object.keys(matchMap.value).map(key => matchMap.value[key]))
    // 数据表 加载状态
    const tableLoaded = ref(false)

    onMounted(() => {
        matchMap.value = { test: { switch_on: true, match_url: 'https://foo.com' } }
        tableLoaded.value = true
    })

    console.log("[debug]tableList.value:", tableList.value)
    return {
        title,
        matchMap,
        tableList,
        tableLoaded,
    }
})