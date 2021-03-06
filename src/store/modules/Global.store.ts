import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import Vue from "vue";
import {LanguagesActives, setLanguage} from "src/boot/i18n";
import {IModule} from "src/models/module";

@Module({
    name: "GlobalStoreModule",
    namespaced: true
})
export class GlobalStoreModule extends VuexModule {
    public lang: LanguagesActives = navigator.language.toLowerCase() as LanguagesActives ?? 'es-mx';
    public color: string = "primary";
    public icon: string = "logo.png";
    public dark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
    public loader: boolean = false;
    public accesses: IModule[] = [{access: []}];

    @Mutation
    SET_COLOR(color: string) {
        this.color = color;
    }

    @Mutation
    SET_ICON(url: string) {
        this.icon = url;
    }

    @Mutation
    LOADER(loader: boolean) {
        this.loader = loader;
    }

    @Mutation
    SET_MODULES(modules: IModule[]) {
        this.accesses = modules;
    }

    @Mutation
    SET_DARK_MODE() {
        this.dark = !this.dark;
    }

    @Mutation
    SET_LANG(lang: LanguagesActives) {
        this.lang = lang;
    }

    @Action
    public setLanguage(lang: LanguagesActives) {
        this.context.commit("SET_LANG", lang);
        setLanguage(lang);
    }

    @Action
    async getModules(type?: string) {
        this.context.commit("LOADER", true);
        try {
            if (navigator.onLine) {
                const res = await Vue.prototype.$axios.get(`modules`);
                this.context.commit("SET_MODULES", res);
            }
        } finally {
            this.context.commit("LOADER", false);
        }
    }
}
