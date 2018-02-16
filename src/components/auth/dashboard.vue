<template lang="html">
  <Row class-name="ivu-dashboard">
    <NoData v-if="!items.length"/>

    <div class="ivu-list" v-else>
      <div class="ivu-list-li" v-for="(item, key) in items">
        <router-link :to="{name: 'auth.watch', params: {key: item.key}}">

          <Icon type="ios-play-outline" :size="40"/>

          <Row class="txt-up" type="flex" align="middle" justify="space-between">
            <Col class="col-title size-16 size-w800">
              {{ item.title }}
            </Col>
            <Col class="col-date size-11 size-w600 flexed">
              {{ `
                ${$moment(item.created_at).format('ll')}
                &nbsp;|&nbsp;
                ${$moment(item.created_at).fromNow()}
              ` }}
            </Col>
          </Row>

          <div class="col-href size-14 size-w400 pd-t5 pd-b5">
            {{ item.href }}
          </div>

          <Row type="flex" align="middle" justify="space-between"
            class-name="size-14 size-w600">
            <Col class="col-key primary">
              <span class="min-w125">
                {{ $uri }}<b v-text="item.key"/>
              </span>

              <span class="mg-l20" v-if="item.tags">
                <Tag class="mg-r5"
                  v-for="(tag, key) in item.tags.split(',')"
                  :key="tag.id">

                  {{ tag }}
                </Tag>
              </span>
            </Col>

            <Col class="col-click size-14">
              <code v-if="$moment(item.expiry).isBefore(Date.now())"
                class="warning" title="Expiry">
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

    <div class="ivu-load-more txt-c mg-b30" v-if="items.length">
      <Button type="ghost" class="txt-up size-w600 min-w200"
        :loading="i.loading"
        @click="takeMore">

        <span v-if="!i.loading">load more</span>
        <span v-else>{{ $t('i.select.loading') }}...</span>
    </Button>
    </div>
  </Row>
</template>

<script>
import NoData from '~/components/layout/noDataText'
import { HTTP } from '~/store/http'

export default {
  data () {
    return {
      items: [],
      i: { loading: false }
    }
  },

  methods: {
    async takeMore () {
      this.i.loading = true

      // observe items id.
      const items = []
      this.items.forEach((item, key) => {
        items.push(item.id)
      })

      // call more items setp-10
      await setTimeout(async callback => {
        const { data } = await HTTP.post('/watch/take', {'items': items})

        data.forEach((item, key) => {
          this.items.push(item)
        })

        this.i.loading = false
      }, 1280)
    },

    async call () {
      const { data } = await HTTP.get('/watch')
      this.items = data
    }
  },

  async created () {
    await this.call()
  },

  components: {
    'NoData': NoData
  }
}
</script>
