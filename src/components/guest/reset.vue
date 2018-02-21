<template lang="html">
  <Row class="ivu-guest">
    <div class="ivu-title txt-c txt-up size-29 size-w800">
      {{ $t('i.form.title.resetPass') }}

      <div class="size-16 size-w300"
        v-text="$t('i.form.title.resetInfo')"
      />
    </div>

    <Form :ref="i.name"
      :model="form"
      :rules="rule"
      @keyup.enter.native="touch">

      <FormItem class="mg-b10">
        <Alert show-icon>
          {{ `Username: ${username}` }}
        </Alert>

        <Alert show-icon>
          Please enter your new password in both input fields.
        </Alert>
      </FormItem>

      <FormItem prop="passwd1" class="mg-b20">
        <InputGroup placeholder="new passowrd" icon="ios-locked-outline">

          <Input slot="input" type="password"
            :maxlength="16"
            v-model="form.passwd1"
          />

        </InputGroup>
      </FormItem>

      <FormItem prop="passwd2" class="mg-b20">
        <InputGroup placeholder="Confirm new password" icon="ios-locked-outline">

          <Input slot="input" type="password"
            :maxlength="16"
            v-model="form.passwd2"
          />

        </InputGroup>
      </FormItem>

      <FormItem>
        <Button type="primary" size="large"
          class="txt-up min-w150"
          :loading="i.loading"
          @click="touch">

          <span v-if="!i.loading">{{ $t('i.form.button.save') }}</span>
          <span v-else>{{ $t('i.select.loading') }}...</span>
        </Button>

        <router-link :to="{name: 'guest.login'}">
          <Button type="text" size="large"
            v-text="$t('i.form.button.cancel')"
          />
        </router-link>
      </FormItem>
    </Form>

    <div class="ivu-copyright txt-c size-11">
      &copy;2018 TAP Technology Company Limited. all rights reserved.
    </div>
  </Row>
</template>

<script>
import verify from '~/components/validator'
import { HTTP } from '~/store/http'

export default {
  data () {
    return {
      i: {
        name: 'reset',
        loading: false
      },
      form: {
        passwd1: null,
        passwd2: null
      },
      rule: {
        passwd1: [verify.fill, verify.string],
        passwd2: [verify.fill, verify.string]
      }
    }
  },

  methods: {
    touch () {
      this.$refs[this.i.name].validate(h => {
        if (h) {
          if (this.form.passwd2 !== this.form.passwd1) {
            this.$notice.warning({
              duration: 7.2,
              title: 'Warning',
              desc: 'Password doesn\'t match.'
            })
          } else {
            this.i.loading = true
            const user = this.$route.params.passive.split('.')

            setTimeout(async h => {
              await this.passive({
                id: user[0],
                username: user[1],
                password: this.form.passwd1
              })
            }, 512)
          }
        } else {
          this.$message.warning(
            this.$t('i.notice.warning')
          )
        }
      })
    },

    async passive (params) {
      const { data } = await HTTP.patch('/pwd/reset', params)
      this.i.loading = false

      if (!data.status) {
        this.$notice.error({
          title: 'Critical Error',
          desc: 'Something was wrong!!'
        })
      } else {
        this.$notice.success({
          title: 'Successful',
          desc: 'Your password was changed. Please login agin.'
        })
        this.$router.push({name: 'auth.main'})
      }
    }
  },

  computed: {
    username () {
      return this.$route.params.passive.split('.')[1].toUpperCase()
    }
  }
}
</script>
