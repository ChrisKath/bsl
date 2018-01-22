<template lang="html">
  <div class="ivu-inputGroup">
    <label class="txt-up size-13 size-w700">
      <Icon v-if="icon" :type="icon"/>
      <span>{{ placeholder }}</span>
    </label>

    <slot name="input"/>
  </div>
</template>

<script>
export default {
  name: 'InputGroup',

  props: {
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    }
  }
}
</script>
