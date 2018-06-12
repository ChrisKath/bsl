<template lang="html">
  <Row class-name="ivu-watch">

    <RowHead :route-back="{name: 'auth.main'}" :title-name="watch.title">
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
                {{ $moment(watch.created_at).format('ll') }}
              </i>
              <a class="pd-r5">({{ watch.created_by }})</a>
            </span>

            <span class="mg-l10">
              <strong>{{ $t('i.title.updated') }}:</strong>
              <i class="pd-l5 txt-up">
                {{ $moment(watch.updated_at).format('ll') }}
              </i>
              <a class="pd-r5">({{ watch.updated_by }})</a>
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

              <i v-if="watch.expiry === null">Immortal</i>
              <i v-else class="txt-up">
                {{ $moment(watch.expiry).format('ll') }}
                <span v-if="expiry" class="error size-w800">(Expired)</span>
              </i>
            </h5>

            <Row class="ltd-1 size-16 size-w600">
              <a :href="watch.href" target="_blank">
                {{ watch.href }}
              </a>
            </Row>

            <Row type="flex" align="middle" justify="start"
              class-name="mg-t20">
              <Col :span="5">
                <a class="size-14 primary" target="_blank"
                  :href="`//${$uri}${watch.key}`">
                  {{ $uri }}<strong>{{ watch.key }}</strong>
                </a>
              </Col>

              <Col :span="19">
                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up"
                  v-text="$t('i.form.button.qrcode')"
                  @click="$refs.qr.open()"
                />

                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up mg-l5"
                  v-text="$t('i.form.button.copy')"
                  v-clipboard:copy="`${$uri}${watch.key}`"
                  v-clipboard:success="clipboard"
                />

                <router-link :to="{name: 'auth.watch.store',
                  params: {
                    key: watch.key,
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
              <Tag class="mg-r5" v-for="(tag, key) in watch.tags" :key="key.id">
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
            <TimelineItem v-for="(click, key) in watch.timeline" :key="key.id">
              <Icon type="ios-pulse-strong" slot="dot"/>

              <p class>
                <span class>
                  {{ $moment(click.clicked_at).format('ll') }}
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

    <QrCode ref="qr"/>
  </Row>
</template>

<script>
import QrCode from '~/components/UIComponent/qrcode'
import NoData from '~/components/layout/noDataText'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      enable: false,
      expiry: false,
      timeline: 0
    }
  },

  methods: {
    ...mapActions({
      mock: 'manage.watch/mock',
      witch: 'manage.watch/fly',
      remove: 'manage.watch/remove',
      destroy: 'manage.watch/destroy'
    }),

    clipboard () {
      this.$message.success(
        `${this.$t('i.notice.success')} [${this.$uri}${this.watch.key}]`
      )
    },

    removed () {
      this.$modal.confirm({
        onOk: () => this.remove(this.watch.id),
        okText: this.$t('i.form.button.confirm'),
        cancelText: this.$t('i.form.button.cancel'),
        content: `<b class=txt-up>${this.watch.title}</b>, An deletion?`
      })
    },

    async fly (status) {
      this.witch({
        id: this.watch.id,
        key: this.watch.key,
        fly: Number(status)
      })
    },

    async call () {
      await this.mock(this.$route.params.key)
      this.enable   = Boolean(this.watch.enable)
      this.timeline = this.watch.timeline.length
      this.expiry   = this.$moment(this.watch.expiry).isBefore(new Date())
    }
  },

  computed: mapGetters({
    watch: 'manage.watch/watch'
  }),

  // destroyed () {
  //   this.destroy()
  // },

  created () {
    this.call()
  },

  components: {
    NoData,
    QrCode
  }
}
</script>
