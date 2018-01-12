<template lang="html">
  <Modal v-model="visible"
    class-name="ivu-modal--languages"
    :width="600"
    :scrollable="true"
    :footerHide="true">

    <div class="ivu--lang-group" v-for="(obj, name) in internationalization">
      <h3 class="mg-b10" size="large" v-text="name"/>

      <ul class="ivu--lang-list">
        <li v-for="key in $lodash.orderBy(obj, 'lang', 'desc')">

          <a v-text="key.lang"
            :class="{
              'ivu--switch': true,
              'ivu--focus': (key.locale === $i18n.locale)
            }"
            @click="languageSwitch(key.locale)"
          />

        </li>
      </ul>
    </div>

  </Modal>
</template>

<script>
import ILanguage from '~/locale/lang.all'

export default {
  name: 'Languages',
  data () {
    return {
      lang: ILanguage,
      visible: false
    }
  },

  methods: {
    languageSwitch (c) {
      if (this.$i18n.locale !== c) {
        this.$Loading.start()
        setTimeout(() => {
          this.visible = false
          this.$lang.take(c)
          this.$Loading.finish()
        }, 320)
      }
    },
    open () {
      this.visible = true
    }
  },

  computed: {
    internationalization () {
      const language = {}

      Object.keys(this.lang).forEach(key => {
        var iKey = this.lang[key].i
        var continent = iKey.continent
        if (!language[continent]) language[continent] = []
        language[continent].push({
          'lang':   iKey.lang,
          'locale': iKey.locale
        })
      })

      return language
    }
  }
}
</script>
