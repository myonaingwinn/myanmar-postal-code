import { defineStore } from "pinia";
import { LANGUAGE } from "../enums";

const store = defineStore({
    id: "store",
    state: () => ({
        language: LANGUAGE.EN,
    }),
    getters: {
        language: state => state.language,
    },
    actions: {
        setLanguage(lang) {
            this.language = lang;
        },
    },
});

export default store;
