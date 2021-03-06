import { store } from 'quasar/wrappers';
import Vuex from 'vuex';
import { GlobalStoreModule} from './modules/Global.store'
import { AuthStoreModule} from './modules/Auth.store'
import { UserStoreModule} from './modules/User.store'
// @ts-ignore
import { RolStoreModule} from './modules/Rol.store'
import { CategoryStoreModule} from './modules/Category.store'
import { SubcategoryStoreModule} from './modules/Subcategory.store'
import { ProductStoreModule} from './modules/Product.store'
import VuexPersistence from "vuex-persist";

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
}

export default store(function ({ Vue }) {
  Vue.use(Vuex);
	const vuexLocal = new VuexPersistence<any>({
		storage: window.localStorage,
		key: 'data',
	});
  const Store = new Vuex.Store<StateInterface>({
    modules: {
      UserStoreModule,
      GlobalStoreModule,
      AuthStoreModule,
      RolStoreModule,
      CategoryStoreModule,
      SubcategoryStoreModule,
      ProductStoreModule
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
    plugins: [vuexLocal.plugin]

  });

  return Store;
});
