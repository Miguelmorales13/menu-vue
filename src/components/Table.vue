<template>
  <div id="Table">
    <q-table
      :data="data"
      :columns="translateHeaders()"
      :grid="$q.screen.lt.md"
      :row-key="keyProp"
      :dense="$q.screen.lt.lg"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 50, 100, 0]"
      :no-data-label="$t('tables.no_data')"
      :no-results-label="$t('tables.no_result')"
    >
      <template v-slot:top>
        <div class="row full-width justify-between">
          <div class="col-6">
            <span class="text-h5">{{ $t(title) }}</span>
          </div>
          <div class="col-6 end ">
            <slot name="default"></slot>
          </div>
        </div>
        <div class="row fit">
          <div class="col-12">
            <q-input dense v-model="filter" color="secondary" :placeholder="$t('tables.find')">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
        </div>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-primary q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied"/>
          <span>{{ $t("tables.bad") }} {{ message }}</span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"/>
        </div>
      </template>
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <div>
            <q-badge :color="props.value ? 'green' : 'red'" :label="props.value ? 'Activo' : 'Inactivo'"/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-options="props">
        <q-td :props="props" v-if="hasAccessToWrite">
          <slot name="normal" :item="props.row"></slot>
        </q-td>
        <q-td :props="props" v-else>
          😒
        </q-td>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-list dense>
              <q-item v-for="col in props.cols.filter( (col) => col.name !== 'desc' )" :key="col.name">
                <template v-if="col.field === 'options'">
                  <q-item-section>
                    <q-item-label> {{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <template v-if="hasAccessToWrite">
                      <slot name="card" :item="props.row"></slot>
                    </template>
                    <div v-else>😊</div>
                  </q-item-section>
                </template>
                <template v-else-if="col.field === 'active'">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>
                      <q-badge :color=" col.value ? 'green' : 'red'" :label=" col.value ? 'Activo' : 'Inactivo'"/>
                    </q-item-label>
                  </q-item-section>
                </template>

                <template v-else>
                  <q-item-section>
                    <q-item-label> {{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption> {{ col.value }}</q-item-label>
                  </q-item-section>
                </template>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";

@Component({
  components: {
    // QTable
  }
})
export default class Table extends Vue {
  /*
   * name. string
   * required. boolean
   * align. 'center'|'left'|''
   * field. (row)=>row.name | 'name'
   * format. (val)=> format any things
   */
  filter: string = "";
  @Prop({required: true, type: Array}) readonly headers!: Array<Object>;
  @Prop({required: true, type: Array}) readonly data!: Array<Object>;
  @Prop({required: true, type: String}) readonly title!: string;
  @Prop({required: false, type: String, default: "id"}) readonly keyProp!: string;
  @Prop({required: false, type: Boolean, default: false}) readonly loading!: boolean;
  @Prop({required: false, type: Boolean, default: true}) readonly hasAccessToWrite!: boolean;


  //
  // filterMethod(rows, terms, cols, getCellValue) {
  // 	console.log(rows, terms, cols, getCellValue)
  //
  // 	console.log(getCellValue())
  // 	return []
  // }

  translateHeaders() {
    return this.headers.map((header: any) => {
      return {
        ...header,
        label: this.$t(header.label)
      };
    });
  }

  onChange(e: any) {
    console.log(e)
  }

  @Emit("onDelete")
  onActionListDelete(item: any) {
    return item;
  }
}
</script>

<style lang="scss">

.nana {
  display: grid;
  justify-content: end;
  align-items: flex-end;
  align-self: flex-end;
  align-content: flex-end;
}

.end {
  display: flex;
  justify-content: flex-end;
}
</style>
