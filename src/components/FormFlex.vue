<template>
  <q-form ref="formComplete" @submit="onSubmit" @reset="onCancel" class="q-gutter-md">
    <div class="row">
      <div v-for="(item, i) of fields" :key="i" v-bind="item.field">
        <template v-if="item.type === 'select'">
          <q-select
            :options="item.options"
            dense
            lazy-rules
            transition-show="flip-up"
            transition-hide="flip-down"
            :option-value="item.keyLabel"
            :option-label="item.nameLabel"
            emit-value
            map-options
            v-model="model[item.key]"
            :rules="item.rules"
            @change="onValidation"
            :label="$t(item.label)"
            v-bind="item.props"
            color="secondary"
          ></q-select>
        </template>
        <template v-if="item.type == 'color'">
          <q-input
            filled
            v-model="model[item.key]"
            :rules="[...item.rules, 'anyColor']"
            @change="onValidation"
            :label="$t(item.label)"
          >
            <template v-slot:append>
              <q-icon :color="model[item.key]" name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="model[item.key]" v-bind="item.props"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div
            :style="`background:${model[item.key]}`"
            class="text-white q-px-sm q-py-sm"
          >{{ $t(item.label) }}
          </div>
        </template>
        <template v-else-if="item.type == 'selectMulti'">
          <q-select
            :options="item.options"
            transition-show="flip-up"
            dense
            lazy-rules
            transition-hide="flip-down"
            :option-value="item.keyLabel"
            :option-label="item.nameLabel"
            option-disable="inactive"
            v-model="model[item.key]"
            :label="$t(item.label)"
            :rules="item.rules"
            v-bind="item.props"
            @change="onValidation"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section>
                  <q-item-label v-html="scope.opt.label"></q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle v-model="model" :val="scope.opt.value"/>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </template>
        <template v-else-if="item.type == 'toggle'">
          <q-toggle
            v-model="model[item.key]"
            lazy-rules
            color="secondary"
            :toggle-indeterminate="false"
            :rules="item.rules"
            :label="$t(item.label)"
            v-bind="item.props"
            @input="onValidation"
            @change="onValidation"
          />
        </template>
        <template v-else-if="item.type == 'accesses'">
          <h6 class="q-mx-sm q-my-sm">Modulos</h6>
          <div class="row">
            <div
              v-for="(module, expand) of model[item.key]"
              :key="`${expand}p${module.id}`"
              class="col-12 col-md-6 q-px-sm q-py-sm"
            >
              <q-expansion-item
                class="shadow-3"
                :value="true"
                icon="explore"
                :label="`${$t(module.name)}`"
                header-class="bg-primary text-white"
                expand-icon-class="text-white"
              >
                <template v-slot:header>
                  <q-checkbox
                    v-model="module.isDone"
                    dark
                    @input=" ($event) => { resetModule(item.key, module); onValidation(); } "
                  />
                  <q-item-section>{{ $t(module.name) }}</q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    <div
                      class="row"
                      v-for="(access, intoExpand) of module.accesses"
                      :key="`${intoExpand}s${module.id}o${access.id}`"
                    >
                      <div class="col-6">
                        <q-checkbox
                          v-model="access.isDone"
                          color="secondary"
                          @input=" ($event) => { access.permission = access.isDone; onValidation(); } "
                          :label="$t(access.name)"
                        />
                      </div>
                      <div class="col-6 nana">
                        <q-toggle
                          :disable="!access.isDone"
                          v-model="access.permission"
                          color="secondary"
                          lazy-rules
                          :toggle-indeterminate="false"
                          :rules="item.rules"
                          :label="$t('general.writing')"
                          v-bind="item.props"
                          @input="onValidation"
                        />
                      </div>
                      <q-separator/>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
          </div>
        </template>
        <template v-else-if="item.type == 'slide'">
          <!-- <q-slider v-model="model[item.key]" dense v-bind="item.props"  \> -->
        </template>
        <template v-else-if="item.type == 'photo_personal'">
          <q-file
            v-model="model[item.key]"
            :label="$t(item.label)"
            lazy-rules
            dense
            v-bind="item.props"
            :rules="item.rules"
            @input="onValidation"
          >
            <template v-slot:before>
              <q-avatar>
                <q-img :src="readImage(model[item.key])"/>
              </q-avatar>
            </template>
          </q-file>
        </template>

        <template v-else-if="item.type == 'file'">
          <q-file
            v-model="model[item.key]"
            :label="$t(item.label)"
            lazy-rules
            dense
            v-bind="item.props"
            :rules="item.rules"
            @input="onValidation"
          />
          <q-img
            transition="slide-right"
            :src="readImage(model[item.key])"
            ratio="1"
            spinner-color="white"
            class="rounded-borders"
          >
            <div class="absolute-bottom text-center text-body2">{{ $t(item.label) }}</div>
          </q-img>
        </template>

        <template v-else-if="item.type == 'time'">
          <q-input
            filled
            lazy-rules
            v-model="model[item.key]"
            dense
            @change="onValidation"
            :label="$t(item.label)"
            v-bind="item.props"
            mask="time"
            :rules="[...(item.rules || 'time')]"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="flip-up" transition-hide="flip-down">
                  <q-time v-model="model[item.key]"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </template>
        <template v-else-if="item.type == 'date'"></template>
        <template v-else-if="item.type == 'distinct'">
          <slot v-model="model[item.key]" :item="item"></slot>
        </template>
        <template v-else-if="item.type == 'editor'">
          <q-editor
            @change="onValidation"
            v-model="model[item.key]"
            lazy-rules
            dense
            :rules="item.rules"
            v-bind="item.props"
            min-height="5rem"
          />
        </template>
        <template v-else-if="item.type == 'password'">
          <q-input
            dense
            lazy-rules
            :type="item.isPassword ? 'password' : 'text'"
            v-model="model[item.key]"
            :label="$t(item.label)"
            :rules="item.rules"
            v-bind="item.props"
            @change="onValidation"
          >
            <template v-slot:append>
              <q-icon
                :name="item.isPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="item.isPassword = !item.isPassword"
              />
            </template>
          </q-input>
        </template>
        <template v-else-if="item.type == 'text'">
          <q-input
            color="secondary"
            dense
            lazy-rules
            :rules="item.rules"
            v-model="model[item.key]"
            :label="$t(item.label)"
            @change="onValidation"
            v-bind="item.props"
          />
        </template>
      </div>
      <!-- <div class="col-12">
        <q-btn type="submit">dfdfs</q-btn>
      </div>-->
    </div>
  </q-form>
</template>

<script lang="ts">
import {readImage} from "src/helpers/helpers";
import {Component, Emit, Prop, Vue} from "vue-property-decorator";

@Component
export default class FormFlex extends Vue {
  @Prop({required: true, type: Array}) readonly fields!: Array<any>;
  @Prop({required: true, type: Object}) readonly model!: any;
  @Prop({type: Boolean, default: false, required: false})
  readonly btnCancel!: boolean;
  @Prop({type: Boolean, default: false, required: false})
  readonly loading!: boolean;

  @Prop({type: String, default: "Guardar", required: false})
  readonly textBtn!: string;
  readImage = readImage;

  @Emit("onCancel")
  async onCancel() {
  }

  resetModule(key: string, module: any) {
    module.accesses = module.accesses.map((access: any) => ({
      ...access,
      isDone: module.isDone,
      permission: module.isDone
    }));
  }

  changeAccess(access: any) {
    access.permission = access.isDone;
  }

  @Emit("onValidation")
  async onValidation() {
    // @ts-ignore
    return await this.$refs.formComplete.validate();
  }

  @Emit("onSubmit")
  async onSubmit() {
    // @ts-ignore
    return [false, {}];
  }
}
</script>

<style lang="scss" scope>
.nana {
  display: grid;
  justify-content: end;
  align-items: flex-end;
  align-self: flex-end;
  align-content: flex-end;
}
</style>
