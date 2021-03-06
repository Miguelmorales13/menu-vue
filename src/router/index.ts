import {route, store} from 'quasar/wrappers';
import VueRouter from 'vue-router';
import { Store } from "vuex";
import { StateInterface } from '../store';
import routes from './routes';
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {getModule} from "vuex-module-decorators";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route<Store<StateInterface>>(function ({ Vue,store }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });
Router.beforeEach((to, from, next) => {
		let moduleAuth = getModule(AuthStoreModule, store);
		let hasValidations = to.matched.some(record => record.meta.validation);

		if (to.matched.some(record => record.meta.requiresAuth)) {
			if (!moduleAuth.isAuth) {
				next({ path: "/" });
			} else {
        console.log(to.meta.id)
				if (hasValidations) {
					let module = moduleAuth.modulesRol.find(
						access => access.AccessRolUser.accessId == to.meta.id
					);
          console.log(module)
					if (!module) {
						next({ path: "/admin" });
					} else {
						next();
					}
				} else {
					next();
				}
			}
		}

		if (to.matched.some(record => record.meta.requiresNoAuth)) {
			if (moduleAuth.isAuth) {
				next({ path: "/admin" });
			} else {
				next();
			}
		}
	});
  return Router;
})
