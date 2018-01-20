<template lang="html">
  <Row class-name="ivu-panel">

    <Row type="flex" align="middle" justify="space-between"
      class-name="ivu-row-head">
      <Col class="pd-l15 size-17 size-w600">
        Admin Panel
      </Col>

      <Col>
        <Button class="ivu-btn-add txt-up size-14 size-w600 flexed"
          type="primary"
          icon="ios-personadd-outline">@New</Button>
      </Col>
    </Row>

    <Row class-name="ivu-row-body">
      <Col :span="24">
        <div class="ivu-li ivu-role-haed">
          s
        </div>

        <div class="ivu-li">
          list
        </div>
      </Col>
    </Row>

  </Row>
</template>

<script>
export default {
}
</script>
