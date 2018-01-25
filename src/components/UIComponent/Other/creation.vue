<template lang="html">
  <Modal v-model="visible"
    class-name="ivu-create-link"
    class="ivu-create-link"
    width="auto"
    :transfer="false"
    :scrollable="true"
    :mask-closable="false"
    @on-visible-change="open">
    <div slot="header" class="size-25 size-w800">{{ $t('i.menu.createlink') }}</div>

    <Form :ref="form.ref" :model="form" :rules="rule">

      <FormItem class="mg-b20">
        <Input disabled :placeholder="$uri">
          <Icon disabled slot="append" type="chevron-right"/>
        </Input>
      </FormItem>

      <FormItem prop="url">
        <InputGroup :placeholder="$t('i.form.longurl')" icon="link">

          <Input slot="input" type="textarea"
            v-model="form.url"
            :autosize="{minRows: 2}"
          />

        </InputGroup>
      </FormItem>

      <FormItem>
        <InputGroup :placeholder="$t('i.title.tag')" icon="ios-pricetags">

          <Select remote multiple filterable placeholder
            slot="input"
            placement="top"
            v-model="form.tags">

            <Option v-for="(tag, key) in tags"
              :value="tag.name"
              :key="tag.id"
              :text="tag.name"
            />

          </Select>

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
      form: {
        ref: 'create',
        url: '',
        tags: []
      },
      rule: {
        url: [verify.fill, verify.url]
      }
    }
  },

  methods: {
    ...mapActions({
      add: 'manage.watch/add'
    }),

    open (bool = true) {
      this.visible = bool
      this.i.loading = false
      if (bool) {
        this.form.tags = []
        this.$refs[this.form.ref].resetFields()
      }
    },

    touch () {
      this.$refs[this.form.ref].validate(Verify => {
        if (!Verify) {
          this.$Message.warning(this.$t('i.notice.warning'))
        } else {
          this.i.loading = true
          this.add(this.form)
          this.open(false)
        }
      })
    }
  },

  computed: mapGetters({
    tags: 'manage.tag/tags'
  })
}
</script>
