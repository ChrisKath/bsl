<template lang="html">
  <Modal class-name="ivu-locale" width="auto"
    v-model="visible"
    :scrollable="true"
    :footerHide="true">

    <Row class-name="ivu-group"
      v-for="(data, key) in internationalization" :key="key.id">

      <div class="size-14 size-w700 mg-b10" v-text="key"/>

      <Row>
        <Col v-for="(item, key) in $lodash.orderBy(data, ['lang'], ['desc'])"
          :key="item.id"
          :span="4">

          <Button type="text"
            @click="onSwitch(item.locale)"
            :class="{
              'onFocus': (item.locale === $i18n.locale)
            }">

            {{ item.lang }}
          </Button>

        </Col>
      </Row>
    </Row>

  </Modal>
</template>

<script>
import { messages, take } from '~/i18n'

export default {
  name: 'Languages',
  data () {
    return {
      visible: false
    }
  },

  methods: {
    onSwitch (param) {
      if (this.$i18n.locale !== param) {
        take(param)
        this.visible = false
      }
    },

    open () {
      this.visible = true
    }
  },

  computed: {
    internationalization () {
      const language = {}

      Object.keys(messages).forEach(key => {
        let isKey = messages[key].i
        let continent = isKey.continent
        if (!language[continent]) language[continent] = []
        language[continent].push({
          'lang':   isKey.lang,
          'locale': isKey.locale
        })
      })

      return language
    }
  }
}
</script>
