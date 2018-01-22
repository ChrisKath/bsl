<template lang="html">
  <Row class-name="ivu-row-head"
    type="flex"
    align="middle"
    justify="space-between">

    <Col class="flexed">
      <router-link :to="{name: routerBack}">
        <Button type="text" size="large" class="size-w800"
          icon="chevron-left">{{ $t('i.form.button.back') }}</Button>
      </router-link>

      <span class="cal-m mg-l15 size-24 size-w700 deep-black">
        {{ titleName }}
      </span>
    </Col>

    <slot name="col-2"></slot>

  </Row>
</template>

<script>
export default {
  props: {
    'title-name': {
      type: String,
      default: ''
    },
    'router-back': {
      type: String,
      default: 'auth.main'
    }
  }
}
</script>
