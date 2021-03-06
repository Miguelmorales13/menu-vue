<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {getModule} from "vuex-module-decorators";
import {GlobalStoreModule} from "src/store/modules/Global.store";

@Component
export default class App extends Vue {
  globalStore = getModule(GlobalStoreModule, this.$store);

  async created() {
    this.$q.dark.set(this.globalStore.dark);
    this.globalStore.setLanguage(this.globalStore.lang);
  }
}
</script>
