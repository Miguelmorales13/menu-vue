<template>
  <MainLayout :items="items">
    <router-view></router-view>
  </MainLayout>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import MainLayout from "layouts/MainLayout.vue";


@Component({
  components: {
    MainLayout
  }
})
export default class Index extends Vue {
  items = [
    {
      title: "Inicio",
      description: "Muestra el inicio",
      url: "/admin"
    },
    {
      title: "Usuarios",
      description: "Muestra los usuarios",
      url: "/admin/usuarios"
    },
    {
      title: "Roles",
      description: "Muestra los usuarios",
      url: "/admin/roles"
    }
  ];
}
</script>

<style lang="scss" scope></style>
