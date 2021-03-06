<template>
	<Modal
		:btnTitle="''"
		title="titles.deleting"
		@onConfirm="onConfirm"
		v-model="dialog"
		@onCancel="onCancel"
		:hasBtn="false"
		:btnProps="{ dense: true, fab: true, color: 'primary', icon: 'add' }"
	>
		<Item :item="item" :headers="headers" />
	</Modal>
</template>

<script lang="ts">
	import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
	import Modal from "./Modal.vue";
	import Item from "./Item.vue";

	@Component({
		components: {
			Modal,
			Item
		}
	})
	export default class Delete extends Vue {
		dialog = false;
		@Prop({ type: Boolean, required: true }) readonly value!: boolean;
		@Prop({ type: Object, required: true }) readonly item!: any;
		@Prop({ type: Array, required: true }) readonly headers!: any;

		@Emit("input")
		onCancel () {
			this.dialog = false;
			return false;
		}
		@Emit("onConfirm")
		onConfirm () {
			return this.item;
		}
		@Watch("value")
		onChange (state: boolean, newStatus: boolean) {
			this.dialog = state;
		}
	}
</script>

<style lang="scss" scope>
</style>
