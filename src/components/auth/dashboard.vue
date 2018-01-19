<template lang="html">
  <Row class-name="ivu-dashboard">

    <div class="ivu-none" v-if="!items">
      <Icon type="social-buffer" />
      <div class="ivu-noData size-w900">
        {{ $t('i.table.noDataText') }}
      </div>
    </div>

    <div class="ivu-list" v-else>
      <div class="ivu-list-li" v-for="(i, key) in 12">
        <router-link :to="{name: 'auth.bslink', params: {key: items.key}}">

          <Icon type="ios-play-outline" :size="40"/>

          <Row type="flex" align="middle" justify="space-between">
            <Col class="col-title size-16 size-w800">
              {{ items.title }}
            </Col>
            <Col class="col-date txt-up size-12 size-w600 flexed">
              {{ new Date() | moment('ll') }}
            </Col>
          </Row>

          <div class="li size-14 size-w400 pd-t5 pd-b5">{{ items.origin }}</div>

          <Row type="flex" align="middle" justify="space-between"
            class-name="size-14 size-w600">
            <Col class="col-short primary">
              {{ $uri }}<b v-text="items.key"/>
            </Col>

            <Col class="col-click size-14">
              <code :class="[items.fly?'success':'disable']"><Icon type="ios-checkmark"/></code>
              <code>0 <Icon type="stats-bars"/></code>
            </Col>
          </Row>

        </router-link>
      </div>
    </div>

    <!-- <Details /> -->
  </Row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    fly (status) {
      this.$Message.info(
        `${this.$t('i.notice.success')}: ${status}`
      )
    }
  },

  computed: mapGetters({
    items: 'items/item'
  })
}
</script>
