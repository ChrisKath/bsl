<template lang="html">
  <Modal class-name="ivu-complex" width="auto"
    v-model="visible"
    :transfer="false"
    :closable="false"
    :scrollable="true"
    @on-visible-change="open">

    <Row type="flex" align="top" justify="space-between">
      <Col :span="11" class-name="ivu-added">
        <router-link :to="{name: 'auth.watch.add', params: { type: 'normal' }}">
          <Icon type="ios-compose-outline"></Icon>
          normal
        </router-link>
      </Col>

      <Col :span="11" class-name="ivu-added">
        <router-link :to="{name: 'auth.watch.add', params: { type: 'advanced' }}">
          <Icon type="ios-paper-outline"></Icon>
          advanced
        </router-link>
      </Col>
    </Row>

  </Modal>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },

  methods: {
    open (bool = true) {
      this.visible = bool
    }
  }
}
</script>
