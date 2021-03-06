<template>
  <Modal
    :btnTitle="''"
    :title="category.id ? 'titles.updated' : 'titles.creation'"
    @onConfirm="onSubmit"
    v-model="dialog"
    @onCancel="onCancel"
    :loader="categoriesStore.loader"
    :hasBtn="authStore.accessCategories=='2'"
    :btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add'}"
  >
    <FormFlex
      :fields="fields"
      :loader="categoriesStore.loader"
      :model="category"
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
import {ICategory} from "src/models/category";
import {ValidationsForm} from "src/helpers/validations";
import {RolStoreModule} from "src/store/modules/Rol.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {CategoryStoreModule} from "src/store/modules/Category.store";


@Component({
  components: {
    FormFlex,
    Modal
  }
})
export default class FormCategories extends Vue {
  @Prop({type: Boolean, required: true}) value!: boolean;
  dialog = false;
  formValid: boolean = false;
  categoriesStore = getModule(CategoryStoreModule, this.$store);
  rolesState = getModule(RolStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  category: ICategory = {};

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
    this.category = Object.assign({}, this.categoriesStore.selectedCategory);
  }

  @Watch("categoriesStore.selectedCategory")
  onSelectedCategory(status: any, newStatus: ICategory) {
    this.category = Object.assign({}, status);
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
    }
    if (this.category.id) {
      const res = await this.categoriesStore.update({...this.category,});
      this.onCancel();
    } else {
      const res = await this.categoriesStore.create({...this.category,});
      this.onCancel();
    }
  }

  fields: any = [];

  async created() {
    await this.rolesState.getAll();
    this.generateOptions(this.rolesState.roles);
  }

  generateOptions(options: any[]) {
    console.log(options)
    this.fields = [
      {
        type: "text",
        label: "forms.categories.name",
        key: "name",
        field: {class: "col-12 col-sm-12 q-px-sm q-py-sm"},
        props: {},
        rules: [...ValidationsForm.reqAndTree]
      },


      {
        type: "text",
        label: "forms.categories.description",
        key: "description",
        field: {
          class: "col-12 col-sm-12 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      },
      {
        type: "photo_personal",
        label: "forms.users.photo",
        key: "photo",
        field: {
          class: "col-12 col-sm-12 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      },
    ];
  }
}
</script>

<style lang="scss" scope></style>
