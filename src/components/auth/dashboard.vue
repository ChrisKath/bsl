<template lang="html">
  <Row class-name="ivu-dashboard">

    <Firuta @on-emit="firuta" @on-reset="reset"/>

    <div class="mg-b10 txt-r txt-cap size-13" v-if="board">
      <strong>Results:</strong>
      <span>{{ board.length }}</span>
    </div>

    <div class="ivu-list" v-if="board">
      <div class="ivu-list-li" v-for="(item, key) in board">
        <router-link :to="{name: 'auth.watch', params: {key: item.key}}">

          <Icon type="ios-play-outline" :size="40"/>

          <Row class="txt-up" type="flex" align="middle" justify="space-between">
            <Col class="col-title size-16 size-w800"
              v-html="pack(item.title)"
            />

            <Col class="col-date size-11 size-w600 flexed">
              {{ `
                ${$moment(item.created_at).format('ll')}
                &nbsp;|&nbsp;
                ${$moment(item.created_at).fromNow()}
              ` }}
            </Col>
          </Row>

          <div class="col-href size-14 size-w400 pd-t5 pd-b5"
            v-html="pack(item.href)"
          />

          <Row type="flex" align="middle" justify="space-between"
            class-name="size-14 size-w600">
            <Col class="col-key primary">
              <span class="min-w125">
                {{ $uri }}<b v-html="pack(item.key)"/>
              </span>

              <span class="mg-l20" v-if="item.tags">
                <Tag class="mg-r5"
                  v-for="(tag, key) in $lodash.orderBy(item.tags.split(','), [], ['asc'])"
                  :key="tag.id">

                  {{ tag }}
                </Tag>
              </span>
            </Col>

            <Col class="col-click size-14">
              <code v-if="$moment(item.expiry).isBefore(Date.now())"
                class="error" title="Expiry">
                <Icon type="ios-alarm"/>
              </code>

              <code :class="[item.enable ? 'success' : 'disable']"
                :title="[item.enable ? 'Enable': 'Disable']">
                <Icon type="ios-checkmark"/>
              </code>

              <code>{{ item.click }} <Icon type="stats-bars"/></code>
            </Col>
          </Row>

        </router-link>
      </div>
    </div>

    <div class="ivu-more txt-c pd-t40" v-if="board">
      <Button type="ghost" class="txt-up size-w600 min-w200"
        :loading="i.loading"
        @click="load">

        <span v-if="!i.loading">load more</span>
        <span v-else>{{ $t('i.select.loading') }}...</span>
      </Button>
    </div>

    <NoData v-if="!board"/>
  </Row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Firuta from '~/components/layout/firuta'
import NoData from '~/components/layout/noDataText'

export default {
  data () {
    return {
      i: { loading: false },
      v: {}
    }
  },

  methods: {
    ...mapActions({
      call: 'manage.watch/call',
      take: 'manage.watch/take',
      clean: 'manage.watch/search'
    }),

    load () {
      this.i.loading = true

      // observe items id.
      let arr = []
      this.board.forEach((item, key) => arr.push(item.id))

      this.v.daterange[0] = this.date(this.v.daterange[0])
      this.v.daterange[1] = this.date(this.v.daterange[1])

      const params = {
        ids: arr,
        firuta: this.v
      }

      if (this.search) params.search = this.search

      // call more items setp-10
      setTimeout(async h => {
        await this.take(params)
        this.i.loading = false
      }, 512)
    },

    pack (message) {
      return message.replace(new RegExp(this.search, 'gi'), match => {
        return `<pack>${match}</pack>`
      })
    },

    async firuta (valve) {
      await this.take({
        firuta: valve
      })
      this.v = valve
    },

    reset (valve) {
      this.$loading.start()
      setTimeout(h => {
        this.call()
        this.$loading.finish()
      }, 512)
    },

    date (valve) {
      return valve
        ? this.$moment(valve).format('YYYY-MM-DD')
        : ''
    }
  },

  computed: mapGetters({
    board: 'manage.watch/board',
    search: 'manage.watch/search'
  }),

  destroyed () {
    this.v = {}
    this.clean({search: ''})
  },

  components: {
    NoData: NoData,
    Firuta: Firuta
  }
}
</script>
