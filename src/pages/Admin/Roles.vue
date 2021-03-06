<template>
	<div id="Roles">
		<Delete
			:headers="headers"
			v-model="dialogDelete"
			:item="rolesStore.selectedRol"
			@onConfirm="onConfirmDelete"
		/>

		<Table
			:headers="headers"
			:loading="rolesStore.loader"
			:data="rolesStore.roles"
			title="titles.roles"
			:hasAccessToWrite="authStore.accessRoles=='2'"
		>
      <template v-slot:normal="{item}">
					<q-btn icon="edit" size="sm" dense color="warning" @click="onUpdate(item)"/>&nbsp;
					<q-btn icon="delete" size="sm" dense color="red" @click="onDelete(item)"/>
      </template>
      <template v-slot:card="{item}">
						<q-btn class="q-my-xs" size="sm" dense color="warning" @click=" onUpdate(item) ">
												<q-icon name="edit"/>
												{{ $t("tables.edit") }}
											</q-btn>
											<q-btn size="sm" class="q-my-xs" dense color="red" @click=" onDelete(item) ">
												<q-icon name="delete"/>
												{{ $t("tables.delete") }}
											</q-btn>
      </template>
			<FormRoles  v-model="dialog"/>
		</Table>
	</div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Table from "components/Table.vue";
import Delete from "components/Delete.vue";
import FormRoles from "components/Admin/FormRoles.vue";
import {getModule} from "vuex-module-decorators";
import {RolStoreModule} from "src/store/modules/Rol.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {IRol} from "src/models/rol";

@Component({
	components: {
		Table,
		FormRoles,
		Delete
	}
})
export default class Roles extends Vue {
	rolesStore = getModule(RolStoreModule, this.$store);
	authStore = getModule(AuthStoreModule, this.$store);

	dialog = false;
	dialogDelete = false;
	model: IRol = {access: []};
	headers = [
		{
			name: "id",
			label: "headers.roles.no",
			sortable: true,
			required: true,
			align: "center",
			field: "id"
		},
		{
			name: "name",
			label: "headers.roles.name",
			sortable: true,
			required: true,
			align: "center",
			field: "name"
		},
		{
			name: "options",
			label: "headers.roles.options",
			sortable: false,
			required: false,
			align: "center",
			field: "options"
		}
	];

	onUpdate(item: any) {
		this.rolesStore.context.commit("SET", item);
		this.dialog = true;
	}

	onDelete(item: any) {
		this.dialogDelete = true;
		this.rolesStore.context.commit("SET", item);
	}

	@Watch("dialogDelete")
	onDialogDelete(status: any, newStatus: boolean) {
		if (!status) {
			this.rolesStore.context.commit("SET");
		}
	}

	@Watch("dialog")
	onDialog(status: any, newStatus: boolean) {
		if (!status) {
			this.rolesStore.context.commit("SET");
		}
	}

	async onConfirmDelete() {
		await this.rolesStore.delete(this.rolesStore.selectedRol);
		this.dialogDelete = false;
	}

	async created() {
		await this.rolesStore.getAll();
	}
}
</script>

<style lang="scss" scope></style>
