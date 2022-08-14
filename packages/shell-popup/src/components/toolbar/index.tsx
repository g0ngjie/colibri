import { defineComponent, ref } from "vue";
import {
    NIcon,
    NSpace,
    useDialog,
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NDivider,
    NInput,
} from "naive-ui";
import { useGlobal } from "@/store/global";
import { useData } from "@/store/data";
import Theme from "./theme";
import { useI18n } from "vue-i18n";
import styl from "./index.module.scss";


// 工具栏: 全局开关 国际化 主题
export default defineComponent(() => {

    const { t } = useI18n();
    const store = useData()
    const globalData = useGlobal()

    // 抽屉栏状态
    const isShowDrawer = ref(false)

    const handlePaly = (bool: boolean) => {
        if (store.isEmpty) return
        globalData.updateGlobalStatus(bool)
    }

    // 清空数据
    const dialog = useDialog()
    const handleClean = () => {
        dialog.warning({
            title: 'Tips',
            content: 'sure to clean all data?',
            positiveText: 'Ok',
            negativeText: 'Cancel',
            style: {
                marginTop: '100px'
            },
            onPositiveClick: () => {
                store.clearAll()
            }
        })
    }

    return () => <>
        {/* 左侧抽屉 */}
        <LeftDrawer visibleRef={isShowDrawer} />
        <NSpace justify="space-between" class={styl.spaceContainer}>
            {/* 左侧抽屉按钮 */}
            <NIcon size={20} class={styl.icon}>
                <svg onClick={() => isShowDrawer.value = true} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                    <path d="M128 768h768v-85.34H128z m0-213.34h768v-85.32H128zM128 256v85.34h768V256z" ></path>
                </svg>
            </NIcon>
            <NSpace align="center">
                {/* 搜索框 */}
                <NInput
                    size="small"
                    clearable
                    placeholder="search label or url"
                    onInput={(searchKey) => store.updateSearchKey(searchKey)}
                />
                {/* 搜索 */}
                {/* <NIcon size={20} class={[styl.icon, store.isEmpty && styl.iconDisabled]}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28">
                        </path>
                    </svg>
                </NIcon> */}
                <NIcon size={20} class={[styl.icon, store.isEmpty && styl.iconDisabled]}>
                    {/* 清空 */}
                    <svg onClick={
                        store.isEmpty ? undefined : handleClean
                    } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M824.4 438.8c0-37.6-30-67.6-67.6-67.6l-135.2 0L621.6 104.8c0-37.6-30-67.6-67.6-67.6-37.6 0-67.6 30-67.6 67.6l0 266.4L358.8 371.2c-37.6 0-67.6 30-67.6 67.6l0 67.6L828 506.4l0-67.6L824.4 438.8 824.4 438.8zM824.4 574c-11.2 0-536.8 0-536.8 0S250 972 88.4 972L280 972c75.2 0 108.8-217.6 108.8-217.6s33.6 195.2 3.6 217.6l105.2 0c-3.6 0 0 0 11.2 0 52.4-7.6 60-247.6 60-247.6s52.4 244 45.2 244c-26.4 0-78.8 0-105.2 0l0 0 154 0c-7.6 0 0 0 11.2 0 48.8-11.2 52.4-187.6 52.4-187.6s22.4 187.6 15.2 187.6c-18.8 0-48.8 0-67.6 0l-3.6 0 90 0C895.6 972 903.2 784.4 824.4 574L824.4 574z">
                        </path>
                    </svg>
                </NIcon>
                <NIcon size={20} class={[styl.icon, store.isEmpty && styl.iconDisabled]}>
                    {
                        globalData.globalStatus
                            ?
                            // 停止图标
                            (<svg onClick={() => handlePaly(false)} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                                <path d="M256 192h512c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64H256c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64z">
                                </path>
                            </svg>)
                            :
                            // 启动图标
                            (<svg onClick={() => handlePaly(true)} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                                <path d="M825.48 493.81L219.52 144A21 21 0 0 0 188 162.15v699.7A21 21 0 0 0 219.52 880l606-349.85a21 21 0 0 0-0.04-36.34z">
                                </path>
                            </svg>)
                    }
                </NIcon>
                <NIcon size={20} class={[styl.icon, store.isEmpty && styl.iconDisabled]}>
                    {/* 折叠 */}
                    <svg onClick={store.collapseAll} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M708.010667 230.016l-196.010667 196.010667-196.010667-196.010667 59.989333-59.989333 136.021333 136.021333 136.021333-136.021333zM315.989333 793.984l196.010667-196.010667 196.010667 196.010667-59.989333 59.989333-136.021333-136.021333-136.021333 136.021333z">
                        </path>
                    </svg>
                </NIcon>
                <NIcon
                    size={20}
                    class={[styl.icon, store.tableList.length > 50 && styl.iconDisabled]}
                >
                    <span title={
                        store.tableList.length > 50 ? t('icon.limitRules') : t('icon.newRules')
                    }>
                        {/* 新增 */}
                        <svg onClick={
                            // 上限限制 50条
                            store.tableList.length <= 50 ? store.addRow : undefined
                        } viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                            <path d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z">
                            </path>
                        </svg>
                    </span>
                </NIcon>
                {/* <NIcon size={20} class={[styl.icon, styl.github]}>
                    <svg
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="256" height="256"
                    >
                        <path
                            d="M20.48 503.72608c0 214.4256 137.4208 396.73856 328.94976 463.6672 25.8048 6.5536 21.87264-11.8784 21.87264-24.33024v-85.07392c-148.93056 17.44896-154.86976-81.1008-164.94592-97.52576-20.23424-34.52928-67.91168-43.33568-53.69856-59.76064 33.91488-17.44896 68.48512 4.42368 108.46208 63.61088 28.95872 42.88512 85.44256 35.6352 114.15552 28.4672a138.8544 138.8544 0 0 1 38.0928-66.7648c-154.25536-27.60704-218.60352-121.77408-218.60352-233.79968 0-54.31296 17.94048-104.2432 53.0432-144.54784-22.36416-66.43712 2.08896-123.24864 5.3248-131.6864 63.81568-5.7344 130.00704 45.6704 135.168 49.68448 36.2496-9.78944 77.57824-14.9504 123.82208-14.9504 46.4896 0 88.064 5.3248 124.5184 15.23712 12.288-9.4208 73.80992-53.53472 133.12-48.128 3.15392 8.43776 27.0336 63.93856 6.02112 129.4336 35.59424 40.38656 53.69856 90.76736 53.69856 145.24416 0 112.18944-64.7168 206.4384-219.42272 233.71776a140.0832 140.0832 0 0 1 41.7792 99.9424v123.4944c0.86016 9.87136 0 19.6608 16.50688 19.6608 194.31424-65.49504 334.2336-249.15968 334.2336-465.5104C1002.57792 232.48896 782.66368 12.77952 511.5904 12.77952 240.18944 12.65664 20.48 232.40704 20.48 503.72608z"
                        ></path>
                    </svg>
                </NIcon> */}
            </NSpace>
        </NSpace>
    </>
})

// 左侧抽屉栏
const LeftDrawer = defineComponent({
    props: {
        visibleRef: {
            type: Object,
            default: () => ({ value: false })
        }
    },
    setup(props) {

        return () => <>
            <NDrawer
                v-model:show={props.visibleRef.value}
                placement="left"
                trapFocus={false}
                blockScroll={false}
                width={250}
                to="#app"
            >
                <NDrawerContent
                    title="Colibri 【Ajax Proxy v2】"
                    headerStyle={{ fontSize: '13px', color: '#606266', fontWeight: 600 }}
                >
                    <section class={styl.drawerContainer}>
                        <NFormItem
                            size="small"
                            labelPlacement="left"
                            labelWidth={160}
                            labelAlign="left"
                            label="Theme"
                        >
                            <Theme />
                        </NFormItem>

                        <NForm
                            size="small"
                            labelPlacement="left"
                            labelWidth={160}
                            labelAlign="left"
                        >
                            <NDivider />
                            <NFormItem>
                                <NIcon size={20} class={[styl.icon, styl.github]}>
                                    <svg
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="256" height="256"
                                    >
                                        <path
                                            d="M20.48 503.72608c0 214.4256 137.4208 396.73856 328.94976 463.6672 25.8048 6.5536 21.87264-11.8784 21.87264-24.33024v-85.07392c-148.93056 17.44896-154.86976-81.1008-164.94592-97.52576-20.23424-34.52928-67.91168-43.33568-53.69856-59.76064 33.91488-17.44896 68.48512 4.42368 108.46208 63.61088 28.95872 42.88512 85.44256 35.6352 114.15552 28.4672a138.8544 138.8544 0 0 1 38.0928-66.7648c-154.25536-27.60704-218.60352-121.77408-218.60352-233.79968 0-54.31296 17.94048-104.2432 53.0432-144.54784-22.36416-66.43712 2.08896-123.24864 5.3248-131.6864 63.81568-5.7344 130.00704 45.6704 135.168 49.68448 36.2496-9.78944 77.57824-14.9504 123.82208-14.9504 46.4896 0 88.064 5.3248 124.5184 15.23712 12.288-9.4208 73.80992-53.53472 133.12-48.128 3.15392 8.43776 27.0336 63.93856 6.02112 129.4336 35.59424 40.38656 53.69856 90.76736 53.69856 145.24416 0 112.18944-64.7168 206.4384-219.42272 233.71776a140.0832 140.0832 0 0 1 41.7792 99.9424v123.4944c0.86016 9.87136 0 19.6608 16.50688 19.6608 194.31424-65.49504 334.2336-249.15968 334.2336-465.5104C1002.57792 232.48896 782.66368 12.77952 511.5904 12.77952 240.18944 12.65664 20.48 232.40704 20.48 503.72608z"
                                        ></path>
                                    </svg>
                                </NIcon>
                                <a href="https://github.com/g0ngjie/colibri" target="_blank" rel="noopener" class={styl.link}>Colibri</a>
                            </NFormItem>
                        </NForm>
                    </section>
                </NDrawerContent>
            </NDrawer>
        </>
    }
})