<template lang="html">
  <Row class="ivu-guest">
    <div class="ivu-title txt-c txt-up size-29 size-w800">
      {{ $t('i.form.title.resetPass') }}

      <div class="size-16 size-w300"
        v-text="$t('i.form.title.resetInfo')"
      />
    </div>

    <Form ref="reset"
      :model="form"
      :rules="rule"
      @keyup.enter.native="visible('reset')">

      <FormItem class="mg-b10">
        <Alert show-icon type="error">{{ $t('i.form.note.zero') }}</Alert>
        <Alert show-icon>{{ $t('i.form.note.one') }}</Alert>
        <Alert show-icon>{{ $t('i.form.note.two') }}</Alert>
      </FormItem>

      <FormItem prop="username" class="mg-b20">
        <InputGroup :placeholder="$t('i.form.user')" icon="ios-person-outline">

          <Input slot="input" type="text"
            :maxlength="64"
            v-model="form.username"
          />

        </InputGroup>
      </FormItem>

      <FormItem prop="email" class="mg-b20">
        <InputGroup :placeholder="$t('i.form.registeredEmail')" icon="ios-email-outline">

          <Input slot="input" type="text"
            :maxlength="64"
            v-model="form.email"
          />

        </InputGroup>
      </FormItem>

      <FormItem>
        <Button type="primary" size="large"
          class="txt-up min-w150"
          :loading="i.loading"
          @click="visible('reset')">
          <span v-if="!i.loading">{{ $t('i.form.button.confirm') }}</span>
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

export default {
  data () {
    return {
      i: {loading: false},
      form: {
        username: null,
        email: null,
        timestamp: Date.now()
      },
      rule: {
        username: [verify.fill, verify.default],
        email: [verify.fill, verify.email]
      }
    }
  },
  methods: {
    visible (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$message.success(
            this.$t('i.notice.success')
          )
          this.i.loading = true
        } else {
          this.$message.warning(
            this.$t('i.notice.warning')
          )
        }
      })
      setTimeout(() => { this.i.loading = false }, 2000)
    }
  }
}
</script>
