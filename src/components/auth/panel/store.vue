<template lang="html">
  <Row class-name="ivu-panel-store">
    <RowHead :route-back="i.back" :title-name="info"/>

    <Row class-name="ivu-row-body"
      :class="[i.edit ? 'pd-t20 pd-r40 pd-b40 pd-l40' : 'pd-40']">

      <Form :ref="i.name"
        :model="form"
        :rules="rule"
        @keyup.enter.native="touch">

        <FormItem class="size-13" v-if="i.edit">
          <span class="mg-r25">
            <strong>{{ $t('i.title.created') }}:</strong>
            <i class="pd-l5 txt-up">
              {{ $moment(i.info.created_at).format('ll') }}
            </i>
            <a class="pd-r5">({{ i.info.created_by }})</a>
          </span>

          <span class>
            <strong>{{ $t('i.title.updated') }}:</strong>
            <i class="pd-l5 txt-up">
              {{ $moment(i.info.updated_at).format('ll') }}
            </i>
            <a class="pd-r5">({{ i.info.updated_by }})</a>
          </span>
        </FormItem>

        <FormItem prop="isAdmin">
          <RadioGroup v-model="form.isAdmin" type="button" size="large">
            <Radio :label="null" disabled>
              <Icon type="ios-world-outline"/>
              <span class="size-w600">{{ $t('i.form.root') }}</span>
            </Radio>
            <Radio :label="1">
              <Icon type="ribbon-b"/>
              <span class="size-w600">{{ $t('i.form.admin') }}</span>
            </Radio>
            <Radio :label="0">
              <Icon type="ios-person"/>
              <span class="size-w600">{{ $t('i.form.member') }}</span>
            </Radio>
          </RadioGroup>
        </FormItem>

        <FormItem prop="name">
          <InputGroup icon="ios-compose-outline" required
            :placeholder="$t('i.form.display')">

            <Input slot="input"
              :maxlength="16"
              v-model="form.name"
            />

          </InputGroup>
        </FormItem>

        <FormItem prop="email">
          <InputGroup :placeholder="$t('i.form.email')" icon="ios-email-outline" required>

            <Input slot="input"
              :maxlength="40"
              v-model="form.email"
            />

          </InputGroup>
        </FormItem>

        <FormItem prop="username">
          <InputGroup icon="ios-person-outline" required
            :placeholder="$t('i.form.user')">

            <Input slot="input"
              :maxlength="24"
              v-model="form.username"
            />

          </InputGroup>
        </FormItem>

        <FormItem prop="password" v-if="!i.edit">
          <InputGroup icon="ios-locked-outline" required
            :placeholder="$t('i.form.pass')">

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
            @click="touch">

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

function FormData () {
  return {
    form: {
      isAdmin:  0,
      name:     null,
      email:    null,
      username: null,
      password: null
    },
    rule: {
      isAdmin:  [verify.fill],
      name:     [verify.fill],
      email:    [verify.fill, verify.email],
      username: [verify.fill, verify.default],
      password: [verify.fill, verify.default]
    }
  }
}

export default {
  data () {
    return {
      ...new FormData(),
      i: {
        loading: false,
        info: [],
        edit: false,
        name: 'store',
        back: {name: 'auth.panel'}
      }
    }
  },

  methods: {
    ...mapActions({
      add: 'manage.account/add',
      update: 'manage.account/update'
    }),

    touch () {
      this.$refs[this.i.name].validate(h => {
        if (!h) this.$message.warning(this.$t('i.notice.warning'))
        else {
          this.$message.success(this.$t('i.notice.success'))
          this.i.loading = true

          setTimeout(async h => {
            const res = await (this.i.edit)
              ? this.update(this.form)
              : this.add(this.form)

            console.log(res)
            this.i.loading = false
          }, 1280)
        }
      })
    },

    observe () {
      const query = this.$lodash.find(this.users, {
        id: this.$route.params.key
      })
      if (query === undefined) {
        return this.$router.push({name: 'auth.panel'})
      }

      // setup form data
      delete this.form.password
      this.i.info         = query
      this.form.isAdmin   = query.isAdmin
      this.form.name      = query.name
      this.form.email     = query.email
      this.form.username  = query.username
    }
  },

  computed: {
    ...mapGetters({
      users: 'manage.account/users'
    }),

    // #########################################################################
    // ### Header info scope.
    info () {
      return (this.i.edit)
        ? `<span class=txt-up>${this.form.name}</span>`
        : this.$t('i.title.createAccount')
    }
    // #########################################################################
  },

  created () {
    if (this.$route.params.type === 'edit') {
      this.i.edit = true
      this.observe()
    }
  }
}
</script>
