import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        themeColor:'primary',
        alertColor: 'primary',
        alertCallBack: null,
        alertDialog: false,
        alertText: "",
        askDeleteDialog: false,

        askDeleteCallBack: false,
        router: {},
        initialPathName: '/console',
        app: null,
        user: {},
        role: {
            role: "unknown"
        },
        token: {
            token: ""
        },
        windowInnerHeight: window.innerHeight,
        windowInnerWidth: window.innerWidth
    },
    mutations: {
        windowResized(state) {
            state.windowInnerHeight = window.innerHeight;
            state.windowInnerWidth = window.innerWidth;
        },
        askDelete(state, cb) {
            state.askDeleteDialog = true;
            state.askDeleteCallBack = cb;
        },
        push(state, route) {
            console.log("Push mutation is called with ", route);
            state.router.push(route);
        },
        guest(state) {
            console.log("Guest mutation is called");
            state.user = {};
            state.role = {role: "guest"};
            state.token = {token: ""};

            window.localStorage.removeItem('app-token');
            delete Vue.prototype.$axios.defaults.headers.common['Authorization'];
            //this.dispatch('checkCurrentScope');

        },
        login(state, loginResponse) {
            console.log("login mutation is called with", loginResponse);
            state.role = loginResponse.role;
            state.user = loginResponse.user;
            state.token = loginResponse.token;
            window.localStorage.setItem('app-token', loginResponse.token.token);
            Vue.prototype.$axios.defaults.headers.common['Authorization'] = "Bearer " + state.token.token;
            this.dispatch('checkCurrentScope');
        },
        setInitialPathName(state, pathName) {
            console.log("setInitialPathName mutation is called with", pathName);
            if (typeof pathName == "undefined" || pathName == '/login') {
                pathName = '/console';
            }

            state.initialPathName = pathName;
        },
        setRouter(state, router) {
            console.log("setRouter mutation is called");
            state.router = router;
        },
        cancelDelete(state) {
            state.askDeleteDialog = false;
            state.askDeleteCallBack = null;
        },
        showAlert(state, obj) {
            state.alertDialog = true;
            state.alertText = obj.text;
            state.alertColor = obj.color;
            state.alertCallBack = obj.cb;
        },
        hideAlert(state) {
            state.alertDialog = false;
            console.log("hideAlert committed");
            state.alertCallBack();
        },
        applyDelete(state) {
            state.askDeleteCallBack();
            state.askDeleteDialog = false;
            state.askDeleteCallBack = null;
        },
        clearInitialPathName(state) {
            state.initialPathName = '/console';
        },
        setApp(state, app) {
            state.app = app;
        }
    },

    actions: {
        manageApp(context, app) {
            context.commit('setApp', app);
            context.commit('push', '/app');
        },
        checkScope(context, scope) {
            if (this.getters.role != scope) {
                switch (this.getters.role) {
                    case "admin":
                        console.log("admin is trying to open a guest pagein checkscope");
                        context.commit('push', context.getters.initialPathName);
                        context.commit('clearInitialPathName');
                        break;
                    case "guest":
                        console.log("guest is trying to open an admin page");
                        context.commit('setInitialPathName', window.location.pathname);
                        context.commit('push', '/login');
                        break;
                    case "unknown":
                        console.log("we shall wait for it to be certain");
                        break;
                }
            }

        },
        checkCurrentScope(context) {
            console.log('we should check current scope with this', this.getters.router);
            var comps = this.getters.router.getMatchedComponents();
            console.log("matched components", comps);
            if (comps.length == 0) {
                return;
                switch (this.getters.role) {
                    case "admin":
                        this.commit('push', '/console')
                        break;
                    case "guest":
                        this.commit('push', '/login')
                        break;

                }
            }
            this.dispatch('checkScope', comps[0].meta.scope);
        },
        success(context, obj) {
            obj.color = 'green';
            context.commit('showAlert', obj);
        },
        alert(context, obj) {
            obj.color = 'primary';
            context.commit('showAlert', obj);
        },
        warning(context, obj) {
            obj.color = 'orange';
            context.commit('showAlert', obj);
        },

        askDelete(context, cb) {
            context.commit('askDelete', cb);
        },
        logout(context) {
            context.commit('guest');
            context.commit('push', '/login');
            window.localStorage.removeItem('app-token');
        },
        login(context, userCreds) {

            Vue.prototype.$axios.post('/api/login', userCreds).then((response) => {
                context.commit('login', response.data);

            }).catch((e) => {
                context.commit('guest');

            })

        },

        init(context) {

            window.addEventListener('resize', () => {
                context.commit('windowResized');
            });

            context.commit('setInitialPathName', window.location.pathname);

            let token = window.localStorage.getItem('app-token');

            console.log("token exists in the localstorage", window.localStorage.hasOwnProperty('app-token'));
            if (!window.localStorage.hasOwnProperty('app-token')) {
                context.commit('guest');
                //context.commit('push', '/login');
                this.dispatch('checkCurrentScope');
                return;
            }

            console.log(this.getters.router.getMatchedComponents());

            Vue.prototype.$axios.defaults.headers.common['Authorization'] = "Bearer " + token;

            Vue.prototype.$axios.get('/api/me').then(function (response) {
                context.commit('login', response.data);
                context.commit('push', context.getters.initialPathName);
                context.commit('clearInitialPathName');
            }).catch(function (e) {
                context.commit('guest');
                context.commit('push', '/login');
            });


        }
    },
    getters: {
        innerHeight: (state) => state.windowInnerHeight,
        app: (state) => state.app,
        role: (state) => state.role.role,
        token: (state) => state.token.token,
        initialPathName: (state) => state.initialPathName,
        router: (state) => state.router,
        askDeleteDialog: (state) => state.askDeleteDialog,
        alertDialog: (state) => state.alertDialog,
        alertText: (state) => state.alertText,
        alertColor: (state) => state.alertColor,
        color:(state) => state.themeColor,

    }
})
