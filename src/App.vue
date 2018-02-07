<template lang="html">
  <Layout aria-core="Core Program" id="app-wrap">
    <Nav :auth="authen"/>

    <Content class="layout-content">
      <router-view/>
    </Content>
  </Layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navigation from '~/components/layout/navigation'

export default {
  methods: mapActions({
    fetchAuth: 'authen/fetchAuth',
    enableVerifyCookies: 'authen/verifyCookies'
  }),

  computed: mapGetters({
    authen: 'authen/check'
  }),

  async created () {
    await this.fetchAuth(true)
  },

  mounted () {
    this.$nextTick(() => {
      if (this.authen) this.enableVerifyCookies()
    })
  },

  components: {
    'Nav': Navigation
  }
}
</script>
