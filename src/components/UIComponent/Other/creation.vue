<template lang="html">
  <Modal v-model="visible"
    class-name="ivu-modal-create"
    :scrollable="true"
    :mask-closable="false"
    @on-visible-change="open">
    <div slot="header" class="size-24 size-w700">{{ $t('i.menu.createlink') }}</div>

    <Form :ref="form.ref" :model="form" :rules="rule">
      <FormItem class>
        <Alert show-icon>e.g. <code>{{ $uri }}VMLxoY0</code></Alert>
      </FormItem>

      <FormItem class="mg-b20">
        <Input disabled :placeholder="$uri">
          <Icon disabled slot="append" type="chevron-right"/>
        </Input>
      </FormItem>

      <FormItem prop="url" class="mg-b20">
        <label for="long-url" class="size-12 size-w700 pd-t15 pd-r15 pd-l15">
          {{ $t('i.form.longurl') }}
        </label>
        <Input type="textarea" element-id="long-url" size="large"
          v-model="form.url"
          :autosize="{minRows: 2}"
        />
      </FormItem>

      <FormItem prop="exp" class="mg-b20">
        <label for="long-url" class="size-12 size-w700 pd-t15 pd-r15 pd-l15">
          {{ $t('i.datepicker.selectDate') }}
        </label>
        <DatePicker type="date"
          v-model="form.exp"
          format="yyyy MM dd"
        />
      </FormItem>

      <FormItem>
        <Select remote multiple filterable
          placeholder="@tag"
          v-model="form.tags">
          <Option v-for="(item, key) in items"
            :value="item.name"
            :key="item.id"
            :text="item.name"
          />
        </Select>
      </FormItem>
    </Form>

    <Row slot="footer" type="flex" align="middle" justify="space-around">
      <!-- <Col span="11">
        <Button type="ghost" class="size-w600"
          @click="open(false)">
          {{ $t('i.form.button.cancel') }}
        </Button>
      </Col> -->

      <Col span="24">
        <Button type="primary" class="size-16 size-w700"
          :loading="i.loading"
          @click="onTouch">
          <span v-if="!i.loading">{{ $t('i.menu.create') }}</span>
          <span v-else>{{ $t('i.select.loading') }}...</span>
        </Button>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
import verify from '~/components/validator'

export default {
  name: 'Createlink',
  data () {
    return {
      visible: false,
      i: {loading: false},
      form: {
        ref: 'create',
        url: '',
        exp: '',
        tags: []
      },
      rule: {
        url: [verify.fill, verify.url],
        exp: [verify.fill]
      },
      tagList: [
        {value: 'New York'},
        {value: 'London'},
        {value: 'Sydney'}
      ]
    }
  },

  methods: {
    open (bool = true) {
      this.visible = bool
      if (bool) {
        this.form.tags = []
        this.$refs[this.form.ref].resetFields()
      }
    },

    onTouch () {
      this.$refs[this.form.ref].validate(Verify => {
        let msn = this.$Message
        if (!Verify) {
          msn.warning(this.$t('i.notice.warning'))
        } else {
          msn.success(this.$t('i.notice.success'))
          this.myTest()
        }
      })
    },

    myTest () {
      this.i.loading = true
      setTimeout(() => {
        this.i.loading = false
        this.$Notice.success({
          duration: 2.4,
          title: 'Notification',
          desc: 'Here is the notification description.'
        })
        setTimeout(() => this.open(false), 2400)
      }, 3200)
    }
  },

  computed: mapGetters({
    items: 'manage.tag/tags'
  })
}
</script>
