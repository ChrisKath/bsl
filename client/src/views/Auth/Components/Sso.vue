<template>
  <transition name="fade" appear>
    <div class="ui--auth-login-scene">
      <div class="type">
        <p>Microsoft Security Support Provider Interface (SSPI),</p>
        <p>Single Sign-On (SSO) Authentication.</p>
      </div>

      <svg class="avatar" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      </svg>

      <div class="info">
        <h4 class="code">-</h4>
        <h2 class="name">-</h2>
        <h3 class="title">-</h3>
      </div>

      <div class="footer">
        <button type="button" class="btn btn-default" @click="(typeLogin = 'none')">
          <svg class="icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
            <path d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>

        <button type="button" class="btn btn-primary" disabled>
          <svg class="icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.146 11.354a.5.5 0 0 1 0-.708L10.793 8 8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
            <path d="M1 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 1 8z"/>
            <path d="M13.5 14.5A1.5 1.5 0 0 0 15 13V3a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 4 3v1.5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 5 13v-1.5a.5.5 0 0 0-1 0V13a1.5 1.5 0 0 0 1.5 1.5h8z"/>
          </svg>
          <span class="text">Sign In</span>
        </button>
      </div>

      <!-- <iframe :src="source" @load="loaded"></iframe> -->
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class SingleSignOnProvider extends Vue {
  [propName: string]: any

  // __DATA
  private source: string = '/api/v2/auth/sso'

  // __METHODS
  private loaded (): void {
    const iframe: any = this.$el.querySelector('iframe')

    setTimeout((): void => {
      const iframeDocument: any = (iframe.contentDocument || iframe.contentWindow.document)
      const response: any = JSON.parse(iframeDocument.body.innerText)
      console.log(response)
    }, 1e3)
  }

  // __MOUNTED <Lifecycle Hooks>
  // private mounted (): void {}
}
</script>