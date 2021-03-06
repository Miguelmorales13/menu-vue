<template>
  <q-layout view="hHr LpR lFr">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-toolbar-title class="row  justify-between content-center">
          <img height="54px" class="q-pa-sm" src="logo.png"/>
          <span class="text-center q-pa-sm" v-if="$q.screen.gt.sm">{{ app }}</span>
        </q-toolbar-title>
        <q-btn color="secondary" icon="build_circle">
          <q-menu transition-show="flip-right" transition-hide="flip-left">
            <q-list style="min-width: 100px">
              <!--              <q-item clickable v-close-popup :to="'/admin/profile'">-->
              <!--                <q-item-section>-->
              <!--                  <q-item-label>{{ $t("toolbar.profile") }}</q-item-label>-->
              <!--                </q-item-section>-->
              <!--              </q-item>-->
              <!--              <q-item clickable v-close-popup :to="'/admin/change-password'">-->
              <!--                <q-item-section>-->
              <!--                  <q-item-label>-->
              <!--                    {{ $t("toolbar.change-password") }}-->
              <!--                  </q-item-label>-->
              <!--                </q-item-section>-->
              <!--              </q-item>-->

              <q-item clickable v-close-popup @click="changeDark()">
                <q-item-section avatar>
                  <q-avatar :icon="dark ? 'nights_stay' : 'wb_sunny'"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ dark ? $t("toolbar.mod_nigth") : $t("toolbar.mod_day") }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="logout()">
                <q-item-section>
                  <q-item-label>{{ $t("toolbar.logout") }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-select filled v-model="menu" :options="languages" label-color="white" option-value="lang" option-label="name" @input="changeLang" emit-value color="primary" map-options>
                <template v-slot:prepend>
                  <q-icon name="language"/>
                </template>
                <template v-slot:option="{itemProps,itemEvents,opt}">
                  <q-item v-bind="itemProps" v-on="itemEvents">
                    <q-item-section avatar>
                      <q-icon :name="opt.icon"/>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="opt.name"/>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" elevated>
      <q-list bordered separator v-if="global.accesses && global.accesses.length > 0">
        <q-expansion-item v-for="(item, i) of generateFiltration()" :key="i" class="overflow-hidden" :icon="item.icon" :value="true" :label="`${$t(item.name)}`">
          <q-item active-class="text-secondary" v-for="(subItem, j) of item.access" :to="'/admin/' + subItem.keyName" :inset-level="1" :key="j + '--'">
            <q-item-section avatar>
              <q-icon :name="subItem.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ $t(subItem.name) }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <slot></slot>
      </q-page>
    </q-page-container>

    <q-footer height="10px">
      <q-toolbar height="10px">
        <q-toolbar-title class="row justify-center content-center">
          <span>Created by Morales Reyes Miguel Angel © 2021</span>
        </q-toolbar-title>

      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {APP} from "src/helpers/configs";
import {getModule} from "vuex-module-decorators";
import {languages, LanguagesActives} from "src/boot/i18n";
import {AuthStoreModule} from "src/store/modules/Auth.store";
import {GlobalStoreModule} from "src/store/modules/Global.store";

@Component
export default class MainLayout extends Vue {
  menu: string = "en-us";
  auth = getModule(AuthStoreModule, this.$store);
  global = getModule(GlobalStoreModule, this.$store);
  app = APP;
  languages: any = languages;
  left?: boolean = true;
  dark: boolean = false;
  @Prop({type: Array, required: false}) items!: Array<any>;

  async created() {
    this.menu = this.global.lang;
    this.dark = this.global.dark;
    await this.global.getModules("admins");
  }

  logout() {
    this.auth.logout();
    this.$router.push("/");
  }

  changeDark() {
    this.$q.dark.set(!this.dark);
    this.dark = !this.dark;
    this.global.context.commit("SET_DARK_MODE");
  }

  changeLang(lang: LanguagesActives) {
    this.global.setLanguage(lang);
  }

  generateFiltration() {
    let result = this.global.accesses.reduce((before: any, after: any) => {
      let access = this.auth.modulesRol
        .filter((access) => after.id == access.moduleId)
        .map((access) => {
          return after.access.find(
            (old: any) => old.id == access.AccessRolUser.accessId
          );
        });
      if (access && access.length > 0) {
        return (before = [
          ...before,
          {
            ...after,
            access,
          },
        ]);
      } else {
        return before;
      }
    }, []);
    return result;
  }
}
</script>

<style lang="scss" scope></style>
