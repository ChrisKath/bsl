<template lang="html">
  <Row class-name="ivu-row-head"
    type="flex"
    align="middle"
    justify="space-between">

    <Col class="flexed">
      <router-link :to="routeBack">
        <Button type="text" size="large" class="size-w800"
          icon="chevron-left">{{ $t('i.form.button.back') }}</Button>
      </router-link>

      <span class="cal-m mg-l15 size-24 size-w700 deep-black"
        v-html="titleName"/>
    </Col>

    <slot name="col-2"></slot>

  </Row>
</template>

<script>
export default {
  name: 'RowHead',
  props: {
    'title-name': {
      type: String,
      default: ''
    },
    'route-back': {
      type: [Object, Array],
      default: {
        name: 'auth.main'
      }
    }
  }
}
</script>
