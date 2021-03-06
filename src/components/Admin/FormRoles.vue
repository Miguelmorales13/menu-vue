<template>
  <Modal
    :btnTitle="''"
    :title="rol.id ? 'titles.updated' : 'titles.creation'"
    @onConfirm="onSubmit"
    v-model="dialog"
    @onCancel="onCancel"
    :loader="rolesStore.loader"
    :hasBtn="authStore.accessRoles=='2'"
    :btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add' }"
  >
    <FormFlex
      :fields="fields"
      :loader="rolesStore.loader"
      :model="rol"
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
import {RolStoreModule} from "src/store/modules/Rol.store";
import {IAccessProcess, IAccessToSend, IModuleProcess, IRol} from "src/models/rol";
import {ValidationsForm} from "src/helpers/validations";
import {IModule} from "src/models/module";
import {GlobalStoreModule} from "src/store/modules/Global.store";
import {AuthStoreModule} from "src/store/modules/Auth.store";

@Component({
  components: {
    FormFlex,
    Modal
  }
})
export default class FormRoles extends Vue {
  @Prop({type: Boolean, required: true}) value!: boolean;
  globalStore = getModule(GlobalStoreModule, this.$store);
  dialog = false;
  formValid: boolean = false;
  rolesStore = getModule(RolStoreModule, this.$store);
  authStore = getModule(AuthStoreModule, this.$store);
  rol: IRol = {access: []};

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
    this.rol = Object.assign({}, this.rolesStore.selectedRol);
  }

  @Watch("rolesStore.selectedRol")
  onSelectedRol(status: any, newStatus: IRol) {
    this.rol = Object.assign({}, status);

    this.resetForm();
  }

  async onSubmit() {
    if (!this.formValid) {
      return;
    }

    if (this.rol.id) {
      const res = await this.rolesStore.update({
        ...this.rol,
        access: this.formatAccessToSend(this.rol.access)
      });
      this.onCancel();
    } else {
      const res = await this.rolesStore.create({
        ...this.rol,
        access: this.formatAccessToSend(this.rol.access)
      });
      this.onCancel();
    }
  }

  formatAccessToSend(modules: IModuleProcess[]): IAccessToSend[] {
    return modules.reduce((before: IAccessToSend[], after: IModuleProcess) => {
      return (before = [
        ...before,
        ...after.accesses.reduce(
          (beforeAccess: IAccessToSend[], afterAccess: IAccessProcess) => {
            if (afterAccess.isDone) {
              return (beforeAccess = [
                ...beforeAccess,
                {
                  accessId: afterAccess.accessId,
                  permission: afterAccess.permission ? "2" : "1"
                }
              ]);
            }
            return beforeAccess;
          },
          []
        )
      ]) as IAccessToSend[];
    }, []);
  }

  formatAccessToForm(modules: IModuleProcess[]): IAccessToSend[] {
    return modules.reduce((before: IAccessToSend[], after: IModuleProcess) => {
      return (before = [
        ...before,
        ...after.accesses.reduce(
          (beforeAccess: IAccessToSend[], afterAccess: IAccessProcess) => {
            if (afterAccess.isDone) {
              return (beforeAccess = [
                ...beforeAccess,
                {
                  accessId: afterAccess.accessId,
                  permission: afterAccess.permission ? "2" : "1"
                }
              ]);
            }
            return beforeAccess;
          },
          []
        )
      ]) as IAccessToSend[];
    }, []);
  }

  fields = [
    {
      type: "text",
      label: "forms.roles.name",
      key: "name",
      field: {class: "col-12 col-md-6 q-px-sm q-py-sm"},
      props: {},
      rules: [...ValidationsForm.reqAndTree]
    },
    {
      type: "toggle",
      label: "forms.roles.active",
      key: "active",
      field: {
        class:
          "col-12 col-md-6 q-px-sm q-py-sm column wrap justify-center content-end"
      },
      props: {},
      rules: [...ValidationsForm.reqAndTree]
    },
    {
      type: "accesses",
      label: "forms.roles.name",
      key: "access",
      field: {class: "col-12"},
      props: {},
      rules: [...ValidationsForm.reqAndTree]
    }
  ];

  async created() {
    await this.globalStore.getModules("users");
    this.resetForm();
  }

  resetForm() {
    this.rol = {
      ...this.rolesStore.selectedRol,
      access: this.globalStore.accesses.map((module: IModule) => {
        let moduleWanted = this.rolesStore.selectedRol.access.filter(
          m => m.moduleId == module.id
        );
        return {
          moduleId: module.id,
          name: module.name,
          isDone: moduleWanted.length > 0,
          accesses: module.access?.map(access => {
            if (moduleWanted && moduleWanted.length <= 0) {
              return {
                isDone: false,
                accessId: access.id,
                name: access.name,
                permission: false
              };
            }
            let wantedAccess: any = moduleWanted.find(
              (a: any) => a.accessId == access.id
            );
            if (!wantedAccess) {
              return {
                isDone: false,
                accessId: access.id,
                name: access.name,
                permission: false
              };
            }
            return {
              isDone: true,
              accessId: access.id,
              name: access.name,
              permission: wantedAccess.permission == "2"
            };
          })
        };
      }) as IModuleProcess[]
    };
  }
}
</script>

<style lang="scss" scope></style>
