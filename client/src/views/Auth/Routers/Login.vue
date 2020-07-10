<template>
  <ValidationObserver tag="form" ref="observer"
    class="ui--auth-login"
    @submit.prevent="submit">

    <div class="ui--auth-head">
      <h2 class="ui--auth-head-h2">Login</h2>
      <h4 class="ui--auth-head-h4">Project, Brand Short Link</h4>
    </div>

    <div :class="['ui--auth-login-main', { hidden: isSso }]">
      <div class="ui--auth-login-input">
        <InputProvider vid="ui--model-username"
          label="Username"
          v-model="username"
          :maxlength="16"
          :rules="{ required: true }"
        />

        <InputProvider vid="ui--model-password"
          type="password"
          label="Password"
          v-model="password"
          :maxlength="16"
          :rules="{ required: true }"
        />

        <button type="submit" class="btn btn-primary">
          <svg class="icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.146 11.354a.5.5 0 0 1 0-.708L10.793 8 8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"/>
            <path d="M1 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 1 8z"/>
            <path d="M13.5 14.5A1.5 1.5 0 0 0 15 13V3a1.5 1.5 0 0 0-1.5-1.5h-8A1.5 1.5 0 0 0 4 3v1.5a.5.5 0 0 0 1 0V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 5 13v-1.5a.5.5 0 0 0-1 0V13a1.5 1.5 0 0 0 1.5 1.5h8z"/>
          </svg>
          <span class="text">LOGIN</span>
        </button>
      </div>

      <div class="ui--auth-login-or">
        <span class="label">OR</span>
        <span class="line"></span>
      </div>

      <div class="ui--auth-login-other">
        <button type="button" class="btn btn-primary" @click="loginWitchSingleSignOn">
          <svg class="icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <span class="text">Single Sign-On</span>
        </button>
      </div>
    </div>

    <SsoFrame v-if="isSso"
      @back="(typeLogin = 'none')"
      @next="onSingleSignOnComplete"
    />

    <div class="ui--auth-copyright">TAP Technology Company Limited. All Rights Reserved.</div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'
import SsoFrame from '../Components/Sso.vue'
import configs from '@/configs/app'
import { hasProp } from '@/utils'

@Component({
  components: {
    ValidationObserver,
    SsoFrame
  }
})
export default class LoginComponent extends Vue {
  [propName: string]: any

  // __DATA
  private username: string = ''
  private password: string = ''
  private typeLogin: string = 'none'

  // __MTHODS
  private async submit (): Promise<void> {
    const FormObserver: any = this.$refs['observer']
    const isValid: boolean = await FormObserver.validate()

    if (isValid) {}
  }

  private loginWitchSingleSignOn (): void {
    if (configs.APP_MODE === 'development') {
      this.$alert('This function cannot be used in development mode.', { showTitle: true })
    } else {
      this.typeLogin = 'sso'
    }
  }

  private onSingleSignOnComplete (input: any): void {
    if (hasProp(input, 'firstLogin')) {

      this.$alert('Your first sign-in.<br>You need to set a password.', {
        showTitle: true
      }).then((): void => {

        this.$router.push({
          name: 'auth.password',
          query: {
            hex: input.token,
            expires: input.expires
          }
        })

      })

    } else {
      this.$store.dispatch('APP.AUTH/createCookie', input)
      this.$router.push({ name: 'index' })
    }
  }

  // __COMPUTED
  private get isSso (): boolean {
    return this.typeLogin === 'sso'
  }
}
</script>