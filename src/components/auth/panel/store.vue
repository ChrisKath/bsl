<template lang="html">
  <Row class-name="ivu-panel-store">
    <RowHead :router-back="head.back" :title-name="head.title"/>

    <Row class-name="ivu-row-body"
      :class="[
        (head.type === 'edit')
          ? 'pd-t20 pd-r40 pd-b40 pd-l40'
          : 'pd-40'
      ]">

      <Form ref="store"
        :model="form"
        :rules="rule"
        @keyup.enter.native="touch('store')">

        <FormItem class="size-13" v-if="head.type === 'edit'">
          <span class="mg-r25">
            <strong>{{ $t('i.title.created') }}:</strong>
            <i class="pd-l5 txt-up">{{ new Date() | moment('ll') }}</i>
            <a class="pd-r5">(ゴジです)</a>
          </span>

          <span class>
            <strong>{{ $t('i.title.updated') }}:</strong>
            <i class="pd-l5 txt-up">{{ new Date() | moment('ll') }}</i>
            <a class="pd-r5">(ゴジです)</a>
          </span>
        </FormItem>

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

        <FormItem prop="name">
          <InputGroup :placeholder="$t('i.form.display')" icon="ios-compose-outline">

            <Input slot="input"
              :maxlength="16"
              v-model="form.name"
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

        <FormItem prop="password" v-if="form.password !== 'none'">
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
            :loading="i.loading"
            @click="touch('store')">
            <span v-if="!i.loading">{{ $t('i.form.button.save') }}</span>
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
import { mapGetters, mapActions } from 'vuex'
import verify from '~/components/validator'

export default {
  data () {
    return {
      i: { loading: false },
      head: {
        type: 'add',
        back: 'auth.panel',
        title: this.$t('i.title.createAccount')
      },
      form: {
        permis:  1,
        name: null,
        email: null,
        username: null,
        password: null
      },
      rule: {
        permis:   [verify.fill],
        name:     [verify.fill],
        email:    [verify.fill, verify.email],
        username: [verify.fill, verify.default],
        password: [verify.fill, verify.default]
      }
    }
  },

  methods: {
    ...mapActions({
      add:  'manage.account/add',
      edit: 'manage.account/edit'
    }),

    touch (name) {
      this.$refs[name].validate((verify) => {
        if (!verify) {
          this.$message.warning(
            this.$t('i.notice.warning')
          )
        } else {
          this.$message.success(
            this.$t('i.notice.success')
          )
          this.i.loading = true
          // this.$Loading.start()

          setTimeout(() => {
            this.i.loading = false
            if (this.head.type === 'add') {
              this.add(this.form)
            }

            if (this.head.type === 'edit') {
              const data = Object.assign({
                uid: this.$route.params.key
              }, this.form)

              delete data.password
              this.edit(data)
            }
          }, 2560)
        }
      })
    },

    async observe () {
      const fined = await this.$lodash.find(this.item, {
        uid: this.$route.params.key
      })
      if (fined === undefined) {
        return this.$router.push({name: 'auth.panel'})
      }

      // setup header info
      this.head.type = 'edit'
      this.head.title = fined.name

      // setup form data
      this.form.permis = fined.permis
      this.form.name = fined.name
      this.form.email = fined.email
      this.form.username = fined.username
      this.form.password = 'none'
    }
  },

  computed: mapGetters({
    item: 'manage.account/accounts'
  }),

  created () {
    if (this.$route.params.type === 'edit' && this.$route.params.key) {
      this.observe()
    }
  }
}
</script>
