<template>
  <div id="Categories">
    <Delete
      :headers="headers"
      v-model="dialogDelete"
      :item="categoriesStore.selectedCategory"
      @onConfirm="onConfirmDelete"
    />
    <Table
      :headers="headers"
      :loading="categoriesStore.loader"
      :data="categoriesStore.categoriesTable"
      title="titles.categories"
      :hasAccessToWrite="authStore.accessCategories=='2'"
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
      <FormCategories v-model="dialog"/>
    </Table>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Table from "components/TableCard.vue";
import Delete from "components/Delete.vue";
import FormCategories from "components/Admin/FormCategories.vue";
import {getModule} from "vuex-module-decorators";
import {ICategory} from "src/models/category";
import {generateExcel} from "src/helpers/helpers";
import {CategoryStoreModule} from "src/store/modules/Category.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";

@Component({
  components: {
    Table,
    FormCategories,
    Delete
  }
})
export default class Categories extends Vue {
  categoriesStore = getModule(CategoryStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  dialog = false;
  dialogDelete = false;
  dialogPhoto = false;
  model: ICategory = {};

  headers = [
    {
      name: "id",
      label: "headers.categories.no",
      sortable: true,
      required: true,
      align: "center",
      field: "id"
    },
    {
      name: "name",
      label: "headers.categories.name",
      sortable: true,
      required: true,
      align: "center",
      field: "name"
    },
    {
      name: "options",
      label: "headers.categories.options",
      sortable: false,
      required: false,
      align: "center",
      field: "options"
    }
  ];

  getReports() {
    generateExcel(this.categoriesStore.excel, 'usuarios')
  }


  onUpdate(item: any) {
    this.categoriesStore.context.commit("SET", item);
    this.dialog = true;
  }

  onPhoto(item: any) {
    this.categoriesStore.context.commit("SET", item);
    this.dialogPhoto = true;
  }

  onDelete(item: any) {
    this.dialogDelete = true;
    this.categoriesStore.context.commit("SET", item);
  }

  @Watch("dialogDelete")
  onDialogDelete(status: any, newStatus: boolean) {
    if (!status) {
      this.categoriesStore.context.commit("SET");
    }
  }

  @Watch("dialogPhoto")
  onDialogPhoto(status: any, newStatus: boolean) {
    console.log(status);

    if (!status) {
      this.categoriesStore.context.commit("SET");
    }
  }

  @Watch("dialog")
  onDialog(status: any, newStatus: boolean) {
    if (!status) {
      this.categoriesStore.context.commit("SET");
    }
  }

  async onConfirmDelete() {
    await this.categoriesStore.delete(this.categoriesStore.selectedCategory);
    this.dialogDelete = false;
  }

  async created() {
    await this.categoriesStore.getAll();
  }
}
</script>

<style lang="scss" scope></style>
