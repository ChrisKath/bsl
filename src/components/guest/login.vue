<template lang="html">
  <Row class="ivu-guest">
    <div class="ivu-title txt-c txt-up size-29 size-w800">
      {{ $t('i.form.title.auth') }}

      <div class="size-16 size-w300"
        v-text="$t('i.form.title.authInfo')"
      />
    </div>

    <Form ref="signin"
      :model="form"
      :rules="rule"
      @keyup.enter.native="touch('signin')">

      <FormItem class="mg-b10">
        <Alert show-icon>{{ $t('i.form.note.three') }}</Alert>
      </FormItem>

      <FormItem prop="username" class="mg-b20">
        <InputGroup :placeholder="$t('i.form.user')" icon="ios-person-outline">

          <Input slot="input" type="text"
            :maxlength="64"
            v-model="form.username"
          />

        </InputGroup>
      </FormItem>

      <FormItem prop="password" class="mg-b20">
        <InputGroup :placeholder="$t('i.form.pass')" icon="ios-locked-outline">

          <Input slot="input" type="password"
            :maxlength="16"
            v-model="form.password"
          />

        </InputGroup>
      </FormItem>

      <FormItem class="mg-b10">
        <Row type="flex" justify="start">

          <Checkbox class="ivu-chkbox-keep"
            size="large"
            v-model="form.remember">
            {{ $t('i.form.logged') }}
          </Checkbox>

          <!-- <router-link :to="{name: 'guest.reset', params: {passive: 'null'}}"
            v-text="$t('i.form.forgot')"
          /> -->

        </Row>
      </FormItem>

      <FormItem>
        <Button type="primary" size="large"
          class="txt-up min-w150"
          icon="log-in"
          @click="touch('signin')">
          {{ $t('i.form.button.signin') }}
        </Button>
      </FormItem>
    </Form>

    <div class="ivu-copyright txt-c size-11">
      &copy;2018 TAP Technology Company Limited. all rights reserved.
    </div>
  </Row>
</template>

<script>
import { mapActions } from 'vuex'
import verify from '~/components/validator'

export default {
  data () {
    return {
      form: {
        username: null,
        password: null,
        remember: false,
        timestamp: Date.now()
      },
      rule: {
        username: [verify.fill, verify.string],
        password: [verify.fill, verify.string]
      }
    }
  },

  methods: {
    ...mapActions({
      signin: 'authen/signin'
    }),

    touch (name) {
      this.$refs[name].validate((verify) => {
        if (!verify) {
          this.$message.warning(
            this.$t('i.notice.warning')
          )
        } else {
          this.$loading.start()

          this.$message.success(
            this.$t('i.notice.success')
          )

          this.signin(this.form)
        }
      })
    }
  }
}
</script>
