<template lang="html">
  <Row class-name="ivu-panel">

    <Row type="flex" align="middle" justify="start"
      class-name="ivu-row-head">
      <Col>
        <router-link :to="{name: 'auth.panel.add'}">
          <Button class="ivu-btn-add txt-up size-14 size-w600 flexed"
          type="primary"
          icon="ios-personadd-outline">@New</Button>
        </router-link>
      </Col>

      <Col class="mg-l20 size-17 size-w600">
        Admin Panel
      </Col>
    </Row>

    <Row class-name="ivu-row-body pd-15">

      <Col class-name="ivu-col-card mg-20 pd-15 pd-b25"
        v-for="i in 9"
        :key="i.id"
        :class="{'ROOT': i === 1}">

        <Icon :type="i === 1 ? 'ios-world' : 'ribbon-b'" class="ivu-root size-24 primary"
          :class="{'error': i === 1}"
          v-if="i < 4"/>

        <Avatar icon="person"/>

        <div class="ivu-display mg-t20 pd-b10 size-17 size-w700">
          <div class="txt-up size-10" v-if="i === 1">root</div>
          <div class="txt-up size-10" v-else>{{ i < 4 ? 'admin' : 'member' }}</div>
          <p>DISPLAY NAME</p>
        </div>

        <div class="ivu-more pd-t10 pd-b10 size-12 txt-c">
          <p>username</p>
          <p>email address</p>
        </div>

        <ButtonGroup size="small">
          <router-link :to="{name: 'auth.panel.id', params: {id: `user${i}`}}">
            <Button :type="i === 1 ? 'error' : 'primary'" icon="settings"/>
          </router-link>
          <Button :type="i === 1 ? 'error' : 'primary'" icon="refresh"/>
        </ButtonGroup>
      </Col>

    </Row>

  </Row>
</template>

<script>
export default {
}
</script>
