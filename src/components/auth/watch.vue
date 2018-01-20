<template lang="html">
  <Row class-name="ivu-watch">

    <Row type="flex" align="middle" justify="space-between"
      class-name="ivu-row-head">
      <Col>
        <router-link :to="{name: 'auth.main'}">
          <Button type="text"
            class="size-w800"
            size="large"
            icon="chevron-left">{{ $t('i.form.button.back') }}</Button>
        </router-link>

        <span class="vta-m mg-l15 size-16 size-w700">
          {{ items.title }}
        </span>
      </Col>

      <Col>
        <span class="size-14 size-w700 txt-up mg-r5">{{ $t('i.form.button.enable') }}:</span>
        <Switch size="large" v-model="items.fly" @on-change="fly">
          <span slot="open">{{ $t('i.form.button.on') }}</span>
          <span slot="close">{{ $t('i.form.button.off') }}</span>
        </Switch>
      </Col>
    </Row>

    <Row type="flex" class-name="ivu-row-body">
      <Col :span="16">
        <Row type="flex" align="top" justify="space-between">
          <Col class="size-13">
            <span class="mg-r10">
              <strong>{{ $t('i.title.created') }}:</strong>
              <i class="pd-l5 txt-up">{{ items.create_at | moment('ll') }}</i>
              <a class="pd-r5">({{ items.create_by }})</a>
            </span>
            <span class="mg-l10">
              <strong>{{ $t('i.title.updated') }}:</strong>
              <i class="pd-l5 txt-up">{{ items.update_at | moment('ll') }}</i>
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
              <i>{{ items.exp | moment('ll') }}</i>
            </h5>

            <a class="ltd-1 size-16 size-w600" target="_blank"
              v-text="items.origin"
              :href="items.origin"
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
              v-if="items.tag">
              <Tag class="mg-r5" v-for="i in items.tag" :key="i.id">
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
        <Timeline>
          <TimelineItem v-for="i in items.click" :key="i.id">
            <Icon type="ios-pulse-strong" slot="dot"/>
            <p>{{ new Date() | moment('ll') }}</p>
            <p class="disable">ip address</p>
          </TimelineItem>
        </Timeline>
        </Scroll>
      </Col>
    </Row>

  </Row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    clipboard () {
      this.$Message.success(
        `${this.$t('i.notice.success')} [${this.$uri}${this.items.key}]`
      )
    },

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
