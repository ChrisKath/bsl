<template>
  <div id="app">

    <Loader v-if="load" />

    <router-view
      :class="[
        'ui--router-view',
        {
          'wrapper': auth
        }
      ]"
    />

    <Alert />

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/Alert.vue'

@Component({
  components: {
    Loader,
    Alert
  }
})
export default class Application extends Vue {
  [propName: string]: any

  // __COMPUTED
  private get auth (): boolean {
    return this.$store.getters['APP.AUTH/hasAuth'] && this.$route.meta.requiresAuth
  }

  private get load (): boolean {
    return this.$store.getters['APP.CORE/load']
  }

  // __CREATED <Lifecycle Hooks>
  // private created (): void {}
}
</script>