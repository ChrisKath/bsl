<template lang="html">
  <Modal v-model="visible"
    :class-name="`ivu-madal--languages`"
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
    modalSwitch () {
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

<style lang="less" scoped>
.ivu--lang {
  &-group {
    &:not(:last-child) {
      margin: 0 0 15px;
      padding: 0 0 15px;
      border-bottom: solid 1px hsl(220, 10%, 94%);
    }

    h3 { font-weight: bolder }
  }

  &-list {
    li {
      display: inline-block;
      min-width: 110px;
      min-height: 26px;
    }

    .ivu--switch {
      color: darken(#80848F, 12%);

      &:hover {
        color: lighten(#2D8CF0, 8%);
        text-decoration: underline;
      }

      &.ivu--focus {
        font-weight: 600;
        color: lighten(#2D8CF0, 12%);
      }
    }
  }
}
</style>
