<template lang="html">
  <div class="ivu-layout-link">
    <Row :gutter="0">
      <Col span="24">
        <Row class-name="mg-b15" type="flex" align="middle" justify="space-between">
          <Col class="grey size-12 size-w600">
            {{ $t('i.datepicker.months.m11') }} 32, 2018
          </Col>
          <Col>
            <span class="mg-r10 size-14 size-w700 txt-up">On the fly:</span>
            <Switch size="large" v-model="item.run">
              <span slot="open" v-text="`ON`"/>
              <span slot="close" v-text="`OFF`"/>
            </Switch>
          </Col>
        </Row>

        <h1 class="size-20 size-w700" v-text="item.title"/>
        <h4 class="size-14 size-w600 mg-t10 grey">
          <a :href="item.origin" target="_blank"
            v-text="item.origin"
          />
        </h4>
      </Col>
    </Row>

    <Row class-name="size-14 mg-t25"
      :gutter="0"
      type="flex"
      align="middle"
      justify="start">

      <Col span="3">
        <a :href="`//${copy}`" target="_blank" class="primary">
          {{ $uri }}<b>{{ item.key }}</b>
        </a>
      </Col>

      <Col span="21">
        <Button type="ghost" size="small"
          class="size-12 size-w600 txt-up"
          v-text="`copy`"
          v-clipboard:copy="copy"
          v-clipboard:success="copySuccess"
        />

        <Button type="ghost" size="small"
          class="size-12 size-w600 txt-up mg-l5"
          v-text="`edit`"
        />

        <Button type="ghost" size="small"
          class="size-12 size-w600 txt-up mg-l5"
          v-text="`remove`"
        />
      </Col>
    </Row>

    <Row class-name="size-14 mg-t15"
      :gutter="0"
      type="flex"
      align="middle"
      justify="start">
      <Icon type="ios-pricetags-outline" size="22" class="mg-r10"/>
      <Tag class="mg-r5" v-for="value in item.tag"
        :key="value.id"
        v-text="value"
      />
    </Row>

    <Row class-name="ivu-row-scale" :gutter="0">
      <Col span="24">
        <div class="mg-b15 size-16 size-w700">Clicked Timeline</div>
      </Col>
    </Row>

  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object, Array],
      dafeult: []
    }
  },

  methods: {
    copySuccess () {
      this.$Message.success(
        `${this.$t('i.notice.success')}`
      )
    }
  },

  computed: {
    copy () {
      return `${this.$uri}${this.item.key}`
    }
  }
}
</script>
