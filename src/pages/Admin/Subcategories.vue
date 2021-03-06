<template>
  <div id="Subcategories">
    <Delete
      :headers="headers"
      v-model="dialogDelete"
      :item="subcategoriesStore.selectedSubcategory"
      @onConfirm="onConfirmDelete"
    />
    <Table
      :headers="headers"
      :loading="subcategoriesStore.loader"
      :data="subcategoriesStore.subcategoriesTable"
      title="titles.subcategories"
      :hasAccessToWrite="authStore.accessSubcategories=='2'"
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
      <FormSubcategories v-model="dialog"/>
    </Table>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Table from "components/TableCard.vue";
import Delete from "components/Delete.vue";
import FormSubcategories from "components/Admin/FormSubcategories.vue";
import {getModule} from "vuex-module-decorators";
import {ISubcategory} from "src/models/subcategory";
import {generateExcel} from "src/helpers/helpers";
import {SubcategoryStoreModule} from "src/store/modules/Subcategory.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";

@Component({
  components: {
    Table,
    FormSubcategories,
    Delete
  }
})
export default class Subcategories extends Vue {
  subcategoriesStore = getModule(SubcategoryStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  dialog = false;
  dialogDelete = false;
  dialogPhoto = false;
  model: ISubcategory = {};

  headers = [
    {
      name: "id",
      label: "headers.subcategories.no",
      sortable: true,
      required: true,
      align: "center",
      field: "id"
    },
    {
      name: "name",
      label: "headers.subcategories.name",
      sortable: true,
      required: true,
      align: "center",
      field: "name"
    },

    {
      name: "category",
      label: "headers.subcategories.category",
      sortable: true,
      required: true,
      align: "center",
      field: "category"
    },
    {
      name: "options",
      label: "headers.subcategories.options",
      sortable: false,
      required: false,
      align: "center",
      field: "options"
    }
  ];

  getReports() {
    generateExcel(this.subcategoriesStore.excel, 'usuarios')
  }


  onUpdate(item: any) {
    this.subcategoriesStore.context.commit("SET", item);
    this.dialog = true;
  }

  onPhoto(item: any) {
    this.subcategoriesStore.context.commit("SET", item);
    this.dialogPhoto = true;
  }

  onDelete(item: any) {
    this.dialogDelete = true;
    this.subcategoriesStore.context.commit("SET", item);
  }

  @Watch("dialogDelete")
  onDialogDelete(status: any, newStatus: boolean) {
    if (!status) {
      this.subcategoriesStore.context.commit("SET");
    }
  }

  @Watch("dialogPhoto")
  onDialogPhoto(status: any, newStatus: boolean) {
    console.log(status);

    if (!status) {
      this.subcategoriesStore.context.commit("SET");
    }
  }

  @Watch("dialog")
  onDialog(status: any, newStatus: boolean) {
    if (!status) {
      this.subcategoriesStore.context.commit("SET");
    }
  }

  async onConfirmDelete() {
    await this.subcategoriesStore.delete(this.subcategoriesStore.selectedSubcategory);
    this.dialogDelete = false;
  }

  async created() {
    await this.subcategoriesStore.getAll();
  }
}
</script>

<style lang="scss" scope></style>
