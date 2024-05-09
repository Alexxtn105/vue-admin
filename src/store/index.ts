import {Commit, createStore} from 'vuex'
import UserModule from "@/store/UserModule";

export default createStore({

    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        User: UserModule
    }
})
