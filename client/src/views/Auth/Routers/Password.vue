<template>
  <ValidationObserver tag="form" ref="observer"
    class="ui--auth-pwd"
    @submit.prevent="submit">

    <div class="ui--auth-head">
      <h2 class="ui--auth-head-h2">Set Password</h2>
      <h4 class="ui--auth-head-h4">Project, Brand Short Link</h4>
    </div>

    <div class="ui--auth-pwd-main">
      <InputProvider vid="ui--model-password"
        type="password"
        label="Password"
        v-model="password"
        :maxlength="16"
        :rules="{ required: true, min: 6 }"
      />

      <InputProvider vid="ui--model-confirm-password"
        type="password"
        label="Confirm Password"
        v-model="confirmPassword"
        :maxlength="16"
        :rules="{ required: true, confirmed: 'ui--model-password' }"
      />

      <div class="ui--auth-pwd-button">
        <button type="button" class="btn btn-default" title="Back to login" @click="back">
          <svg class="icon" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
            <path d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>

        <button type="submit" class="btn btn-primary">
          <span class="text">SUBMIT</span>
        </button>
      </div>
    </div>

    <div class="ui--auth-copyright">TAP Technology Company Limited. All Rights Reserved.</div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'

@Component({
  components: {
    ValidationObserver
  }
})
export default class PasswordComponent extends Vue {
  [propName: string]: any

  // __DATA
  private password: string = ''
  private confirmPassword: string = ''

  // __MTHODS
  private async submit (): Promise<void> {
    const FormObserver: any = this.$refs['observer']
    const isValid: boolean = await FormObserver.validate()

    if (isValid) {}
  }

  private back (): void {
    this.$router.push({ name: 'auth.login' })
  }
}
</script>