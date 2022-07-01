import { ref } from "../index";

const state = ref({ switch: true })

console.assert(state.value.switch === true)