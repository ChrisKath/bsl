<template lang="html">
  <Layout aria-core="Core Program" id="app-wrap">
    <Navigation :auth="authenticated"/>

    <Content class="layout-content">
      <router-view/>
    </Content>
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
