<template lang="html">
  <Row type="flex" align="top" justify="start"
    class-name="ivu-qrcode pd-t15 mg-t25">

    <Qrcode class="vue-qrcode"
      :text="`${$uri}${watch.key}`"
      :logoCornerRadius="0"
      :logoMargin="5"
      :logoSrc="logoSrc"
      :size="size.valve"
      :margin="0"
      :callback="callback"
    />

    <div class="ivu-qr-form mg-l25">
      <Select placeholder="Size"
        v-model="size.valve"
        slot="input"
        placement="bottom">

        <Option v-for="(obj, key) in size.option"
          :key="key"
          :value="obj.value"
          :label="obj.label"
        />
      </Select>
    </div>

  </Row>
</template>

<script>
import Qrcode from 'vue-qr'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'QRCode',

  data () {
    return {
      size: {
        valve: 150,
        option: [
          {
            key: 1,
            value: 50,
            label: '50x50 pixel'
          },
          {
            key: 2,
            value: 150,
            label: '150x150 pixel'
          },
          {
            key: 3,
            value: 250,
            label: '250x250 pixel'
          },
          {
            key: 4,
            value: 350,
            label: '350x350 pixel'
          },
          {
            key: 5,
            value: 450,
            label: '450x450 pixel'
          },
          {
            key: 6,
            value: 512,
            label: '512x512 pixel'
          }
        ]
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

    callback (e) {
      console.log(e)      
    }
  },

  computed: {
    ...mapGetters({
      brands: 'manage.qr/brands',
      watch: 'manage.watch/watch'
    }),

    logoSrc () {
      const watch = this.$store.getters['manage.watch/watch']
      const brand = this.$store.getters['manage.qr/brands'].find(h => {
        return String(watch.href).match(h.name)
          ? h
          : undefined
      })
      
      return undefined !== brand
        ? require(`~/assets/img/brands/${brand.image}`)
        : null
    }
  },

  components: {
    Qrcode
  }
}
</script>