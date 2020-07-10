<template>
  <div :class="['ui--alert', { show: store.status }]">

    <transition name="slide" appear>
      <div class="ui--alert-container" v-if="store.status">

        <div class="ui--alert-title" v-if="store.title">
          {{ store.title }}
        </div>
        
        <div class="ui--alert-content" v-html="store.message"></div>

        <div class="ui--alert-footer">
          <button type="button" class="btn btn-default"
            v-if="isConfirm"
            @click="onClose(false)">
            Cancel
          </button>
          
          <button type="button" class="btn btn-primary"
            @click="onClose(true)">
            OK
          </button>
        </div>

      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AlertContainer extends Vue {
  [propName: string]: any

  // __METHODS
  private onClose (input: boolean): void {
    this.config.resolve(input)
    this.$alert('close')
  }

  // __COMPUTED
  private get store (): any {
    return this.$store.getters['APP.CORE/alert']
  }

  private get config (): any {
    return this.store.config
  }

  private get isConfirm (): boolean {
    return (this.config.type === 'confirm' || this.config.showBtnCancel)
  }
}
</script>