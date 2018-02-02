<template lang="html">
  <div class="ivu-noData" :class="{'noFixed': noFixed}">

    <Icon type="social-buffer"/>

    <div class="ivu-noDataText size-w900">
      {{ $t('i.table.noDataText') }}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    noFixed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-noData {

  &:not(.noFixed) {
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);

    .ivu-icon {
      line-height: .1;
      font-size: 20rem;
    }
    .ivu-noDataText {
      font-size: 6.4rem;
      text-transform: uppercase;
    }
  }

  user-select: none;
  text-align: center;
  color: fadeout(hsla(210, 15%, 25%, .12), 7.222%);

  &.noFixed {
    padding: 20px 0;

    .ivu-icon {
      line-height: normal;
      font-size: 7.2rem;
    }
    .ivu-noDataText {
      font-size: 2.5rem;
      text-transform: uppercase;
    }
  }
}
</style>
