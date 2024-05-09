import {Commit, createStore} from 'vuex'
import {User} from "@/models/User";

export default createStore({

    state: {
        //инициализация. Здесь хранится состояние
        user: new User()
    },
    getters: {},
    mutations: {
        // этот блок работает в бэкграунде
        SET_USER: (state: { user: User }, user: User) => state.user = user
    },
    actions: {
        // здесь располагаются методы, доступные в нашем приложении
        // если мы используем этот метод где-то в программе, он изменит состояние в разделе state
        // в нашем случае это объект user
        setUser: ({commit}: { commit: Commit }, user: User) => commit('SET_USER', user)
    },
    modules: {}
})
