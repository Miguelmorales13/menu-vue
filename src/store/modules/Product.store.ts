import Vue from "vue";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {generateFormDataAny, oflineItems} from "src/helpers/helpers";
import {IProduct} from "src/models/product";

@Module({
  name: "ProductStoreModule",
  namespaced: true
})
export class ProductStoreModule extends VuexModule {
  public selectedProduct: IProduct = {};
  public products: IProduct[] = [];
  public loader: boolean = false;

  @Mutation
  LIST(products: IProduct[]) {
    this.products = [...products];
  }

  @Mutation
  ADD(product: IProduct) {
    this.products = [...this.products, product];
  }

  @Mutation
  LOADER(loader: boolean) {
    this.loader = loader;
  }

  @Mutation
  UPDATE(product: IProduct) {
    const newProducts = this.products.filter(s => s.id !== product.id);
    this.products = [...newProducts, product];
  }

  @Mutation
  REMOVE(product: IProduct) {
    this.products = this.products.filter(s => s.id !== product.id);
  }

  @Mutation
  SET(product?: IProduct) {
    // @ts-ignore
    this.selectedProduct = Object.assign(
      {},
      product ? {...product} : {images: []}
    );
  }

  @Action
  async getAll() {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.get("products");
        this.context.commit("LIST", res);
      }
    } finally {
      this.context.commit("SET");
      this.context.commit("LOADER", false);
    }
  }

  @Action
  async create(item: IProduct) {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.post("products", await generateFormDataAny(item));
        this.context.commit("ADD", res);
      } else {
        oflineItems(`products`, "post", item);
      }
      this.context.commit("SET");
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  @Action
  async update(item: IProduct) {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.put(
          `products/${item.id}`,
          await generateFormDataAny(item)
        );
        this.context.commit("UPDATE", res);
      } else {
        oflineItems(`products/${item.id}`, "put", await generateFormDataAny(item));
      }
      this.context.commit("SET");
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  @Action
  async delete(item: IProduct) {
    this.context.commit("LOADER", true);
    try {
      if (navigator.onLine) {
        const res = await Vue.prototype.$axios.delete(
          `products/${item.id}`
        );
        this.context.commit("REMOVE", item);
      } else {
        oflineItems(`products/${item.id}`, "delete", null);
      }
      this.context.commit("SET");
    } finally {
      this.context.commit("LOADER", false);
    }
  }

  get productsTable() {
    return this.products.map(product => ({...product, category: product?.category?.name}));
  }

  get excel() {
    return this.products.map(product => ({
      id: product.id,
      nombre: product.name,
      "Fecha de creacion": product.createdAt,
      "Estatus": product.active ? 'Activo' : 'Inactivo',
    }));
  }
}
