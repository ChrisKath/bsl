<template lang="html">
  <Row class-name="ivu-watch">

    <RowHead :route-back="{name: 'auth.main'}" :title-name="item.title">
      <Col slot="col-2">
        <span class="size-14 size-w700 txt-up mg-r5">
          {{ $t('i.form.button.enable') }}:
        </span>

        <Switch size="large" v-model="enable" @on-change="fly">
          <span slot="open">{{ $t('i.form.button.on') }}</span>
          <span slot="close">{{ $t('i.form.button.off') }}</span>
        </Switch>
      </Col>
    </RowHead>

    <Row type="flex" class-name="ivu-row-body">
      <Col :span="16">
        <Row type="flex" align="top" justify="space-between">
          <Col class="size-13">

            <span class="mg-r10">
              <strong>{{ $t('i.title.created') }}:</strong>
              <i class="pd-l5 txt-up">
                {{ $moment(item.created_at).format('ll') }}
              </i>
              <a class="pd-r5">({{ item.created_by }})</a>
            </span>

            <span class="mg-l10">
              <strong>{{ $t('i.title.updated') }}:</strong>
              <i class="pd-l5 txt-up">
                {{ $moment(item.updated_at).format('ll') }}
              </i>
              <a class="pd-r5">({{ item.updated_by }})</a>
            </span>

          </Col>

          <Col>
            <div class>
              <b class="size-18 size-w700" v-text="timeline"/>
              <Icon type="stats-bars"/>
            </div>
            <div class="size-10 size-w900 disable">TOTAL CLICKS</div>
          </Col>
        </Row>

        <Row class-name="ivu-handler pd-t25">
          <Col>
            <h5 class="mg-b5">
              <strong>Expiry:</strong>

              <i v-if="item.expiry === null">Immortal</i>
              <i v-else class="txt-up">
                {{ $moment(item.expiry).format('ll') }}
                <span v-if="expiry" class="warning">(Death)</span>
              </i>
            </h5>

            <Row class="ltd-1 size-16 size-w600">
              <a :href="item.href" target="_blank">
                {{ item.href }}
              </a>
            </Row>

            <Row type="flex" align="middle" justify="start"
              class-name="mg-t20">
              <Col :span="5">
                <a class="size-14 primary" target="_blank"
                  :href="`//${$uri}${item.key}`">
                  {{ $uri }}<strong>{{ item.key }}</strong>
                </a>
              </Col>

              <Col :span="19">
                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up"
                  v-text="$t('i.form.button.copy')"
                  v-clipboard:copy="`${$uri}${item.key}`"
                  v-clipboard:success="clipboard"
                />

                <router-link :to="{name: 'auth.watch.store',
                  params: {
                    key: item.key,
                    type: 'edit'
                  }
                }">
                  <Button type="ghost" size="small"
                    class="size-11 size-w600 txt-up mg-l5"
                    v-text="$t('i.form.button.edit')"
                  />
                </router-link>

                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up mg-l5"
                  v-text="$t('i.form.button.remove')"
                  @click="removed"
                />
              </Col>
            </Row>

            <Row type="flex" align="top" justify="start"
              class-name="mg-t20">
              <Tag class="mg-r5" v-for="(tag, key) in item.tags" :key="key.id">
                {{ tag.name }}
              </Tag>
            </Row>

            <Row class-name="ivu-chart pd-t15 mg-t25"/>
          </Col>
        </Row>
      </Col>

      <Col :span="8">
        <h4 class="size-14 size-w600">{{ $t('i.title.clickTimeline') }}</h4>

        <Scroll class="pd-l15 mg-t10" height="auto">

          <Timeline v-if="timeline">
            <TimelineItem v-for="(click, key) in item.timeline" :key="key.id">
              <Icon type="ios-pulse-strong" slot="dot"/>

              <p class>
                <span class>
                  {{ $moment(item.clicked_at).format('ll') }}
                </span>
                &nbsp;|&nbsp;
                <span>
                  {{ $moment(click.clicked_at).fromNow() }}
                </span>
              </p>

              <p class="disable">{{ click.user_ip }}</p>
            </TimelineItem>
          </Timeline>

          <NoData v-else :noFixed="true"/>

        </Scroll>
      </Col>
    </Row>
  </Row>
</template>

<script>
import NoData from '~/components/layout/noDataText'
import { mapActions } from 'vuex'
import { HTTP } from '~/store/http'

export default {
  data () {
    return {
      item: [],
      enable: false,
      expiry: false,
      timeline: 0
    }
  },

  methods: {
    ...mapActions({
      remove: 'manage.watch/remove',
      disable: 'manage.watch/disable'
    }),

    clipboard () {
      this.$message.success(
        `${this.$t('i.notice.success')} [${this.$uri}${this.item.key}]`
      )
    },

    removed () {
      this.$modal.confirm({
        onOk: () => this.remove(this.item.key),
        okText: this.$t('i.form.button.confirm'),
        cancelText: this.$t('i.form.button.cancel'),
        content: `<b class=txt-up>${this.item.title}</b>, An deletion?`
      })
    },

    fly (status) {
      this.disable({
        key: this.item.key,
        value: status
      })
    },

    async call () {
      const { data } = await HTTP.get(`/watch/${this.$route.params.key}`)

      if (data === false) {
        this.$router.push({name: 'auth.main'})
      } else {
        this.item = data
        this.enable = Boolean(data.enable)
        this.timeline = data.timeline.length
        this.expiry = this.$moment(data.expiry).isBefore(new Date())
      }
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
