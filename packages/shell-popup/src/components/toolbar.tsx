import { defineComponent } from "vue";
import { NButton, NIcon, NSpace, NSwitch } from "naive-ui";
import { useI18n } from "vue-i18n";

// 工具栏: 全局开关 国际化 主题
export default defineComponent(() => {

    const { t } = useI18n()
    return () => <>
        <NSpace justify="space-between" class="px3 pt3 color-neutral-500">
            <NIcon size={20} class="hover:cursor-pointer">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2070" width="256" height="256">
                    <path d="M128 768h768v-85.34H128z m0-213.34h768v-85.32H128zM128 256v85.34h768V256z" p-id="2071"></path>
                </svg>
            </NIcon>
            <NSpace align="center">
                <NIcon size={20} class="hover:cursor-pointer">
                    {/* 搜索 */}
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496l-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28">
                        </path>
                    </svg>
                </NIcon>
                <NIcon size={20} class="hover:cursor-pointer">
                    {/* 清空 */}
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M824.4 438.8c0-37.6-30-67.6-67.6-67.6l-135.2 0L621.6 104.8c0-37.6-30-67.6-67.6-67.6-37.6 0-67.6 30-67.6 67.6l0 266.4L358.8 371.2c-37.6 0-67.6 30-67.6 67.6l0 67.6L828 506.4l0-67.6L824.4 438.8 824.4 438.8zM824.4 574c-11.2 0-536.8 0-536.8 0S250 972 88.4 972L280 972c75.2 0 108.8-217.6 108.8-217.6s33.6 195.2 3.6 217.6l105.2 0c-3.6 0 0 0 11.2 0 52.4-7.6 60-247.6 60-247.6s52.4 244 45.2 244c-26.4 0-78.8 0-105.2 0l0 0 154 0c-7.6 0 0 0 11.2 0 48.8-11.2 52.4-187.6 52.4-187.6s22.4 187.6 15.2 187.6c-18.8 0-48.8 0-67.6 0l-3.6 0 90 0C895.6 972 903.2 784.4 824.4 574L824.4 574z">
                        </path>
                    </svg>
                </NIcon>
                <NIcon size={20} class="hover:cursor-pointer">
                    {/* 启动 */}
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M825.48 493.81L219.52 144A21 21 0 0 0 188 162.15v699.7A21 21 0 0 0 219.52 880l606-349.85a21 21 0 0 0-0.04-36.34z">
                        </path>
                    </svg>
                    {/* 停止 */}
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M256 192h512c35.392 0 64 28.608 64 64v512c0 35.392-28.608 64-64 64H256c-35.392 0-64-28.608-64-64V256c0-35.392 28.608-64 64-64z">
                        </path>
                    </svg>
                </NIcon>
                <NIcon size={20} class="hover:cursor-pointer">
                    {/* 折叠 */}
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M708.010667 230.016l-196.010667 196.010667-196.010667-196.010667 59.989333-59.989333 136.021333 136.021333 136.021333-136.021333zM315.989333 793.984l196.010667-196.010667 196.010667 196.010667-59.989333 59.989333-136.021333-136.021333-136.021333 136.021333z">
                        </path>
                    </svg>
                </NIcon>
                <NIcon size={20} class="hover:cursor-pointer">
                    {/* 新增 */}
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256">
                        <path d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z">
                        </path>
                    </svg>
                </NIcon>
            </NSpace>
        </NSpace>
        <NSpace class="px3 pt3">
            <NButton size="tiny">{t('create')}</NButton>
        </NSpace>
    </>
})
