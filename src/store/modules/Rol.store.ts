import Vue from "vue";
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {IRol, IRolToSend} from "src/models/rol";
import {oflineItems} from "src/helpers/helpers";

@Module({
	name: "RolStoreModule",
	namespaced: true
})
export class RolStoreModule extends VuexModule {
	public selectedRol: IRol = {access: []};
	public roles: IRol[] = [];
	public loader: boolean = false;

	@Mutation
	LIST(roles: IRol[]) {
		this.roles = [...roles];
	}

	@Mutation
	ADD(rol: IRol) {
		this.roles = [...this.roles, rol];
	}

	@Mutation
	LOADER(loader: boolean) {
		this.loader = loader;
	}

	@Mutation
	UPDATE(rol: IRol) {
		const newRoles = this.roles.filter(s => s.id !== rol.id);
		this.roles = [...newRoles, rol];
	}

	@Mutation
	REMOVE(rol: IRol) {
		this.roles = this.roles.filter(s => s.id !== rol.id);
	}

	@Mutation
	SET(rol?: IRol) {
		// @ts-ignore
		this.selectedRol = Object.assign({}, rol ? {...rol} : {access: []});
	}

	@Action
	async getAll() {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get(
					`roles`
				);
				this.context.commit("LIST", res);
			}
		} finally {
			this.context.commit("SET");
			this.context.commit("LOADER", false);
		}
	}

	@Action
	async getById(item: IRol) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.get(
					`roles/${item.id}`
				);
				this.context.commit("SET", res);
			}
		} finally {
			this.context.commit("LOADER", false);
		}
	}

	@Action
	async create(item: IRolToSend) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.post(
					"roles",
					item
				);
				this.context.commit("ADD", res);
			} else {
				oflineItems(`roles`, "post", item);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}

	@Action
	async update(item: IRolToSend) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.put(
					`roles/${item.id}`,
					item
				);
				this.context.commit("UPDATE", res);
			} else {
				oflineItems(`roles/${item.id}`, "put", item);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}

	@Action
	async delete(item: IRol) {
		this.context.commit("LOADER", true);
		try {
			if (navigator.onLine) {
				const res = await Vue.prototype.$axios.delete(
					`roles/${item.id}`
				);
				this.context.commit("REMOVE", item);
			} else {
				oflineItems(`roles/${item.id}`, "delete", null);
			}
			this.context.commit("SET");
		} finally {
			this.context.commit("LOADER", false);
		}
	}

	get excel() {
		return this.roles.map(rol => ({
			id: rol.id,
			nombre: rol.name,
			"Fecha de creacion": rol.createdAt,
			"Estatus": rol.active ? 'Activo' : 'Inactivo',
		}));
	}
}
