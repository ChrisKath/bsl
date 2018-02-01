<template lang="html">
  <Layout aria-core="Core Program" id="app-wrap">
    <Nav :auth="authen"/>

    <Content class="layout-content">
      <router-view/>
    </Content>
  </Layout>
</template>

<script>
import { mapGetters } from 'vuex'
import cookieStore from 'vue-cookie'
import Navigation from '~/components/layout/navigation'

export default {
  methods: {
    timer () {
      setInterval(() => {
        let cookie = cookieStore.get(this.$typeA)
        console.log(cookie)
        // clearInterval(null)
      }, 1000)
      // }, 15 * 60 * 1000) // 15m
    },

    touch () {
      window.addEventListener('click', events => {
        console.log(events)
      })
    }
  },

  computed: mapGetters({
    authen: 'auth/check'
  }),

  beforeUpdate () {
    if (this.authen) {
      this.timer()
      this.touch()
    }
  },

  components: {
    'Nav': Navigation
  }
}
</script>
