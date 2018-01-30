<template lang="html">
  <Row class-name="ivu-dashboard">
    <NoData v-if="!haved"/>

    <div class="ivu-list" v-else>
      <div class="ivu-list-li" v-for="(item, key) in items">
        <router-link :to="{name: 'auth.watch', params: {key: item.key}}">

          <Icon type="ios-play-outline" :size="40"/>

          <Row class="txt-up" type="flex" align="middle" justify="space-between">
            <Col class="col-title size-16 size-w800">
              {{ item.name }}
            </Col>
            <Col class="col-date size-11 size-w600 flexed">
              <span class>
                {{ new Date(item.create_at) | moment('ll') }}
              </span>
              &nbsp;|&nbsp;
              <span class>
                {{ new Date(item.create_at) | moment('from', 'now') }}
              </span>
            </Col>
          </Row>

          <div class="li size-14 size-w400 pd-t5 pd-b5">{{ item.href }}</div>

          <Row type="flex" align="middle" justify="space-between"
            class-name="size-14 size-w600">
            <Col class="col-short primary">
              {{ $uri }}<b v-text="item.key"/>
            </Col>

            <Col class="col-click size-14">
              <code :class="[item.fly ? 'success' : 'disable']">
                <Icon type="ios-checkmark"/>
              </code>

              <code>{{ item.click }} <Icon type="stats-bars"/></code>
            </Col>
          </Row>

        </router-link>
      </div>
    </div>

    <div class="ivu-load-more txt-c" v-if="haved">
      <Button type="ghost" class="txt-up size-w600 min-w200"
        :loading="i.loading"
        @click="toLoading">

        <span v-if="!i.loading">load more</span>
        <span v-else>{{ $t('i.select.loading') }}...</span>
    </Button>
    </div>
  </Row>
</template>

<script>
import { mapGetters } from 'vuex'
import INoData from '~/components/UIComponent/noDataText'

export default {
  data () {
    return {
      i: { loading: false }
    }
  },

  methods: {
    toLoading () {
      this.i.loading = true

      setTimeout(() => {
        this.i.loading = false
      }, 2560)
    }
  },

  computed: mapGetters({
    items: 'manage.watch/watch',
    haved: 'manage.watch/haved'
  }),

  components: {
    'NoData': INoData
  }
}
</script>
