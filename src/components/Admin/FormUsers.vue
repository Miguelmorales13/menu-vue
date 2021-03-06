<template>
  <Modal
    :btnTitle="''"
    :title="user.id ? 'titles.updated' : 'titles.creation'"
    @onConfirm="onSubmit"
    v-model="dialog"
    @onCancel="onCancel"
    :loader="usersStore.loader"
    :hasBtn="authStore.accessUsers=='2'"
    :btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add'}"
  >
    <FormFlex
      :fields="fields"
      :loader="usersStore.loader"
      :model="user"
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
import {IUser} from "src/models/user";
import {ValidationsForm} from "src/helpers/validations";
import {RolStoreModule} from "src/store/modules/Rol.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {UserStoreModule} from "src/store/modules/User.store";


@Component({
  components: {
    FormFlex,
    Modal
  }
})
export default class FormUsers extends Vue {
  @Prop({type: Boolean, required: true}) value!: boolean;
  dialog = false;
  formValid: boolean = false;
  usersStore = getModule(UserStoreModule, this.$store);
  rolesState = getModule(RolStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  user: IUser = {};

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
    this.user = Object.assign({}, this.usersStore.selectedUser);
  }

  @Watch("usersStore.selectedUser")
  onSelectedUser(status: any, newStatus: IUser) {
    this.user = Object.assign({}, status);
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
    }
    if (this.user.id) {
      const res = await this.usersStore.update({...this.user,});
      this.onCancel();
    } else {
      const res = await this.usersStore.create({...this.user,});
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
        label: "forms.users.name",
        key: "name",
        field: {class: "col-12 col-sm-6 q-px-sm q-py-sm"},
        props: {},
        rules: [...ValidationsForm.reqAndTree]
      },
      {
        type: "text",
        label: "forms.users.last_name",
        key: "lastName",
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [...ValidationsForm.reqAndTree],
        props: {}
      },

      {
        type: "text",
        label: "forms.users.email",
        key: "email",
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [],
        props: {
          type: "email"
        }
      },
      {
        type: "select",
        label: "forms.users.rol",
        key: "rolId",
        keyLabel: "id",
        nameLabel: "name",
        options,
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        rules: [],
        props: {}
      },
      {
        type: "toggle",
        label: "forms.users.active",
        key: "active",
        field: {
          class: "col-12 col-sm-6 q-px-sm q-py-sm"
        },
        props: {}
      }
    ];
  }
}
</script>

<style lang="scss" scope></style>
