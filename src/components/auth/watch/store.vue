<template lang="html">
  <Row class-name="ivu-watch-store">
    <RowHead :route-back="back" :title-name="info"/>

    <Row class-name="ivu-row-body">
      <Form :ref="i.name"
        :model="form"
        :rules="rule"
        @keyup.enter.native="touch">

        <FormItem class="mg-b10">
          <Alert show-icon>
            <Icon slot="icon" type="ios-information"/>
            Fill out the required fields (marked with *) in the form below.
          </Alert>

          <Alert show-icon v-if="i.type.advanced">
            More information and examples for Campaign URL builder
            <a href="//ga-dev-tools.appspot.com/campaign-url-builder"
              target="_blank" class="size-w700">
              Click here.
            </a>
          </Alert>
        </FormItem>

        <!-- ############################################################### -->
        <!-- Campaign URL Builder -->
        <FormItem v-if="i.type.advanced">

          <Campaign ref="campaign" @on-emit="campaign"/>

        </FormItem>

        <!-- ############################################################### -->
        <!-- Display Name -->
        <FormItem v-if="i.type.edit || i.type.advanced">
          <InputGroup icon="ios-compose-outline"
            :placeholder="$t('i.form.display')">

            <Input slot="input" type="text"
              v-model="form.title"
            />

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Short key -->
        <FormItem v-if="i.type.edit" prop="key">
          <InputGroup icon="ios-world-outline" required
            :placeholder="$uri">

            <Input slot="input" type="text"
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
              :readonly="Boolean(i.type.advanced)"
            />

          </InputGroup>
        </FormItem>


        <!-- ############################################################### -->
        <!-- Tags Selection -->
        <FormItem>
          <InputGroup icon="ios-pricetags-outline"
            :placeholder="$t('i.title.tag')">

            <Select multiple filterable placeholder
              slot="input"
              placement="bottom"
              v-model="form.tags">

              <Option v-for="tag in tags"
                :value="tag.id"
                :label="tag.name"
                :key="tag.id"
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
              {{i.type.edit?$t('i.form.button.save'):$t('i.menu.create')}}
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
import Campaign from '~/components/layout/campaign'
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
        type: {edit: false, normal: false, advanced: false}
      }
    }
  },

  methods: {
    ...mapActions({
      call: 'manage.tag/call',
      add: 'manage.watch/add',
      update: 'manage.watch/update'
    }),

    touch () {
      this.$refs[this.i.name].validate(bool => {
        if (!bool) {
          this.$message.warning(
            this.$t('i.notice.warning')
          )
        } else {
          this.i.loading = true

          const normal = {
            href: this.form.href,
            tags: this.form.tags
          }

          setTimeout(async call => {
            if (this.i.type.edit) {
              if (!this.form.expiry) this.form.redir = null
              const res = await this.update({
                id: this.watch.key,
                form: this.form
              })
              if (!res) this.i.loading = false
            } else {
              this.add(this.i.type.normal ? normal : this.form)
            }
          }, 512)
        }
      })
    },

    campaign (url) {
      this.form.href = url.trim()
    },

    hash (href) {
      return new URL(href)
        .hostname
        .replace('www.', '')
    },

    setup () {
      this.i.route = this.$route.params
      this.i.type.edit = (this.i.route.type === 'edit')
      this.i.type.normal = (this.i.route.type === 'normal')
      this.i.type.advanced = (this.i.route.type === 'advanced')
    },

    mock () {
      if (this.check) {
        this.form.title   = this.watch.title
        this.form.key     = this.watch.key
        this.form.href    = this.watch.href
        this.form.expiry  = this.watch.expiry
        this.form.redir   = this.watch.redirect
        this.watch.tags.forEach((item, key) => {
          this.form.tags.push(item.id)
        })
      } else {
        this.$router.push({
          name: 'auth.watch',
          params: {key: this.$route.params.key}
        })
      }
    }
  },

  computed: {
    ...mapGetters({
      tags: 'manage.tag/tags',
      watch: 'manage.watch/watch',
      check: 'manage.watch/check'
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
        ? this.watch.title
        : normal
    }
    // #########################################################################
  },

  mounted () {
    this.$nextTick(async () => {
      if (!this.tags.length) await this.call()
      await this.setup()
      if (this.i.type.edit) this.mock()
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
  },

  components: {
    'Campaign': Campaign
  }
}
</script>
