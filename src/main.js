import {createApp} from 'vue'
import App from './App.vue'


const app = createApp(App)

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
app.use(BootstrapVue3)



import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faLock)
app.component('font-awesome-icon', FontAwesomeIcon)


import {createWebHistory, createRouter } from 'vue-router'
import Tutorials from "./components/Tutorials"
import Login from "./components/view/auth/Login"
import Registration from "./components/view/auth/Registration"
import Forget from "./components/view/auth/Forget"
import Profile from "./components/view/profile/Profile"
import TutorialBuy from "./components/view/tutorial/TutorialBuy"
import TutorialLesson from "./components/view/tutorial/TutorialLesson"
import Courses from "./components/view/course/Courses"
import CourseBuy from "./components/view/course/CourseBuy"
import CourseLesson from "./components/view/course/CourseLesson"
import PaymentSuccess from "./components/view/payment/PaymentSuccess"
import PaymentFailed from "./components/view/payment/PaymentFailed"

const routes = [
    {path: "/", component: Tutorials},
    {path: "/login", component: Login},
    {path: "/registration", component: Registration},
    {path: "/forget", component: Forget},
    {path: "/profile", component: Profile},
    {path: "/tutorial/buy/:id_of_tutorial", component: TutorialBuy},
    {path: "/tutorial/:id_of_tutorial", component: TutorialLesson},
    {path: "/courses", component: Courses},
    {path: "/course/buy/:id_of_course", component: CourseBuy},
    {path: "/course/:id_of_course", component: CourseLesson},
    {path: "/payment/success", component: PaymentSuccess},
    {path: "/payment/failed", component: PaymentFailed}
];
const router = createRouter({
    history: createWebHistory(),
    routes
})
app.use(router)


import { createStore } from "vuex";
const store = createStore({
    state(){
        return {
            isAuth: false,
            apiDomain : "XXXXXXXXXXXXXXXXXXXXXXX"
        }
    },
    mutations: {
        signIn(state){
            state.isAuth = true;
        },
        signOut(state){
            state.isAuth = false;
        }
    }
})
app.use(store)



app.mount('#app')
