<template lang="html">
  <Header class="layout-header">
    <div class="ivu-nav--logo" v-text="$t('i.table.noDataText')"/>

    <div class="ivu-nav--lang" @click="$refs.l.modalSwitch()">
      <i class="fa fa-language vta-m mg-r8 size-15"/>
      <span aria-label="languages">
        {{ $t('i.lang') }}
      </span>
      <Languages ref="l"/>
    </div>

  </Header>
</template>

<script>
import ILanguages from 'Comp/UIComponent/Other/language'

export default {
  props: {
    auth: {
      type: Boolean,
      default: false
    }
  },

  components: {
    'Languages': ILanguages
  }
}
</script>
