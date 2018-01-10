<template lang="html">

  <Form ref="login"
    class="ivu-form--login"
    :model="form"
    :rules="rule"
    @keyup.enter.native="visible('login')"
  >

    <FormItem prop="username">
      <Input type="text" size="large"
        v-model="form.username"
        :placeholder="$t('i.form.user')"
      >
        <Icon type="ios-person-outline" size="23" slot="prepend"/>
      </Input>
    </FormItem>

    <FormItem prop="password">
      <Input type="password" size="large"
        v-model="form.password"
        :placeholder="$t('i.form.pass')"
      >
        <Icon type="ios-locked-outline" size="20" slot="prepend"/>
      </Input>
    </FormItem>

    <FormItem>
      <Row type="flex" justify="space-between">
        <Checkbox size="large" class="ivu-checkbox-link"
          v-model="form.logged">&nbsp;
          {{ $t('i.form.logged') }}
        </Checkbox>

        <router-link :to="{name: 'auth.main'}"
          v-text="$t('i.form.forgot')"
        />
      </Row>
    </FormItem>

    <FormItem>
      <Button type="primary" size="large"
        @click="visible('login')"
      >
        {{ $t('i.button.signin') }}
      </Button>
    </FormItem>

  </Form>

</template>

<script>
const required = {
  required: true,
  message: 'Please fill is required.'
}
const pattern = {
  type: 'string',
  required: true,
  pattern: /^[a-z*A-Z*0-9*]+$/,
  message: 'Please fill is (English or Number) only.'
}

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        logged: false
      },
      rule: {
        username: [required, pattern],
        password: [required, pattern]
      }
    }
  },
  methods: {
    visible (name) {
      this.$refs[name].validate(valid => {
        valid
          ? this.$Notice.success({title: 'Success!', desc: '...'})
          : this.$Notice.error({title: 'Fail!', desc: '...'})
      })
    }
  }
}
</script>
