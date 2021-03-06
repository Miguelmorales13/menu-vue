<template>
  <div id="Item">
		<span v-for="(head,i) of headers" :key="i">
			<b>{{ $t(head.label) }}:&nbsp;</b>
			<span>{{ item[head.field] }}</span>
			<br/>
		</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Item extends Vue {
  @Prop({type: Object, required: true}) item!: any;
  @Prop({type: Array, required: true}) headers!: any;
}
	
</script>

<style lang="scss" scope></style>
