<template lang="html">
  <Header class="layout-header">

    <router-link class="size-20 size-w800 ivu-nav ivu-nav-logo"
      v-text="`Brand Short Link`"
      :to="{name: 'auth.main'}"
    />

    <Button class="ivu-nav ivu-nav-lang"
      v-if="!auth"
      type="ghost"
      shape="circle"
      @click="$refs.l.open()">

      <i class="fa fa-language vta-m mg-r5 size-15"/>
      <span class="size-13"
        v-text="$t('i.lang')"
      />

      <Languages ref="l"/>
    </Button>

    <Navigator v-else/>

  </Header>
</template>

<script>
import INavigator from '~/components/UIComponent/navigator'

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
