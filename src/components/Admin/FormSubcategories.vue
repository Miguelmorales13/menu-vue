<template>
  <Modal
    :btnTitle="''"
    :title="subcategory.id ? 'titles.updated' : 'titles.creation'"
    @onConfirm="onSubmit"
    v-model="dialog"
    @onCancel="onCancel"
    :loader="subcategoryStore.loader"
    :hasBtn="authStore.accessSubcategories=='2'"
    :btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add'}"
  >
    <FormFlex
      :fields="fields"
      :loader="subcategoryStore.loader"
      :model="subcategory"
      @onValidation="formValid = $event"
      @onSubmit="onSubmit"
    />
  </Modal>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";
import FormFlex from "components/FormFlex.vue";
import Modal from "components/Modal.vue";
import {getModule} from "vuex-module-decorators";
import {ISubcategory} from "src/models/subcategory";
import {ValidationsForm} from "src/helpers/validations";
import {CategoryStoreModule} from "src/store/modules/Category.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {SubcategoryStoreModule} from "src/store/modules/Subcategory.store";


@Component({
  components: {
    FormFlex,
    Modal
  }
})
export default class FormSubcategories extends Vue {
  @Prop({type: Boolean, required: true}) value!: boolean;
  dialog = false;
  formValid: boolean = false;
  subcategoryStore = getModule(SubcategoryStoreModule, this.$store);
  categoriesState = getModule(CategoryStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  subcategory: ISubcategory = {};

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
    this.subcategory = Object.assign({}, this.subcategoryStore.selectedSubcategory);
  }

  @Watch("subcategoryStore.selectedSubcategory")
  onSelectedSubcategory(status: any, newStatus: ISubcategory) {
    this.subcategory = Object.assign({}, status);
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
    }
    if (this.subcategory.id) {
      const res = await this.subcategoryStore.update({...this.subcategory,});
      this.onCancel();
    } else {
      const res = await this.subcategoryStore.create({...this.subcategory,});
      this.onCancel();
    }
  }

  fields: any = [];

  async created() {
    await this.categoriesState.getAll();
    this.generateOptions(this.categoriesState.categories);
  }

  generateOptions(options: any[]) {
    console.log(options)
    this.fields = [
      {
        type: "text",
        label: "forms.subcategories.name",
        key: "name",
        field: {class: "col-12 col-sm-6 q-px-sm q-py-sm"},
        props: {},
        rules: [...ValidationsForm.reqAndTree]
      }, {
        type: "photo_personal",
        label: "forms.subcategories.photo",
        key: "photo",
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      },


      {
        type: "text",
        label: "forms.subcategories.description",
        key: "description",
        field: {
          class: "col-12 col-sm-12 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      },
      {
        type: "select",
        label: "forms.subcategories.category",
        key: "categoryId",
        keyLabel: "id",
        nameLabel: "name",
        options,
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      }
    ];
  }
}
</script>

<style lang="scss" scope></style>
