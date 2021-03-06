<template>
	<div id="Users">
		<Delete
			:headers="headers"
			v-model="dialogDelete"
			:item="usersStore.selectedUser"
			@onConfirm="onConfirmDelete"
		/>
		<Table
			:headers="headers"
			:loading="usersStore.loader"
			:data="usersStore.usersTable"
			title="titles.users"
			:hasAccessToWrite="authStore.accessUsers=='2'"
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
<!--			<q-btn dense fab color="green" icon="arrow_circle_down" class="float-left" @click="getReports"></q-btn>-->
			<FormUsers v-model="dialog"/>
		</Table>
	</div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Table from "components/Table.vue";
import Delete from "components/Delete.vue";
import FormUsers from "components/Admin/FormUsers.vue";
import {getModule} from "vuex-module-decorators";
import {IUser} from "src/models/user";
import {generateExcel} from "src/helpers/helpers";
import {UserStoreModule} from "src/store/modules/User.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";

@Component({
	components: {
		Table,
		FormUsers,
		Delete
	}
})
export default class Users extends Vue {
	usersStore = getModule(UserStoreModule, this.$store);
	authStore = getModule(AuthStoreModule, this.$store);
	dialog = false;
	dialogDelete = false;
	dialogPhoto = false;
	model: IUser = {};

	headers = [
		{
			name: "id",
			label: "headers.users.no",
			sortable: true,
			required: true,
			align: "center",
			field: "id"
		},
		{
			name: "name",
			label: "headers.users.name",
			sortable: true,
			required: true,
			align: "center",
			field: "name"
		},
		{
			name: "last_name",
			label: "headers.users.last_name",
			sortable: true,
			required: true,
			align: "center",
			field: "lastName"
		},

		{
			name: "email",
			label: "headers.users.email",
			sortable: true,
			required: true,
			align: "center",
			field: "email"
		},
		{
			name: "active",
			label: "headers.users.status",
			sortable: true,
			required: true,
			align: "center",
			field: "active"
		},
		{
			name: "rol",
			label: "headers.users.rol",
			sortable: true,
			required: true,
			align: "center",
			field: "rol"
		},
		{
			name: "options",
			label: "headers.users.options",
			sortable: false,
			required: false,
			align: "center",
			field: "options"
		}
	];

	getReports() {
		generateExcel(this.usersStore.excel, 'usuarios')
	}


	onUpdate(item: any) {
		this.usersStore.context.commit("SET", item);
		this.dialog = true;
	}

	onPhoto(item: any) {
		this.usersStore.context.commit("SET", item);
		this.dialogPhoto = true;
	}

	onDelete(item: any) {
		this.dialogDelete = true;
		this.usersStore.context.commit("SET", item);
	}

	@Watch("dialogDelete")
	onDialogDelete(status: any, newStatus: boolean) {
		if (!status) {
			this.usersStore.context.commit("SET");
		}
	}

	@Watch("dialogPhoto")
	onDialogPhoto(status: any, newStatus: boolean) {
		console.log(status);

		if (!status) {
			this.usersStore.context.commit("SET");
		}
	}

	@Watch("dialog")
	onDialog(status: any, newStatus: boolean) {
		if (!status) {
			this.usersStore.context.commit("SET");
		}
	}

	async onConfirmDelete() {
		await this.usersStore.delete(this.usersStore.selectedUser);
		this.dialogDelete = false;
	}

	async created() {
		await this.usersStore.getAll();
	}
}
</script>

<style lang="scss" scope></style>
