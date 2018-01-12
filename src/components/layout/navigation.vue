<template lang="html">
  <Header class="layout-header">
    <div class="ivu-nav ivu-nav--logo" v-text="$t('i.table.noDataText')"/>

    <Navigator v-if="auth"/>
    <div v-else class="ivu-nav ivu-nav--lang" @click="$refs.l.open()">
      <i class="fa fa-language vta-m mg-r5 size-15"/>
      <span v-text="$t('i.lang')"/>
      <Languages ref="l"/>
    </div>
  </Header>
</template>

<script>
import INavigator from 'Comp/UIComponent/navigator'

export default {
  props: {
    auth: {
      type: Boolean,
      default: false
    }
  },

  components: {
    'Navigator': INavigator
  }
}
</script>
