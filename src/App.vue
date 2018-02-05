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
import cookieStore from 'vue-cookie'
import Navigation from '~/components/layout/navigation'

export default {
  methods: mapActions({
    signout: 'authen/signout',
    reCookies: 'authen/cookies'
  }),

  computed: mapGetters({
    authen: 'authen/check'
  }),

  updated () {
    if (this.authen) {
      this.reCookies()
      const valve = setInterval(() => {
        if (!cookieStore.get(this.$typeA)) {
          this.signout()
          clearInterval(valve)
        }
      }, 1280)
    }
  },

  components: {
    'Nav': Navigation
  }
}
</script>
