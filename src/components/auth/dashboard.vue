<template lang="html">
  <Layout class="ivu-dashboard">

    <div class="ivu-layout-sider">
      <div class="ivu-sider-li li-head">
        <Row type="flex" justify="space-between">
          <Col class="size-14">12 BSLink</Col>
          <Col class="size-14">Clicks all time</Col>
        </Row>
      </div>

      <ul class="ivu-sider-ul">
        <li class="ivu-sider-li" v-for="(i, key) in items">
          <router-link :to="{ name: 'auth.bslink', params: { key: i.key } }">
            <h5 class="li-date size-w600">
              {{ $t('i.datepicker.months.m11') }} 32, 2018
            </h5>

            <h4 class="li-long size-14 size-w600">{{ i.origin }}</h4>
            <Row type="flex" justify="space-between">
              <Col class="li-short size-14 size-w600">
                {{ $uri }}<b v-text="i.key"/>
              </Col>
              <Col class="li-click">
                <code class="size-14">
                  {{ (key +1) }}&nbsp;<Icon type="stats-bars"/>
                </code>
              </Col>
            </Row>
          </router-link>
        </li>
      </ul>
    </div>

    <IDetail :item="set()"/>
  </Layout>
</template>

<script>
import IDetails from 'Comp/UIComponent/details'
const __OBJ__ = [
  {
    key: 'VMLxoY1',
    title: 'TITLE NAME 1',
    tag: ['one', 'two', 'three'],
    origin: 'https://www.youtube.com/watch?v=WNQ2kzT_ASo&index=47&list=PLgcpjS-w00LUaRWSk1JnH5KvJXINZgGLp',
    exp: 'NOV, 32 2018',
    redir: null,
    run: false,
    createBy: 'CreateBy',
    updateBy: 'CreateBy',
    createAt: new Date(),
    updatedAt: new Date()
  },
  {
    key: 'VMLxoY2',
    title: 'TITLE NAME 2',
    tag: ['three', 'two', 'one'],
    origin: 'https://www.youtube.com/watch?v=IYaeEkYnq_o&list=PLgcpjS-w00LUaRWSk1JnH5KvJXINZgGLp&index=50',
    exp: 'NOV, 32 2018',
    redir: null,
    run: false,
    createBy: 'CreateBy',
    updateBy: 'CreateBy',
    createAt: new Date(),
    updatedAt: new Date()
  }
]

export default {
  data () {
    return {
      items: __OBJ__
    }
  },

  methods: {
    __found__ (array, key, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) return array[i]
      }
      return null
    },
    set () {
      return this.__found__(this.items, 'key', !this.$route.params.key
        ? this.items[0].key
        : this.$route.params.key)
    }
  },

  components: {
    'IDetail': IDetails
  }
}
</script>
