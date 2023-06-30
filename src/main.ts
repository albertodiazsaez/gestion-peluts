import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import './index.css'
import LoginPage from './pages/LoginPage.vue'
import TestPage from './pages/TestPage.vue'

//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css'

//core
import 'primevue/resources/primevue.min.css'

//PrimeVUE
import "primeicons/primeicons.css"; //icons
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import PanelMenu from 'primevue/panelmenu'
import ToastService from 'primevue/toastservice'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

// prettier-ignore
const routes: RouteRecordRaw[] = [
  { path: '/login', component: LoginPage, name: 'login' },
  { path: '/test', component: TestPage, name: 'test'}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const accountRoutes = ['login', 'register']

// router.beforeEach(async (to, from, next) => {
//   const name = to.name as string;

//   try {
//     const session = await appwAccount.getSession("current");
//     to.meta.session = session;

//     if (accountRoutes.includes(name)) {
//       return next({ name: "application" });
//     }
//   } catch {
//     if (!accountRoutes.includes(name)) {
//       return next({ name: "login" });
//     }
//   }

//   next();
// });
// prettier-ignore
createApp(App)
    .use(router)
    .use(PrimeVue)
    .use(ToastService)
    .use(ConfirmationService)
    .component('Card', Card)
    .component('InputText', InputText)
    .component('Button', Button)
    .component('Toast', Toast)
    .component('PanelMenu', PanelMenu)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('ColumnGroup', ColumnGroup)
    .component('Row', Row)
    .component('Dialog', Dialog)
    .component('ConfirmPopup', ConfirmPopup)
    .mount('#app')
