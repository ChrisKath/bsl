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
        <li class="ivu-sider-li" v-for="i in list">
          <router-link :to="{ name: 'auth.bslink', params: { key: `2vifX${i}` } }">
            <h5 class="li-date size-w600">
              {{ $t('i.datepicker.months.m11') }} 32, 2018
            </h5>

            <h4 class="li-long size-14 size-w600">
              https://www.youtube.com/watch?v=eK_z8CxjwgY&list=RDGMEMXdNDEg4wQ96My0DhjI-cIgVMLxoYh5JF5fg
            </h4>

            <Row type="flex" justify="space-between">
              <Col class="li-short size-14 size-w600">
                tap.co/<b>2vifX{{ i }}</b>
              </Col>
              <Col class="li-click">
                <code class="size-14">
                  {{ i }}&nbsp;<Icon type="stats-bars"/>
                </code>
              </Col>
            </Row>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="ivu-layout-link">
      {{ $route.params.key }}
    </div>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      list: 12
    }
  }
}
</script>
