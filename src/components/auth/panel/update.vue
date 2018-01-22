<template lang="html">
  <Row class-name="ivu-panel-update">

    <RowHead router-back="auth.panel" title-name="DISPLAY NAME">
      <Col slot="col-2">
        <span class="size-14 size-w700 txt-up mg-r5">{{ $t('i.form.button.enable') }}:</span>
        <Switch size="large" v-model="io">
          <span slot="open">{{ $t('i.form.button.on') }}</span>
          <span slot="close">{{ $t('i.form.button.off') }}</span>
        </Switch>
      </Col>
    </RowHead>

    <Row class-name="ivu-row-body pd-15">
      9
    </Row>

  </Row>
</template>

<script>
export default {
  name: 'panelUpdate',

  data () {
    return {
      io: false
    }
  }
}
</script>
