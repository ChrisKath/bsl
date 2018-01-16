<template lang="html">
<div class="ivu-form--guest">
  <h2 class="size-26 size-w800 txt-c pd-t20 pd-b20">
    {{ $t('i.form.title.auth') }}
  </h2>

  <Form ref="login"
    :model="form"
    :rules="rule"
    @keyup.enter.native="touch('login')">

    <FormItem class="mg-b10">
      <Alert show-icon>Brand Short Link - Project (bata)</Alert>
    </FormItem>

    <FormItem prop="username">
      <Input type="text" size="large"
        v-model="form.username"
        :maxlength="64"
        :placeholder="$t('i.form.user')">
        <Icon type="ios-person-outline" size="23" slot="prepend"/>
      </Input>
    </FormItem>

    <FormItem prop="password">
      <Input type="password" size="large"
        v-model="form.password"
        :maxlength="16"
        :placeholder="$t('i.form.pass')">
        <Icon type="ios-locked-outline" size="20" slot="prepend"/>
      </Input>
    </FormItem>

    <FormItem class="mg-b10">
      <Row type="flex" justify="space-between">
        <Checkbox size="large" class="ivu-checkbox-link"
          v-model="form.remember">&nbsp;
          {{ $t('i.form.logged') }}
        </Checkbox>

        <router-link :to="{name: 'guest.reset'}">
          {{ $t('i.form.forgot') }}
        </router-link>
      </Row>
    </FormItem>

    <FormItem>
      <Button type="warning" size="large"
        class="min-w100"
        icon="log-in"
        @click="touch('login')">
        <span>{{ $t('i.form.button.signin') }}</span>
      </Button>
      <input type="hidden" v-model="form._token">
    </FormItem>

  </Form>

  <p class="size-12 txt-c mg-t15">
    &copy;2018 TAP Technology Company Limited. all rights reserved.
  </p>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import verify from '~/components/validator'

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        remember: false,
        _token: this.$csrf
      },
      rule: {
        username: [verify.fill, verify.default],
        password: [verify.fill, verify.default]
      }
    }
  },

  methods: {
    ...mapActions({
      login: 'auth/login'
    }),

    touch (name) {
      const _al = this.$Message
      this.$refs[name].validate((verify) => {
        if (!verify) _al.warning(this.$t('i.notice.warning'))
        else {
          _al.success(this.$t('i.notice.success'))
          this.$Loading.start()
          this.login({vm: this, form: this.form})
        }
      })
    }
  }
}
</script>
