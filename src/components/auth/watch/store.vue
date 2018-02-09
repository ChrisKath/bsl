<template lang="html">
  <Row class-name="ivu-watch-store">
    <RowHead :route-back="back" :title-name="info"/>

    <Row class-name="ivu-row-body">
      <Form :ref="i.name"
        :model="form"
        :rules="rule"
        @keyup.enter.native="touch">

        <FormItem class="mg-b10">
          <Alert show-icon type="error">
            <Icon slot="icon" type="ios-information"/>
            Fill out the required fields (marked with *) in the form below.
          </Alert>
        </FormItem>

        <!-- ############################################################### -->
        <!-- Display Name -->
        <FormItem v-if="i.type.edit || i.type.advanced">
          <InputGroup icon="ios-compose-outline"
            :placeholder="$t('i.form.display')">

            <Input slot="input" type="text"
              v-model="form.name"
            />

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Short key -->
        <FormItem v-if="i.type.edit" prop="key">
          <InputGroup icon="ios-world-outline" required
            :placeholder="$uri">

            <Input slot="input" type="text"
              :disabled="false"
              v-model="form.key"
            />

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Long URL Area -->
        <FormItem prop="href">
          <InputGroup icon="ios-world-outline" required
            :placeholder="$t('i.form.longurl')">

            <Input slot="input" v-model="form.href"
              type="textarea"
              :autosize="{ minRows: 2 }"
            />

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Tags Selection -->
        <FormItem>
          <InputGroup icon="ios-pricetags-outline"
            :placeholder="$t('i.title.tag')">

            <Select remote multiple filterable placeholder
              slot="input"
              placement="bottom"
              v-model="form.tags">

              <Option v-for="(tag, key) in tags"
                :key="key.id"
                :value="tag.id"
                :label="tag.name"
              />
            </Select>

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Expiry Date -->
        <FormItem v-if="i.type.edit || i.type.advanced">
          <InputGroup icon="ios-calendar-outline"
            :placeholder="`expiry date`">

            <DatePicker slot="input" type="date" :placeholder="null"
              placement="top-start"
              v-model="form.expiry"
            />

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Redirect to ... when expiry -->
        <FormItem v-if="!i.type.normal && form.expiry" prop="redir">
          <InputGroup icon="ios-navigate-outline" required
            :placeholder="`redirect to ... when expiry`">

            <Input slot="input" type="textarea"
              v-model="form.redir"
              :autosize="{minRows: 2}"
            />

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Button Row -->
        <FormItem>
          <Button type="primary" size="large" class="min-w200 size-w700"
            :loading="i.loading"
            @click="touch">

            <span v-if="!i.loading">
              {{i.route.type==='edit'?$t('i.form.button.save'):$t('i.menu.create')}}
            </span>
            <span v-else>{{ $t('i.select.loading') }}...</span>

          </Button>

          <router-link :to="back">
            <Button type="text" size="large" class="min-w100">
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
      title:  null,
      key:    null,
      href:   null,
      expiry: null,
      redir:  null,
      tags:   []
    },
    rule: {
      key:    [verify.fill],
      href:   [verify.fill, verify.url],
      redir:  [verify.fill, verify.url]
    }
  }
}

export default {
  data () {
    return {
      ...new FormData(),
      i: {
        loading: false,
        name: 'watch',
        route: {key: 'add', type: 'normal'},
        type: {edit: 0, normal: 0, advanced: 0}
      }
    }
  },

  methods: {
    ...mapActions({
      call: 'manage.tag/call',
      add: 'manage.watch/add'
    }),

    touch () {
      this.$refs[this.i.name].validate(Verify => {
        if (!Verify) {
          this.$message.warning(
            this.$t('i.notice.warning')
          )
        } else {
          this.i.loading = true

          const normal = {
            href: this.form.href,
            tags: this.form.tags
          }

          setTimeout(() => {
            this.add(
              this.i.type.normal
                ? normal
                : this.form
            )
          }, 2560)
        }
      })
    },

    hash (href) {
      return new URL(href)
        .hostname
        .replace('www.', '')
    },

    setup () {
      this.i.route = this.$route.params
      this.i.type.edit = (this.i.route.type === 'edit') ? 1 : 0
      this.i.type.normal = (this.i.route.type === 'normal') ? 1 : 0
      this.i.type.advanced = (this.i.route.type === 'advanced') ? 1 : 0
    }
  },

  computed: {
    ...mapGetters({
      tags: 'manage.tag/tags'
    }),

    // #########################################################################
    // ### Header info scope.
    back () {
      return (this.$route.params.type === 'edit')
        ? {name: 'auth.watch', params: {key: this.$route.params.key}}
        : {name: 'auth.main'}
    },
    info () {
      let normal = `${this.$t('i.menu.createlink')}&nbsp;
        <i class="txt-cap size-w100">
          (${this.$route.params.type})
        </i>`

      return (this.$route.params.type === 'edit')
        ? 'SHORT-LINK-NAME'
        : normal
    }
    // #########################################################################
  },

  mounted () {
    this.$nextTick(async () => {
      if (!this.tags.length) await this.call()
      this.setup()
    })
  },

  updated () {
    this.$nextTick(async () => {
      if (!this.tags.length) await this.call()
      this.setup()
    })
  },

  destroyed () {
    this.form = new FormData().form
  }
}
</script>
