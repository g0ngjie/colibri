import { defineComponent } from "vue";
import { NIcon } from "naive-ui";
import styl from "./style.module.scss";

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        update: {
            type: Function,
            required: true,
        },
    },
    setup(props) {

        return () => <>
            {props.show
                ?
                <NIcon size={20} class={styl.icon}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256" onClick={() => props.update(false)}>
                        <path d="M793.024 710.272a32 32 0 1 0 45.952-44.544l-310.304-320a32 32 0 0 0-46.4 0.48l-297.696 320a32 32 0 0 0 46.848 43.584l274.752-295.328 286.848 295.808z"></path>
                    </svg>
                </NIcon>
                :
                <NIcon size={18} class={styl.icon}>
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="256" height="256" onClick={() => props.update(true)}>
                        <path d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z">
                        </path>
                    </svg>
                </NIcon>
            }
        </>;
    }
})