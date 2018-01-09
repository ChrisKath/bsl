<template lang="html">
  <div class="ivu--modal-lang">
    <div class="ivu--modal-group"
      v-for="(obj, name) in internationalization"
    >

      <h3 size="large" v-text="name"/>

      <ul class="ivu--modal-list">
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
  </div>
</template>

<script>
import ILanguage from '~/locale/lang.all'

export default {
  data () {
    return {
      lang: ILanguage
    }
  },

  props: {
    closeModal: {
      type: Function,
      required: true
    }
  },

  methods: {
    languageSwitch (lng) {
      if (lng === this.$i18n.locale) return
      this.$Loading.start()
      setTimeout(() => {
        this.$lang.take(lng)
        this.closeModal(false)
        this.$Loading.finish()
      }, 320)
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

<style lang="less" scoped>
.ivu--modal {
  &-lang {}

  &-group {
    &:not(:last-child) {
      margin: 0 0 15px;
      padding: 0 0 15px;
      border-bottom: solid 1px #e9eaec;
    }

    h3 {
      margin: 0 0 10px;
      font-weight: bolder;
    }
  }

  &-list {
    li {
      display: inline-block;
      min-width: 110px;
      min-height: 26px;
    }

    .ivu--switch {
      cursor: pointer;
      color: #80848f;

      &:hover { text-decoration: underline }
      &.ivu--focus {
        color: #5cadff;
        font-weight: 600;
      }
    }
  }
}
</style>
