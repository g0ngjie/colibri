import { defineComponent } from "vue";
import Toolbar from "./toolbar/index";
import Table from "./table";
import { NSpace } from 'naive-ui'

export default defineComponent(() => {

    return () => <>
        <NSpace vertical>
            <Toolbar />
            <Table />
        </NSpace>
    </>
})