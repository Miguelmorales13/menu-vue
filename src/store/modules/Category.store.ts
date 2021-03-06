import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { generateFormDataAny, oflineItems} from "src/helpers/helpers";
import { ICategory } from "src/models/category";

@Module({
	name: "CategoryStoreModule",
	namespaced: true
})
export class CategoryStoreModule extends VuexModule {
	public selectedCategory: ICategory = {};
	public categories: ICategory[] = [];
	public loader: boolean = false;

	@Mutation
	LIST(categories: ICategory[]) {
		this.categories = [...categories];
	}
	@Mutation
	ADD(category: ICategory) {
		this.categories = [...this.categories, category];
	}
	@Mutation
	LOADER(loader: boolean) {
		this.loader = loader;
	}
	@Mutation
	UPDATE(category: ICategory) {
		const newCategories = this.categories.filter(s => s.id !== category.id);
		this.categories = [...newCategories, category];
	}
	@Mutation
	REMOVE(category: ICategory) {
		this.categories = this.categories.filter(s => s.id !== category.id);
	}
	@Mutation
	SET(category?: ICategory) {
		// @ts-ignore
		this.selectedCategory = Object.assign(
			{},
			category ? { ...category } : {  }
		);
	}
	@Action
	async getAll() {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get("categories");
				this.context.commit("LIST", res);
			}
		} finally {
			this.context.commit("SET");
			this.context.commit("LOADER", false);
		}
	}
	@Action
	async create(item: ICategory) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.post("categories", await generateFormDataAny(item) );
				this.context.commit("ADD", res);
			} else {
				oflineItems(`categories`, "post", item);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}
	@Action
	async update(item: ICategory) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.put(
					`categories/${item.id}`,
					await generateFormDataAny(item)
				);
				this.context.commit("UPDATE", res);
			} else {
				oflineItems(`categories/${item.id}`, "put", item);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}
	@Action
	async delete(item: ICategory) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.delete(
					`categories/${item.id}`
				);
				this.context.commit("REMOVE", item);
			} else {
				oflineItems(`categories/${item.id}`, "delete", null);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}
	get categoriesTable() {
		return this.categories
	}
	get excel() {
		return this.categories.map(category => ({
			id: category.id,
			nombre: category.name,
			"Fecha de creacion": category.createdAt,
			"Estatus": category.active ? 'Activo' : 'Inactivo',
		}));
	}
}
