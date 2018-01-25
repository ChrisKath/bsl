<template lang="html">
  <Row class-name="ivu-watch">

    <RowHead router-back="auth.main" :title-name="items.name.toUpperCase()">
      <Col slot="col-2">
        <span class="size-14 size-w700 txt-up mg-r5">{{ $t('i.form.button.enable') }}:</span>
        <Switch size="large" v-model="flies" @on-change="fly">
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
              <i class="pd-l5 txt-up">{{ new Date(items.create_at) | moment('ll') }}</i>
              <a class="pd-r5">({{ items.create_by }})</a>
            </span>
            <span class="mg-l10">
              <strong>{{ $t('i.title.updated') }}:</strong>
              <i class="pd-l5 txt-up">{{ new Date(items.update_at) | moment('ll') }}</i>
              <a class="pd-r5">({{ items.update_by }})</a>
            </span>
          </Col>

          <Col>
            <div class>
              <b class="size-18 size-w700">
                {{ items.click }}
              </b>
              <Icon type="stats-bars"/>
            </div>
            <div class="size-10 size-w900 disable">TOTAL CLICKS</div>
          </Col>
        </Row>

        <Row class-name="ivu-handler pd-t25">
          <Col>
            <h5 class="mg-b5">
              <strong>EXP:</strong>
              <i>{{ new Date() | moment('ll') }}</i>
            </h5>

            <a class="ltd-1 size-16 size-w600" target="_blank"
              v-text="items.href"
              :href="items.href"
            />

            <Row type="flex" align="middle" justify="start"
              class-name="mg-t20">
              <Col :span="5">
                <a class="size-14 primary" target="_blank"
                  :href="`//${$uri}${items.key}`">
                  {{ $uri }}<strong>{{ items.key }}</strong>
                </a>
              </Col>

              <Col :span="19">
                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up"
                  v-text="$t('i.form.button.copy')"
                  v-clipboard:copy="`${$uri}${items.key}`"
                  v-clipboard:success="clipboard"
                />

                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up mg-l5"
                  v-text="$t('i.form.button.edit')"
                />

                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up mg-l5"
                  v-text="$t('i.form.button.remove')"
                />
              </Col>
            </Row>

            <Row type="flex" align="top" justify="start"
              class-name="mg-t20"
              v-if="items.tags">
              <Tag class="mg-r5" v-for="(i, key) in items.tags" :key="i.id">
                {{ i }}
              </Tag>
            </Row>

            <Row class-name="ivu-chart pd-t15 mg-t25"/>
          </Col>
        </Row>
      </Col>

      <Col :span="8">
        <h4 class="size-14 size-w600">{{ $t('i.title.clickTimeline') }}</h4>

        <Scroll class="pd-l15 mg-t10" height="auto">

          <Timeline v-if="items.click">
            <TimelineItem v-for="(i, key) in items.click" :key="i.id">
              <Icon type="ios-pulse-strong" slot="dot"/>
              <p>{{ new Date() | moment('ll') }}</p>
              <p class="disable">ip address</p>
            </TimelineItem>
          </Timeline>

          <NoData v-else :noFixed="true"/>

        </Scroll>
      </Col>
    </Row>

  </Row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import INoData from '~/components/UIComponent/noDataText'

export default {
  data () {
    return {
      flies: false
    }
  },

  methods: {
    ...mapActions({
      disable: 'manage.watch/disable'
    }),

    clipboard () {
      this.$Message.success(
        `${this.$t('i.notice.success')} [${this.$uri}${this.items.key}]`
      )
    },

    fly (status) {
      this.disable({
        key: this.$route.params.key,
        value: status
      })
    }
  },

  computed: {
    ...mapGetters({
      watch: 'manage.watch/watch'
    }),

    items () {
      const fined = this.$lodash.find(this.watch, {
        key: this.$route.params.key
      })
      if (fined === undefined) {
        this.$router.push({name: 'auth.main'})
      } else {
        this.flies = fined.fly
        return fined
      }
    }
  },

  components: {
    'NoData': INoData
  }
}
</script>
