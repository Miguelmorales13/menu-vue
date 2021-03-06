<template>
  <Modal
    :btnTitle="''"
    :title="product.id ? 'titles.updated' : 'titles.creation'"
    @onConfirm="onSubmit"
    v-model="dialog"
    @onCancel="onCancel"
    :loader="productsStore.loader"
    :hasBtn="authStore.accessProducts=='2'"
    :btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add'}"
  >
    <FormFlex
      :fields="fields"
      :loader="productsStore.loader"
      :model="product"
      @onValidation="formValid = $event"
      @onSubmit="onSubmit"
    ></FormFlex>
  </Modal>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import FormFlex from "components/FormFlex.vue";
import Modal from "components/Modal.vue";
import {getModule} from "vuex-module-decorators";
import {IProduct} from "src/models/product";
import {ValidationsForm} from "src/helpers/validations";
import {SubcategoryStoreModule} from "src/store/modules/Subcategory.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {ProductStoreModule} from "src/store/modules/Product.store";
import {readImage} from "src/helpers/helpers";


@Component({
  components: {
    FormFlex,
    Modal
  }
})
export default class FormProducts extends Vue {
  @Prop({type: Boolean, required: true}) value!: boolean;
  readImage = readImage;
  dialog = false;
  formValid: boolean = false;
  productsStore = getModule(ProductStoreModule, this.$store);
  categoriesState = getModule(SubcategoryStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  product: IProduct = {images: []};
  files = []


  @Emit("input")
  async onCancel() {
    this.dialog = false;
    return false;
  }

  @Watch("value")
  onChange(state: boolean, newStatus: boolean) {
    this.dialog = state;
  }

  async mounted() {
    this.dialog = this.value;
    this.product = Object.assign({}, this.productsStore.selectedProduct);
  }

  @Watch("productsStore.selectedProduct")
  onSelectedProduct(status: any, newStatus: IProduct) {
    this.product = Object.assign({}, status);
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
    }
    if (this.product.id) {
      const res = await this.productsStore.update({...this.product,});
      this.onCancel();
    } else {
      const res = await this.productsStore.create({...this.product,});
      this.onCancel();
    }
  }

  fields: any = [];

  async created() {
    await this.categoriesState.getAll();
    this.generateOptions(this.categoriesState.subcategories);
  }

  generateOptions(options: any[]) {
    this.fields = [
      {
        type: "text",
        label: "forms.products.name",
        key: "name",
        field: {class: "col-12 col-sm-6 q-px-sm q-py-sm"},
        props: {},
        rules: [...ValidationsForm.reqAndTree]
      }, {
        type: "photo_personal",
        label: "forms.products.photo",
        key: "photo",
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      },
      {
        type: "text",
        label: "forms.products.description",
        key: "description",
        field: {
          class: "col-12 col-sm-12 q-px-sm q-py-sm"
        },
        rules: [...ValidationsForm.reqAndTree],
        props: {}
      },

      {
        type: "select",
        label: "forms.products.category",
        key: "categoryId",
        keyLabel: "id",
        nameLabel: "name",
        options,
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      }, {
        type: "text",
        label: "forms.products.price",
        key: "price",
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [],
        props: {
          type: 'number'
        }
      }
    ];
  }
}
</script>

<style lang="scss" scope></style>
