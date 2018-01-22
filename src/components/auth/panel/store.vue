<template lang="html">
  <Row class-name="ivu-panel-store">
    <RowHead :router-back="head.back" :title-name="$t('i.title.createAccount')"/>

    <Row class-name="ivu-row-body pd-40">
      <Form ref="store"
        :model="form"
        :rules="rule"
        @keyup.enter.native="touch('store')">

        <FormItem prop="permis">
          <RadioGroup v-model="form.permis" type="button" size="large">
            <Radio :label="`x`" disabled>
              <Icon type="ios-world-outline"/>
              <span class="size-w600">{{ $t('i.form.root') }}</span>
            </Radio>
            <Radio :label="0">
              <Icon type="ribbon-b"/>
              <span class="size-w600">{{ $t('i.form.admin') }}</span>
            </Radio>
            <Radio :label="1">
              <Icon type="ios-person"/>
              <span class="size-w600">{{ $t('i.form.member') }}</span>
            </Radio>
          </RadioGroup>
        </FormItem>

        <FormItem prop="display">
          <InputGroup :placeholder="$t('i.form.display')" icon="ios-compose-outline">

            <Input slot="input"
              :maxlength="16"
              v-model="form.display"
            />

          </InputGroup>
        </FormItem>

        <FormItem prop="email">
          <InputGroup :placeholder="$t('i.form.email')" icon="ios-email-outline">

            <Input slot="input"
              :maxlength="40"
              v-model="form.email"
            />

          </InputGroup>
        </FormItem>

        <FormItem prop="username">
          <InputGroup :placeholder="$t('i.form.user')" icon="ios-person-outline">

            <Input slot="input"
              :maxlength="24"
              v-model="form.username"
            />

          </InputGroup>
        </FormItem>

        <FormItem prop="password">
          <InputGroup :placeholder="$t('i.form.pass')" icon="ios-locked-outline">

            <Input slot="input"
              :maxlength="16"
              v-model="form.password"
            />

          </InputGroup>
        </FormItem>

        <FormItem class="pd-t5">
          <Button type="primary" size="large"
            class="min-w100"
            :loading="loading"
            @click="touch('store')">
            <span v-if="!loading">{{ $t('i.form.button.save') }}</span>
            <span v-else>{{ $t('i.select.loading') }}...</span>
          </Button>

          <router-link :to="{name: 'auth.panel'}">
            <Button type="text" size="large">
              {{ $t('i.form.button.cancel') }}
            </Button>
          </router-link>

        </FormItem>

      </Form>
    </Row>

  </Row>
</template>

<script>
import verify from '~/components/validator'

export default {
  data () {
    return {
      head: {
        back:  'auth.panel',
        title: 'Create New Account'
      },
      form: {
        permis:  1,
        display: '',
        email: '',
        username: '',
        password: ''
      },
      rule: {
        permis:   [verify.fill],
        display:  [verify.fill],
        email:    [verify.fill, verify.email],
        username: [verify.fill, verify.default],
        password: [verify.fill, verify.default]
      },
      loading: false
    }
  },

  methods: {
    touch (name) {
      const _al = this.$Message
      this.$refs[name].validate((verify) => {
        if (!verify) _al.warning(this.$t('i.notice.warning'))
        else {
          _al.success(this.$t('i.notice.success'))
          this.$Loading.start()
          // this.login(this.form)
        }
      })
    }
  }
}
</script>
