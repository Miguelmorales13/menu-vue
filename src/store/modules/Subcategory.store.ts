import Vue from "vue";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {generateFormDataAny, oflineItems} from "src/helpers/helpers";
import {ISubcategory} from "src/models/subcategory";

@Module({
  name: "SubcategoryStoreModule",
  namespaced: true
})
export class SubcategoryStoreModule extends VuexModule {
  public selectedSubcategory: ISubcategory = {};
  public subcategories: ISubcategory[] = [];
  public loader: boolean = false;

  @Mutation
  LIST(subcategories: ISubcategory[]) {
    this.subcategories = [...subcategories];
  }

  @Mutation
  ADD(subcategory: ISubcategory) {
    this.subcategories = [...this.subcategories, subcategory];
  }

  @Mutation
  LOADER(loader: boolean) {
    this.loader = loader;
  }

  @Mutation
  UPDATE(subcategory: ISubcategory) {
    const newCategories = this.subcategories.filter(s => s.id !== subcategory.id);
    this.subcategories = [...newCategories, subcategory];
  }

  @Mutation
  REMOVE(subcategory: ISubcategory) {
    this.subcategories = this.subcategories.filter(s => s.id !== subcategory.id);
  }

  @Mutation
  SET(subcategory?: ISubcategory) {
    // @ts-ignore
    this.selectedSubcategory = Object.assign(
      {},
      subcategory ? {...subcategory} : {}
    );
  }

  @Action
  async getAll() {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.get("subcategories");
        this.context.commit("LIST", res);
      }
    } finally {
      this.context.commit("SET");
      this.context.commit("LOADER", false);
    }
  }

  @Action
  async create(item: ISubcategory) {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.post("subcategories", await generateFormDataAny(item));
        this.context.commit("ADD", res);
      } else {
        oflineItems(`subcategories`, "post", item);
      }
      this.context.commit("SET");
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  @Action
  async update(item: ISubcategory) {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.put(
          `subcategories/${item.id}`,
          await generateFormDataAny(item)
        );
        this.context.commit("UPDATE", res);
      } else {
        oflineItems(`subcategories/${item.id}`, "put", await generateFormDataAny(item));
      }
      this.context.commit("SET");
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  @Action
  async delete(item: ISubcategory) {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.delete(
          `subcategories/${item.id}`
        );
        this.context.commit("REMOVE", item);
      } else {
        oflineItems(`subcategories/${item.id}`, "delete", null);
      }
      this.context.commit("SET");
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  get subcategoriesTable() {
    return this.subcategories.map(subcategory => ({...subcategory, category: subcategory.category.name}));
  }

  get excel() {
    return this.subcategories.map(subcategory => ({
      id: subcategory.id,
      nombre: subcategory.name,
      "Fecha de creacion": subcategory.createdAt,
      "Estatus": subcategory.active ? 'Activo' : 'Inactivo',
    }));
  }
}
