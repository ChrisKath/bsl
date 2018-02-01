<template lang="html">
  <Modal v-model="visible"
    class-name="ivu-create-link"
    class="ivu-create-link"
    width="auto"
    :scrollable="true"
    :mask-closable="false"
    @on-visible-change="open">
    <div slot="header" class="size-25 size-w800">{{ $t('i.menu.createlink') }}</div>

    <Form :ref="form.ref" :model="form" :rules="rule">

      <FormItem v-if="serve">
        <InputGroup :placeholder="$t('i.form.display')" icon="ios-flag-outline">

          <Input slot="input" type="text"
            v-model="form.name"
          />

        </InputGroup>
      </FormItem>

      <FormItem v-if="serve" prop="key">
        <InputGroup :placeholder="$uri" icon="ios-world-outline">

          <Input slot="input" type="text"
            :disabled="!serve"
            v-model="form.key"
          />

        </InputGroup>
      </FormItem>

      <FormItem prop="href">
        <InputGroup :placeholder="$t('i.form.longurl')" icon="ios-world-outline">

          <Input slot="input" type="textarea"
            v-model="form.href"
            :autosize="{minRows: 2}"
          />

        </InputGroup>
      </FormItem>

      <FormItem>
        <InputGroup :placeholder="$t('i.title.tag')" icon="ios-pricetags-outline">

          <Select remote multiple filterable placeholder
            slot="input"
            placement="bottom"
            v-model="form.tags">

            <Option v-for="(tag, key) in $lodash.orderBy(tags, ['name'], ['asc'])"
              :value="tag.name"
              :key="tag.id"
              :text="tag.name"
            />

          </Select>

        </InputGroup>
      </FormItem>

      <FormItem v-if="serve" prop="expiry">
        <InputGroup placeholder="expiry date" icon="ios-calendar-outline">

          <DatePicker slot="input" type="date" :placeholder="null"
            placement="top-start"
            v-model="form.expiry"
          />

        </InputGroup>
      </FormItem>

      <FormItem v-if="serve && form.expiry" prop="redir">
        <InputGroup placeholder="redirect to ... when expiry" icon="ios-navigate-outline">

          <Input slot="input" type="textarea"
            v-model="form.redir"
            :autosize="{minRows: 2}"
          />

        </InputGroup>
      </FormItem>
    </Form>

    <Row slot="footer">
      <Button type="text" class="size-14 size-w600"
        @click="open(false)">
        {{ $t('i.form.button.cancel') }}
      </Button>

      <Button type="primary" class="size-14 size-w600 min-w150"
        :loading="i.loading"
        @click="touch">

        <span v-if="!i.loading">{{ $t('i.menu.create') }}</span>
        <span v-else>{{ $t('i.select.loading') }}...</span>

      </Button>
    </Row>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import verify from '~/components/validator'

export default {
  data () {
    return {
      i: { loading: false },
      visible: false,
      serve: false,
      form: {
        ref: 'watch',
        name: null,
        key: null,
        href: null,
        expiry: null,
        redir: null,
        tags: []
      },
      rule: {
        key:  [verify.fill, verify.default],
        href: [verify.fill, verify.url]
      }
    }
  },

  methods: {
    ...mapActions({
      add: 'manage.watch/add',
      update: 'manage.watch/update'
    }),

    open (bool = true, hook = false) {
      this.visible = bool
      this.i.loading = false

      if (!this.visible) {
        this.serve = false
        this.form.tags = []
        this.$refs[this.form.ref].resetFields()
      }

      if (hook) this.observe(hook)
    },

    touch () {
      this.$refs[this.form.ref].validate(Verify => {
        if (!Verify) {
          this.$message.warning(
            this.$t('i.notice.warning')
          )
        } else {
          this.i.loading = true

          if (this.serve) {
            const data = Object.assign({
              currentKey: this.$route.params.key
            }, this.form)

            setTimeout(() => this.update(data), 999)
          } else {
            setTimeout(() => this.add(this.form), 999)
          }

          setTimeout(() => this.open(false), 1280)
        }
      })
    },

    observe (key) {
      const query = this.$lodash.find(this.watch, [
        'key', key
      ])

      // set components type.
      this.serve = true

      // setupData form.
      this.form.name = query.name
      this.form.key = query.key
      this.form.href = query.href
      this.form.tags = query.tags
      this.form.expiry = query.expiry || null
      this.form.redir = query.redir || null
    }
  },

  computed: mapGetters({
    tags: 'manage.tag/tags',
    watch: 'manage.watch/watch'
  })
}
</script>
