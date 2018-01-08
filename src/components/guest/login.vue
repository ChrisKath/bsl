<template lang="html">
  <Layout class="v--login">
    <Header>
      <div class="v-layout-logo">
        {{ $t('i.table.noDataText') }}
      </div>
    </Header>

    <Content>
      <Button @click="info(false)">{{ $t('i.modal.okText') }}</Button>
    </Content>

    <Footer class="layout-footer"
      v-html="`&copy;2018 TAP Technology Company Limited. all rights reserved.`"
    />
  </Layout>
</template>

<script>
export default {
  methods: {
    info (nodesc) {
      this.$Notice.info({
        title: 'Notification title',
        desc: nodesc
          ? ''
          : 'Here is the notification description. Here is the notification description.'
      })
      this.$lang.take('ko-KR')
    }
  }
}
</script>
