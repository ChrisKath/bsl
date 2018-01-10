<template lang="html">
  <Layout aria-core="Core Program" id="app-wrap">
    <Navigation :auth="authenticated"/>

    <Content class="layout-content">
      <router-view/>
    </Content>

    <Footer class="layout-footer" v-if="authenticated">
      <p class="size-11"
        v-html="`&copy;2018 TAP Technology Company Limited. all rights reserved.`"/>
    </Footer>
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import INavigation from 'Comp/layout/navigation'

export default {
  computed: mapGetters({
    authenticated: 'auth/check'
  }),

  components: {
    'Navigation': INavigation
  }
}
</script>
