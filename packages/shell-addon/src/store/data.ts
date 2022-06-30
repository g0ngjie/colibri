
import { ref } from "vue";
import { defineStore } from "pinia";

export const useData = defineStore('data', () => {
    const title = ref<string>("标题: ")

    return {
        title,
    }
})