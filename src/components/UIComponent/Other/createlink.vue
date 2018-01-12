<template lang="html">
  <Modal v-model="visible"
    class-name="ivu-modal-create"
    :width="600"
    :scrollable="true"
    :mask-closable="false">
    <div slot="header" class="size-w700">{{ $t('i.menu.createlink') }}</div>


    <Form ref="create"
      class="ivu-form-url"
      :model="form"
      :rules="rule"
      @keyup.enter.native="validate('create')">

      <FormItem class="mg-b20">
        <Input disabled placeholder="tap.co/">
          <Icon disabled slot="append" type="chevron-right"/>
        </Input>
      </FormItem>

      <FormItem prop="longurl" class="ivu-form-item-url">
        <label for="long-url" class="size-12 size-w700 pd-t15 pd-r15 pd-l15">
          {{ $t('i.form.longurl') }}
        </label>
        <Input type="textarea" element-id="long-url" size="large"
          v-model="form.longurl"
          :autosize="{minRows: 2}"/>
      </FormItem>

      <FormItem class>
        <Alert show-icon>e.g. <code>tap.co/2vifX4</code></Alert>
      </FormItem>

    </Form>


    <div slot="footer">
      <Button type="text" size="large" @click="visible = false">
        {{ $t('i.form.button.cancel') }}
      </Button>
      <Button type="warning" size="large" class="size-w600 min-w150"
        :loading="i.loading"
        @click="validate('create')">
        <span v-if="!i.loading">{{ $t('i.menu.create') }}</span>
        <span v-else>{{ $t('i.select.loading') }}...</span>
      </Button>
    </div>
  </Modal>
</template>

<script>
import verify from '~/components/validator'

export default {
  name: 'Createlink',
  data () {
    return {
      visible: false,
      i: {loading: false},
      form: {
        longurl: ''
      },
      rule: {
        longurl: [verify.fill, verify.url]
      }
    }
  },

  methods: {
    open () {
      this.visible = true
    },
    validate (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success(this.$t('i.notice.success'))
          this.i.loading = true
          setTimeout(() => {
            this.i.loading = false
            this.visible = false
            // this.$refs[name].resetFields()
          }, 2000)
        } else {
          this.$Message.warning(this.$t('i.notice.warning'))
        }
      })
    }
  }
}
</script>
