<template>
  <div id="Login">
    <div class="row fit items-center justify-center">
      <div class="col-10 col-sm-7 col-md-5 col-lg-3 ">
        <q-card>
          <q-card-section class="bg-primary">
            <div class="text-h6 text-center">
              <img height="50px" src="/icons/logonormal.png"/>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-px-lg">
            <FormFlex
              :fields="fields"
              :loader="authState.loader"
              @onValidation="changeValidation"
              :model="auth"
              @onSubmit="onSubmit"
            />
            <div class="q-px-sm">
              <q-btn
                class="full-width q-my-sm"
                @click="onSubmit"
                :loading="authState.loader"
                color="primary"
              >{{ $t("forms.auth.recover") }}
              </q-btn>
            </div>
          </q-card-section>
          <q-separator/>

          <q-card-actions vertical>
            <q-btn size="xs" color="secondary" flat to="/">
              {{
                $t("forms.auth.login")
              }}
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="fixed-bottom">
      <!--			<div class="row justify-between">-->
      <!--				<div class="bg-shadow q-ma-sm q-pa-sm shadow-4 rounded-borders">-->
      <!--					<img height="50em" src="icons/logonormal.png" alt="">-->
      <!--				</div>-->
      <!--				<q-space></q-space>-->
      <!--				<div class="bg-shadow q-ma-sm q-pa-sm shadow-4 rounded-borders">-->
      <!--					<img height="50em" src="icons/powered_by.png" alt="">-->

      <!--				</div>-->
      <!--			</div>-->
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import FormFlex from "components/FormFlex.vue";
import {getModule} from "vuex-module-decorators";
import {ValidationsForm} from "../helpers/validations";
import {DialogPersonal} from "../helpers/messages";
import {AuthStoreModule} from "src/store/modules/Auth.store";
// import { MsgError } from '../helpers/messages';

@Component({
  components: {
    FormFlex
  }
})
export default class Login extends Vue {
  authState = getModule(AuthStoreModule, this.$store);
  formValid: boolean = false;
  auth = {};

  async onSubmit() {
    // return;
    if (!this.formValid)
      return DialogPersonal("Info", "alert.verify_formulary");
    await this.authState.forgotPassword(this.auth);
    this.$router.push("/");
  }

  changeValidation(isValid: boolean) {
    if (this.formValid != isValid) {
      this.formValid = isValid;
    }
  }


  fields = [
    {
      type: "text",
      label: "forms.auth.email",
      key: "email",
      field: {
        class: "col-12 q-px-sm q-py-sm"
      },
      props: {},
      rules: [...ValidationsForm.reqEmail]
    }
  ];
}
</script>

<style lang="scss">
#Login {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url("/background.jpg");

  .bg-shadow {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
