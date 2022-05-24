import { defineComponent, onMounted } from "vue";
import { NButton } from "naive-ui";

export default defineComponent(() => {
    onMounted(() => {
        console.log(123)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://fakeapi.jsonparseronline.com/users/1', true);
        xhr.send();
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(this.responseText, 'xhr');
            }
        }
        fetch("http://fakeapi.jsonparseronline.com/users/1")
            .then(response => response.text())
            .then(json => console.log(json, 'fetch'))
    })
    return () => <div>
        <NButton>Hello</NButton>
    </div>
})