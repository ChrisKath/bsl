<template>
  <ValidationProvider tag="div" mode="eager"
    class="ui--input"
    v-slot="{ errors }"
    :vid="vid"
    :name="label"
    :rules="rules"
    :customMessages="errorsMessages">

    <label
      class="ui--input-label"
      v-if="label"
      :for="vid"
      :required="rules.required">
      {{ label }}:
    </label>

    <div class="ui--input-container">

      <i :class="['ui--input-icon', ionIcon]" v-if="ionIcon"></i>

      <input
        :class="['ui--input-default', { 'has-icon': icon }]"
        :id="vid"
        :type="type"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :tabindex="tabIndex"
        v-model="currentValue"
      >

    </div>

    <span class="ui--input-errors" v-if="errors[0]">
      {{ errors[0] }}
    </span>

  </ValidationProvider>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'vue-property-decorator'
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full'
import { capitalize } from '@/utils'

@Component({
  components: {
    ValidationProvider
  }
})
export default class InputProvider extends Vue {
  [propName: string]: any

  @Prop() private readonly value!: any

  @Prop({
    type: String,
    required: true
  }) private readonly vid!: string

  @Prop({
    type: String,
    required: false,
    default: ''
  }) private readonly label!: string

  @Prop({
    type: String,
    required: false,
    default: 'text'
  }) private readonly type!: string

  @Prop({
    type: String,
    required: false,
    default: ''
  }) private readonly icon!: string

  @Prop({
    type: Object,
    required: false,
    default: () => ({})
  }) private readonly rules!: object

  @Prop({
    type: Object,
    required: false,
    default: () => ({})
  }) private readonly errorsMessages!: object

  @Prop({
    type: String,
    required: false,
    default: 'off'
  }) private readonly autocomplete!: string

  @Prop({
    type: Number,
    required: false,
    default: 0
  }) private readonly tabIndex!: number

  @Prop(Boolean) private readonly disabled!: boolean
  @Prop(Boolean) private readonly autofocus!: boolean
  @Prop(String) private readonly textTransform!: string
  @Prop([Number, String]) private readonly maxlength!: number | string

  // __WATCH
  @Watch('value')
  private watchValue (newValue: string | number): void {
    this.currentValue = newValue
  }

  @Watch('currentValue')
  private watchCurrentValue (newValue: string | number): void {
    if (this.textTransform === 'capitalize') {
      newValue = capitalize(newValue as string)
    }

    this.currentValue = newValue
    this.$emit('input', newValue)
  }

  // __DATA
  private currentValue: string | number = this.value

  // __COMPUTED
  private get ionIcon (): string {
    return (this.icon ? `ion-${this.icon}` : '')
  }
}
</script>