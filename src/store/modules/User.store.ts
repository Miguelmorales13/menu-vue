import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { oflineItems } from "src/helpers/helpers";
import { IUser } from "src/models/user";

@Module({
	name: "UserStoreModule",
	namespaced: true
})
export class UserStoreModule extends VuexModule {
	public selectedUser: IUser = {};
	public users: IUser[] = [];
	public loader: boolean = false;

	@Mutation
	LIST(users: IUser[]) {
		this.users = [...users];
	}
	@Mutation
	ADD(user: IUser) {
		this.users = [...this.users, user];
	}
	@Mutation
	LOADER(loader: boolean) {
		this.loader = loader;
	}
	@Mutation
	UPDATE(user: IUser) {
		const newUsers = this.users.filter(s => s.id !== user.id);
		this.users = [...newUsers, user];
	}
	@Mutation
	REMOVE(user: IUser) {
		this.users = this.users.filter(s => s.id !== user.id);
	}
	@Mutation
	SET(user?: IUser) {
		// @ts-ignore
		this.selectedUser = Object.assign(
			{},
			user ? { ...user } : { address: {}, codes: [{}] }
		);
	}
	@Action
	async getAll() {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get("users");
				this.context.commit("LIST", res);
			}
		} finally {
			this.context.commit("SET");
			this.context.commit("LOADER", false);
		}
	}
	@Action
	async create(item: IUser) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.post("users", item);
				this.context.commit("ADD", res);
			} else {
				oflineItems(`users`, "post", item);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}
	@Action
	async update(item: IUser) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.put(
					`users/${item.id}`,
					item
				);
				this.context.commit("UPDATE", res);
			} else {
				oflineItems(`users/${item.id}`, "put", item);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}
	@Action
	async delete(item: IUser) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.delete(
					`users/${item.id}`
				);
				this.context.commit("REMOVE", item);
			} else {
				oflineItems(`users/${item.id}`, "delete", null);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}
	get usersTable() {
		return this.users.map(user => ({ ...user, rol: user.rol.name }));
	}
	get excel() {
		return this.users.map(user => ({
			id: user.id,
			nombre: user.name,
			"Fecha de creacion": user.createdAt,
			"Estatus": user.active ? 'Activo' : 'Inactivo',
		}));
	}
}
