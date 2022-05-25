import { defineComponent, onMounted } from "vue";
import { NButton } from "naive-ui";

export default defineComponent(() => {
    onMounted(() => {
    })
    return () => <div>
        <NButton>Hello</NButton>
    </div>
})