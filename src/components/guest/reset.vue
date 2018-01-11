<template lang="html">
<div class="ivu-form--guest">
  <h2 class="size-26 txt-c pd-t20 pd-b20">
    {{ $t('i.form.title.resetPass') }}
    <h5 class="size-16 pd-t5">
      {{ $t('i.form.title.resetInfo') }}
    </h5>
  </h2>

  <Form ref="reset"
    :model="form"
    :rules="rule"
    @keyup.enter.native="visible('reset')">

    <FormItem class="mg-b10">
      <Alert show-icon>{{ $t('i.form.note.one') }}</Alert>
      <Alert show-icon>{{ $t('i.form.note.two') }}</Alert>
    </FormItem>

    <FormItem prop="username">
      <Input type="text" size="large"
        v-model="form.username"
        :maxlength="64"
        :placeholder="$t('i.form.user')">
        <Icon type="ios-person-outline" size="23" slot="prepend"/>
      </Input>
    </FormItem>

    <FormItem prop="email">
      <Input type="email" size="large"
        v-model="form.email"
        :maxlength="64"
        :placeholder="$t('i.form.registeredEmail')">
        <Icon type="ios-email-outline" size="20" slot="prepend"/>
      </Input>
    </FormItem>

    <FormItem class="pd-t10">
      <Button type="primary" size="large" class="min-w100"
        icon="ios-checkmark-outline"
        @click="visible('reset')">
        {{ $t('i.form.button.confirm') }}
      </Button>

      <router-link :to="{name: 'guest.login'}">
        <Button size="large">{{ $t('i.form.button.cancel') }}</Button>
      </router-link>
    </FormItem>

  </Form>

  <p class="size-12 txt-c mg-t15">
    &copy;2018 TAP Technology Company Limited. all rights reserved.
  </p>
</div>
</template>

<script>
import verify from '../validator'

export default {
  data () {
    return {
      form: {
        username: '',
        email: ''
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
        valid
          ? this.$Message.success(this.$t('i.notice.success'))
          : this.$Message.warning(this.$t('i.notice.warning'))
      })
    }
  }
}
</script>
