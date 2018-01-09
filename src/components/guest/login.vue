<template lang="html">
  <Layout class="ivu--login">
    <NavBar class="ivu--nav"/>

    <Content>
      <Button @click="info(false)">{{ $t('i.modal.okText') }}</Button>
    </Content>

    <Footer class="layout-footer">
      <p>&copy;2018 TAP Technology Company Limited. all rights reserved.</p>
    </Footer>
  </Layout>
</template>

<script>
import iNavBar from '~/components/layout/nav'

export default {
  methods: {
    info (nodesc) {
      this.$Notice.info({
        title: this.$t('i.notic.title'),
        desc: nodesc
          ? ''
          : 'Here is the notification description. Here is the notification description.'
      })
    }
  },

  components: {
    'NavBar': iNavBar
  }
}
</script>
