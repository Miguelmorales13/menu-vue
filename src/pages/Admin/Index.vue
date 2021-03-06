<template>
  <div id="Index">
    <div class="row full-height-all justify-center items-center">
      <div v-for="(card, i) of cards" :key="i" :class="card.size">
        <q-card :class="` shadow-9 clickable ${$q.screen.xl?'min-h':''}` " @click="()=>$router.push(card.route)">
          <q-card-section class="text-center">
            <q-icon :name="card.icon" class="q-py-sm" size="xl"></q-icon>
          </q-card-section>
          <q-card-section>
            <h5 class="q-ma-sm text-center">
              {{ $t(card.title) }}
            </h5>
          </q-card-section>
          <q-card-section v-if="$q.screen.xl ||$q.screen.lg||$q.screen.xs" class="text-justify">
            {{ $t(card.description) }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Index extends Vue {
  cards = [
    {
      title: 'titles.users',
      description: 'descriptions.users',
      icon: 'people',
      size: 'q-pa-sm col-12 col-sm-6 col-md-4 col-lg-4',
      route: '/admin/users',
    }, {
      title: 'titles.roles',
      description: 'descriptions.roles',
      route: '/admin/roles',
      icon: 'person_add',
      size: 'q-pa-sm col-12 col-sm-6 col-md-4 col-lg-4'
    }, {
      title: 'titles.categories',
      description: 'descriptions.categories',
      route: '/admin/categories',
      icon: 'star',
      size: 'q-pa-sm col-12 col-sm-6 col-md-4 col-lg-4'
    }, {
      title: 'titles.subcategories',
      description: 'descriptions.subcategories',
      route: '/admin/subcategories',
      icon: 'star_border',
      size: 'q-pa-sm col-12 col-sm-6 col-md-4 col-lg-3'
    }, {
      title: 'titles.products',
      description: 'descriptions.products',
      route: '/admin/products',
      icon: 'cake',
      size: 'q-pa-sm col-12 col-sm-6 col-md-4 col-lg-3'
    },
  ]
}
</script>

<style lang="scss">
#Index {
  .full-height-all {
    min-height: 80vh;
  }

  .clickable {
    cursor: pointer;

  }

  .min-h {
    min-height: 23em;
  }

}
</style>
