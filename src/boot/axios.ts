import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {boot} from "quasar/wrappers";
import {URL_SERVER} from "src/helpers/configs";
import {NotifyPersonal} from "src/helpers/messages";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {GlobalStoreModule} from "src/store/modules/Global.store";
import {getModule} from "vuex-module-decorators";

declare module "vue/types/vue" {
	interface Vue {
		$axios: AxiosInstance;
	}
}
export default boot(({Vue, store, router}) => {
	let newAxios = axios.create({
		baseURL: URL_SERVER,
	});
	let authStore = getModule(AuthStoreModule, store);
	let globalStore = getModule(GlobalStoreModule, store);
	const axiosRequest = (request: AxiosRequestConfig) => {
		request.headers["Authorization"] = `Bearer ${authStore.token}`;
		request.headers["Accept-Language"] = `${globalStore.lang.split('-')[0]}`;
		return request;
	};
	const axiosResponse = function (response: AxiosResponse) {
		// console.log(response);
    console.log(response)
		if (response && response.data && response.data.message && response.data.message != "" && response.config.method != "get") {
			NotifyPersonal("Success", response.data.message, false);
		}

		return response.data.data || response.data || response;
	};
	const axiosError = function (error: AxiosError) {
		if (error && error.response && error.response.data) {
			if (error.response.data.code == 401 && authStore.isAuth) {
				authStore.logout();
				router?.push("/");

			}
			NotifyPersonal("Error", error.response.data.message, false);
			return Promise.reject(error.response.data);
		} else {
			NotifyPersonal("Error", "messages.error.internal_server");
			return Promise.reject(error);
		}
	};
	newAxios.interceptors.request.use(axiosRequest);
	newAxios.interceptors.response.use(axiosResponse, axiosError);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	Vue.prototype.$axios = newAxios;
});
