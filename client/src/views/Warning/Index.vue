<template>
  <div class="ui--warning">
    .ui--warning
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import './style.less'

@Component
export default class WarningContainer extends Vue {
  [propName: string]: any

  // __CREATED <Lifecycle Hooks>
  // private created (): void {}
}
</script>