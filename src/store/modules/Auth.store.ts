import {AccessesEnum} from "src/helpers/helpers";
import Vue from "vue";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {ILogin, IRecoveryPassword} from "src/models/login";
import {IUser} from "src/models/user";
import {IChangePassword} from "src/models/ChangePassword";

@Module({
  name: "AuthStoreModule",
  namespaced: true
})
export class AuthStoreModule extends VuexModule {
  public token: string = "";
  public loader: boolean = false;
  public userLogged: IUser = {};

  @Mutation
  LOGIN(token: string) {
    this.token = token;
  }

  @Mutation
  LOGOUT() {
    this.token = "";
  }

  @Mutation
  LOADER(loader: boolean) {
    this.loader = loader;
  }

  @Mutation
  SET(user: IUser) {
    this.userLogged = user;
  }

  @Action({rawError: true})
  async login(auth: ILogin) {
    this.context.commit("LOADER", true);
    console.log('hola')
    try {
      const res = await Vue.prototype.$axios.post("auth/sign-in", auth);
      if (res && res.token) {
        this.context.commit("LOGIN", res.token);
        this.context.commit("SET", res.user);
      }
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  @Action
  async forgotPassword(auth: IRecoveryPassword) {
    this.context.commit("LOADER", true);
    try {
      const res = await Vue.prototype.$axios.post(
        "auth/recovery-password",
        auth
      );
    } finally {
      this.context.commit("LOADER");
    }
  }

  @Action
  async changePassword(auth: IChangePassword) {
    this.context.commit("LOADER", true);
    try {
      const res = await Vue.prototype.$axios.post("auth/change-password", auth);
    } finally {
      this.context.commit("LOADER");
    }
  }

  @Action
  async setProfile(auth: any) {
    this.context.commit("LOADER", true);
    try {
      const res = await Vue.prototype.$axios.put("auth/profile", auth);
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  @Action
  logout() {
    this.context.commit("LOGOUT");
    this.context.commit("SET", {});
  }

  get isAuth() {
    return this.token != "";
  }

  get modulesRol(): any[] {
    return this.userLogged?.rol?.access ?? [];
  }

  get accessUsers(): string {
    let modules = this.userLogged?.rol?.access ?? [];
    return (
      modules.find(
        (a: any) => a.AccessRolUser.accessId == AccessesEnum.users
      )?.AccessRolUser?.permission ?? "0"
    );
  }

  get accessCategories(): string {
    let modules = this.userLogged?.rol?.access ?? [];
    return (
      modules.find(
        (a: any) => a.AccessRolUser.accessId == AccessesEnum.categories
      )?.AccessRolUser?.permission ?? "0"
    );
  }

  get accessSubcategories(): string {
    let modules = this.userLogged?.rol?.access ?? [];
    return (
      modules.find(
        (a: any) => a.AccessRolUser.accessId == AccessesEnum.subcategories
      )?.AccessRolUser?.permission ?? "0"
    );
  }

  get accessProducts(): string {
    let modules = this.userLogged?.rol?.access ?? [];
    return (
      modules.find(
        (a: any) => a.AccessRolUser.accessId == AccessesEnum.products
      )?.AccessRolUser?.permission ?? "0"
    );
  }

  get accessRoles() {
    let modules = this.userLogged?.rol?.access ?? [];
    console.log(modules.find((a: any) => a.AccessRolUser.accessId == AccessesEnum.roles))
    return (
      modules.find(
        (a: any) => a.AccessRolUser.accessId == AccessesEnum.roles
      )?.AccessRolUser?.permission ?? "0"
    );
  }


  get userPhoto() {
    if (!this.token) return "";
    return this.userLogged ? this.userLogged.photo : "";
  }

  get userEmail() {
    if (!this.token) return "";
    return this.userLogged ? this.userLogged.email : "";
  }

  get userName() {
    if (!this.token) return "";
    return this.userLogged ? this.userLogged.name : "";
  }
}
