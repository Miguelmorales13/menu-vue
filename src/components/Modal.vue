<template>
	<div id="Modal">
		<q-btn
			:label="btnTitle"
			:disabled="loader"
			color="secondary"
			v-bind="btnProps"
			v-if="hasBtn"
			@click="$emit('input', true)"
		/>
		<q-dialog
			v-model="value"
			persistent
			:maximized="$q.screen.lt.md"
			transition-show="slide-up"
			transition-hide="slide-down"
		>
			<q-layout
				v-if="$q.screen.lt.md"
				view="Lhh lpR fff"
				container
				:class="global.dark ? 'bg-dark' : 'bg-white'"
			>
				<q-header class="bg-primary">
					<q-toolbar>
						<q-btn flat :disabled="loader" @click="onCancel()" round dense icon="close" />
						<q-toolbar-title>{{ $t(title) }}</q-toolbar-title>
						<q-btn
							flat
							v-if="hasBtnConfirm"
							:disabled="loader"
							@click="onConfirm()"
							dense
						>{{ $t("modals.confirm") }}</q-btn>
					</q-toolbar>
				</q-header>
				<q-page-container>
					<q-page padding>
						<slot></slot>
					</q-page>
				</q-page-container>
			</q-layout>
			<q-card v-else style="width: 700px; max-width: 80vw">
				<q-card-section>
					<div class="text-h5">{{ $t(title) }}</div>
				</q-card-section>
				<q-separator />
				<q-card-section style="max-height: 50vh" class="scroll">
					<slot></slot>
				</q-card-section>
				<q-separator />
				<q-card-actions align="right">
					<q-btn
						flat
						@click="onCancel()"
						:disabled="loader"
						:label="$t('modals.cancel')"
						color="secondary"
					/>
					<q-btn
						flat
						v-if="hasBtnConfirm"
						@click="onConfirm()"
						:disabled="loader"
						:label="$t('modals.confirm')"
						color="secondary"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script lang="ts">
	import { Component, Emit, Prop, Vue } from "vue-property-decorator";
	import { getModule } from "vuex-module-decorators";
	import { GlobalStoreModule } from "src/store/modules/Global.store";

	@Component
	export default class Modal extends Vue {
		global = getModule(GlobalStoreModule, this.$store);
		@Prop({ type: String, required: false, default: "BTN" })
		readonly btnTitle!: string;
		@Prop({ type: Object }) readonly btnProps!: Object;

		@Prop({ type: String, required: false, default: "Modal" })
		readonly title!: string;
		@Prop({ type: Boolean, required: true }) readonly value!: boolean;
		@Prop({ type: Boolean, required: false, default: true }) readonly hasBtn!: boolean;
		@Prop({ type: Boolean, required: false, default: true }) readonly hasBtnConfirm!: boolean;
		@Prop({ type: Boolean, required: false, default: false })
		readonly loader!: boolean;

		@Emit("onConfirm")
		onConfirm () {
			return true;
		}

		@Emit("onCancel")
		onCancel () {
			return false;
		}
	}
</script>

<style lang="scss" scoped>
</style>
