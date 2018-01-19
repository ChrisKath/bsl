<template lang="html">
  <Row class-name="ivu-watch">

    <Row type="flex" align="middle" justify="space-between"
      class-name="ivu-row-head">
      <Col>
        <router-link :to="{name: 'auth.main'}">
          <Button type="text"
            class="size-w800"
            size="large"
            icon="chevron-left">Back</Button>
        </router-link>

        <span class="vta-m mg-l15 size-16 size-w700">
          {{ item.title }}
        </span>
      </Col>

      <Col>
        <span class="size-14 size-w700 txt-up mg-r5">On the fly:</span>
        <Switch size="large" :model="item.fly" @on-change="fly">
          <span slot="open">ON</span>
          <span slot="close">OFF</span>
        </Switch>
      </Col>
    </Row>

    <Row type="flex" class-name="ivu-row-body">
      <Col :span="16">
        <Row type="flex" align="top" justify="space-between">
          <Col class="size-13">
            <span class="mg-r10">
              <strong>Created:</strong>
              <i class="pd-l5 txt-up">{{ item.create_at | moment('ll') }}</i>
              <a class="pd-r5">({{ item.create_by }})</a>
            </span>
            <span class="mg-l10">
              <strong>Updated:</strong>
              <i class="pd-l5 txt-up">{{ item.update_at | moment('ll') }}</i>
              <a class="pd-r5">({{ item.update_by }})</a>
            </span>
          </Col>

          <Col>
            <div class>
              <b class="size-18 size-w700">
                {{ item.click }}
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
              <i>{{ item.exp | moment('ll') }}</i>
            </h5>

            <a class="ltd-1 size-16 size-w600" target="_blank"
              v-text="item.origin"
              :href="item.origin"
            />

            <Row type="flex" align="middle" justify="start"
              class-name="mg-t20">
              <Col :span="4">
                <a class="size-14 primary" target="_blank"
                  :href="`//${$uri}${item.key}`">
                  {{ $uri }}<strong>{{ item.key }}</strong>
                </a>
              </Col>

              <Col :span="20">
                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up"
                  v-text="`copy`"
                  v-clipboard:copy="`${$uri}${item.key}`"
                  v-clipboard:success="clipboard"
                />

                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up mg-l5"
                  v-text="`edit`"
                />

                <Button type="ghost" size="small"
                  class="size-11 size-w600 txt-up mg-l5"
                  v-text="`remove`"
                />
              </Col>
            </Row>

            <Row type="flex" align="top" justify="start"
              class-name="mg-t20"
              v-if="item.tag">
              <Tag class="mg-r5" v-for="i in item.tag" :key="i.id">
                {{ i }}
              </Tag>
            </Row>

            <Row class-name="ivu-chart pd-t15 mg-t25">
              <Circle
                :size="200"
                :percent="75"
                :trail-width="10"
                :stroke-width="10"
                stroke-linecap="square" stroke-color="#2d8cf0">
                <div class="demo-Circle-custom">
                  <h3>42,001,776</h3>
                  <p>消费人群规模</p>
                  <span>
                    总占人数
                    <i>75%</i>
                  </span>
                </div>
              </Circle>
          </Row>
          </Col>
        </Row>
      </Col>

      <Col :span="8">
        <h4 class="size-14 size-w600">Clicked timeline logger</h4>

        <Scroll class="pd-l15 mg-t10" height="auto">
        <Timeline>
          <TimelineItem v-for="i in item.click" :key="i.id">
            <Icon type="ios-pulse-strong" slot="dot"/>
            <p>{{ new Date() | moment('ll') }}</p>
            <p class="disable">Unknow</p>
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
        `${this.$t('i.notice.success')} [${this.$uri}${this.item.key}]`
      )
    },

    fly (status) {
      this.$Message.info(
        `${this.$t('i.notice.success')}: ${status}`
      )
    }
  },

  computed: mapGetters({
    item: 'items/item'
  })
}
</script>
