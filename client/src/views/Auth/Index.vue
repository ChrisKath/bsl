<template>
  <div class="ui--auth">
    <router-view class="container" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import './style.less'

@Component
export default class AuthenticationContainer extends Vue {
  [propName: string]: any

  // __CREATED <Lifecycle Hooks>
  // private created (): void {}
}
</script>