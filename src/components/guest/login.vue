<template lang="html">
<div class="ivu-form--guest">
  <h2 class="size-26 txt-c pd-t20 pd-b20">
    {{ $t('i.form.title.auth') }}
  </h2>

  <Form ref="login"
    :model="form"
    :rules="rule"
    @keyup.enter.native="visible('login')">

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
          v-model="form.logged">&nbsp;
          {{ $t('i.form.logged') }}
        </Checkbox>

        <router-link :to="{name: 'guest.reset'}">
          {{ $t('i.form.forgot') }}
        </router-link>
      </Row>
    </FormItem>

    <FormItem>
      <Button type="primary" size="large"
        class="min-w100"
        icon="log-in"
        @click="visible('login')">
        {{ $t('i.form.button.signin') }}
      </Button>
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
        password: '',
        logged: false
      },
      rule: {
        username: [verify.fill, verify.default],
        password: [verify.fill, verify.default]
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
