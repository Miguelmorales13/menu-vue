<template>
  <div id="Products">
    <Delete
      :headers="headers"
      v-model="dialogDelete"
      :item="productsStore.selectedProduct"
      @onConfirm="onConfirmDelete"
    />
    <Table
      :headers="headers"
      :loading="productsStore.loader"
      :data="productsStore.productsTable"
      title="titles.products"
      :hasAccessToWrite="authStore.accessProducts=='2'"
    >
      <template v-slot:normal="{item}">
        <q-btn icon="edit" size="sm" dense color="warning" @click="onAction(ActionEnum.Update,item)"/>&nbsp;
        <q-btn icon="delete" size="sm" dense color="red" @click="onAction(ActionEnum.Delete,item)"/>
      </template>
      <template v-slot:card="{item}">
        <q-btn class="q-my-xs" size="sm" dense color="warning" @click="onAction(ActionEnum.Update,item)">
          <q-icon name="edit"/>
          {{ $t("tables.edit") }}
        </q-btn>
        <q-btn size="sm" class="q-my-xs" dense color="red" @click=" onAction(ActionEnum.Delete,item) ">
          <q-icon name="delete"/>
          {{ $t("tables.delete") }}
        </q-btn>
      </template>

      <!--			<q-btn dense fab color="green" icon="arrow_circle_down" class="float-left" @click="getReports"></q-btn>-->
      <FormProducts v-model="dialog"/>
    </Table>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import Table from "components/TableCard.vue";
import Delete from "components/Delete.vue";
import FormProducts from "components/Admin/FormProducts.vue";
import {getModule} from "vuex-module-decorators";
import {IProduct} from "src/models/product";
import {generateExcel} from "src/helpers/helpers";
import {ProductStoreModule} from "src/store/modules/Product.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {actionEnum, actionType} from "components/models";


@Component({
  components: {
    Table,
    FormProducts,
    Delete
  }
})
export default class Products extends Vue {
  productsStore = getModule(ProductStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  ActionEnum = actionEnum
  dialog = false;
  dialogDelete = false;
  dialogPhoto = false;
  model: IProduct = {};

  headers = [
    {
      name: "id",
      label: "headers.products.no",
      sortable: true,
      required: true,
      align: "center",
      field: "id"
    },
    {
      name: "name",
      label: "headers.products.name",
      sortable: true,
      required: true,
      align: "center",
      field: "name"
    },
    {
      name: "category",
      label: "headers.products.category",
      sortable: true,
      required: true,
      align: "center",
      field: 'category'
    },
    {
      name: "options",
      label: "headers.products.options",
      sortable: false,
      required: false,
      align: "center",
      field: "options"
    }
  ];

  getReports() {
    generateExcel(this.productsStore.excel, 'usuarios')
  }

  onAction(typo: actionType, item: any) {
    console.log(typo)
    this.productsStore.context.commit("SET", item);
    switch (typo) {
      case actionEnum.Update:
      case actionEnum.Add:
        this.dialog = true;
        break;
      case actionEnum.Delete:
        this.dialogDelete = true;
        break;
      case actionEnum.Show:
        break;
      case actionEnum.Images:
        this.dialogPhoto = true;
        break;
      default:
        break;
    }
  }


  @Watch("dialogDelete")
  onDialogDelete(status: any, newStatus: boolean) {
    if (!status) {
      this.productsStore.context.commit("SET");
    }
  }

  @Watch("dialogPhoto")
  onDialogPhoto(status: any, newStatus: boolean) {
    if (!status) {
      this.productsStore.context.commit("SET");
    }
  }

  @Watch("dialog")
  onDialog(status: any, newStatus: boolean) {
    if (!status) {
      this.productsStore.context.commit("SET");
    }
  }

  async onConfirmDelete() {
    await this.productsStore.delete(this.productsStore.selectedProduct);
    this.dialogDelete = false;
  }

  async created() {
    await this.productsStore.getAll();
  }
}
</script>

<style lang="scss" scope></style>
