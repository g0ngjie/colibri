import { defineComponent, ref } from "vue";
import {
    NIcon,
} from "naive-ui";
import { NoticeKey, noticeContentByPopup } from "@colibri/shared-utils";
import styl from "./index.module.scss";

export default defineComponent({
    props: {
        change: {
            type: Function,
            required: true,
            default: () => { }
        }
    },
    setup(props) {

        const status = ref<boolean>(false);
        const handleChangeStatus = () => {
            status.value = true;
            setTimeout(() => {
                status.value = false;
            }, 500);
        }

        const handleNotice = () => {
            noticeContentByPopup(NoticeKey.FIX_PROXY, null)
        }

        return () => {
            return (
                <div class={styl.repairContainer}>
                    {
                        status.value
                            ?
                            <div class={[styl.label, styl.repairLabel]}>Successful operation !!</div>
                            :
                            <div class={styl.label}>Fix Proxy</div>
                    }
                    <NIcon size="27" class={[styl.icon, styl.themeIcon]}>
                        <svg onClick={() => {
                            props.change()
                            handleChangeStatus()
                            handleNotice()
                        }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M747.36 797.184c-15.008 0-22.592-7.488-30.048-15.008a36.16 36.16 0 0 1 0-52.64c7.456-7.488 15.072-7.488 30.048-7.488 7.584 0 15.072 0 22.592 7.488a36.256 36.256 0 0 1 0 52.64c-7.52 7.52-14.976 15.008-22.592 15.008z m-75.328-240.192l-128.064 127.616 135.648 135.2c15.072 14.944 37.696 22.496 60.256 22.496s45.184-7.552 67.744-22.496c30.144-37.632 30.144-97.76 0-127.744l-135.584-135.072z m-218.432-7.488l-120.544 120.064-15.104-15.008-22.592 15.008-97.952 157.76 30.144 22.496 150.656-90.112 15.04-30.112-7.488-14.944 120.512-120.128-52.672-45.024z m150.688-7.488l-15.136-15.008 218.464-217.664c0-7.52 0-7.52 7.584-7.52 0 0 7.488 0 7.488 7.52v15.008l-218.4 217.664z m-37.696-37.568l-15.072-14.976 233.536-240.224h15.04c7.488 7.488 7.488 15.008 0 22.56l-233.504 232.64zM528.96 466.88l-15.136-14.976 218.528-217.664 7.488-7.52 7.488 7.52c7.584 7.488 7.584 15.008 0 15.008L528.96 466.88z m248.608-285.184c-30.176 0-52.768 7.488-75.36 30.048l-256.128 255.168 143.104 142.656 256.16-255.232a91.904 91.904 0 0 0 0-142.624c-15.04-22.528-45.216-30.016-67.776-30.016zM310.496 174.176c-15.104 0-30.112 0-45.216 7.488h7.52l60.288 60.032c22.56 30.048 22.56 75.072 0 105.12-15.104 15.008-37.696 22.496-60.288 22.496-15.072 0-37.664-7.488-52.736-22.496L159.776 286.784l-7.488-7.52c-7.552 15.008-7.552 37.536-7.552 60.064 0 90.08 75.328 157.632 165.76 157.632 90.4 0 158.176-67.552 158.176-157.632s-67.808-165.152-158.176-165.152">
                            </path>
                        </svg>
                    </NIcon>
                </div>
            );
        };
    },
});
