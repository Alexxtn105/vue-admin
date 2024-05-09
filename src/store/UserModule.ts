import {User} from "@/models/User";
import {Commit} from "vuex";

export default {
    // если namespaced True, при вызове в начале необходимо указывать пространство имен,
    // например: User/setUser (вместо setUser)
    // и store.state.User.user (вместо store.state.user)

    namespaced:true,
    state: {
        //инициализация. Здесь хранится состояние
        user: new User()
    },
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
}