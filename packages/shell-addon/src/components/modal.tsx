import { defineComponent } from "vue";
import { useData } from "../store/data";
import { NButton } from "naive-ui";

export default defineComponent(() => {

    const store = useData()
    return () => <div>{store.title}test one
        <NButton>btn</NButton>
    </div>
})