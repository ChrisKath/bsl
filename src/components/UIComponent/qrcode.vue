<template lang="html">
  <Modal class-name="ivu-qrcode" width="auto"
    v-model="visible"
    :closable="false" :scrollable="true">

    <Qrcode class="vue-qrcode"
      :text="`${$uri}${watch.key}`"
      :logoCornerRadius="0"
      :logoMargin="5"
      :logoSrc="logoSrc"
      :size="200"
      :margin="0"
    />

    <Alert show-icon>Demo size 200x200 pixel</Alert>

    <Checkbox v-model="branded" class="mg-b10">Use Branded Logo</Checkbox>

    <Select placeholder="Size"
      v-model="size.valve"
      placement="bottom">

      <Option v-for="(obj, key) in size.option"
        :key="key"
        :value="obj.value"
        :label="obj.label"
      />
    </Select>

    <a :href="`${dl.data}`" :download="`${dl.name}.png`"
      class="ivu-btn-dl mg-t10 size-w900 ivu-btn ivu-btn-primary">
      <Icon type="ios-download-outline" class="mg-r5"/>
      {{ $t('i.form.button.download') }}
    </a>

    <Qrcode :text="`${$uri}${watch.key}`"
      :logoCornerRadius="0"
      :logoMargin="5"
      :logoSrc="logoSrc"
      :size="size.valve"
      :margin="0"
      :callback="callback"
      style="display: none"
    />
  </Modal>
</template>

<script>
import Qrcode from 'vue-qr'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'QRCode',

  data () {
    return {
      visible: false,
      branded: true,
      size: {
        valve: 200,
        option: [
          {
            key: 1,
            value: 50,
            label: '50x50 pixel'
          },
          {
            key: 2,
            value: 100,
            label: '100x100 pixel'
          },
          {
            key: 3,
            value: 200,
            label: '200x200 pixel'
          },
          {
            key: 4,
            value: 300,
            label: '300x300 pixel'
          },
          {
            key: 5,
            value: 400,
            label: '400x400 pixel'
          },
          {
            key: 6,
            value: 512,
            label: '512x512 pixel'
          }
        ]
      },
      dl: {
        data: null,
        name: null
      }
    }
  },

  created () {
    this.call()
  },

  methods: {
    ...mapActions({
      call: 'manage.qr/call'
    }),

    open (bool = true) {
      this.visible = bool
    },

    callback (data) {
      const watch = this.$store.getters['manage.watch/watch']

      this.dl.data = data
      this.dl.name = `${this.$moment().format('YYYY-MM-DD')}_${watch.title}`
    }
  },

  computed: {
    ...mapGetters({
      brands: 'manage.qr/brands',
      watch: 'manage.watch/watch'
    }),

    logoSrc () {
      const watch = this.$store.getters['manage.watch/watch']

      if (!Object.keys(watch).length) return null

      const brand = this.$store.getters['manage.qr/brands'].find(h => {
        let domain = new URL(watch.href)
        return String(`${domain.hostname}`).match(h.name)
          ? h
          : undefined
      })
      
      return undefined !== brand && this.branded
        ? require(`~/../static/img/brands/${brand.image}`)
        : null
    }
  },

  components: {
    Qrcode
  }
}
</script>