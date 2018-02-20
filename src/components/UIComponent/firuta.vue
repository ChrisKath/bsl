<template lang="html">
  <Row class-name="ivu-firuta">

    <Row type="flex" justify="space-between" align="middle"
      class-name="mg-b15">
      <Col :span="7">
        <DatePicker type="daterange"
          :options="demo.options"
          v-model="v.date"
          size="small"
          placeholder="Date Range"
          @on-change="pack"
        />
      </Col>

      <Col :span="6">
        <Select v-model="v.created_by"
          size="small"
          placeholder="Created by"
          @on-change="pack">

          <Option v-for="(item, key) in demo.create"
            :value="item.value"
            :key="item.value">

            {{ item.label }}
          </Option>
        </Select>
      </Col>

      <Col :span="10">
        <Select v-model="v.tags"
          size="small"
          multiple
          filterable
          placeholder="Tags"
          @on-change="pack">

          <Option v-for="(item, key) in demo.tags"
            :value="item.value"
            :key="item.value">

            {{ item.label }}
          </Option>

        </Select>
      </Col>
    </Row>

    <Row type="flex" justify="start" align="middle">
      <Col class="min-w100">
        <Checkbox v-model="v.enable" class="size-w600"
          @on-change="pack">
          Enable
        </Checkbox>
      </Col>

      <Col class="min-w100">
        <Checkbox v-model="v.expired" class="size-w600"
          @on-change="pack">
          Expired
        </Checkbox>
      </Col>

      <Col class="flexed ivu-click">
        <span class="size-w600">
          Clicked {{ `(${v.clicked[0]} - ${v.clicked[1]})` }} :
        </span>

        <Slider v-model="v.clicked"
          :step="10"
          :max="100"
          range
          show-stops
          @on-change="pack"
        />
      </Col>
    </Row>

  </Row>
</template>

<script>
export default {
  data () {
    return {
      v: {
        daterange: null,
        created_by: null,
        enable: true,
        expired: false,
        clicked: [0, 20],
        tags: []
      },
      demo: {
        create: [
          {value: 0, label: 'Creator'},
          {value: 1, label: 'Admin'},
          {value: 2, label: 'Member'}
        ],
        tags: [
          {value: 0, label: 'Promotion'},
          {value: 1, label: 'Campaign'},
          {value: 2, label: 'Other'}
        ],
        options: {
          shortcuts: [
            {
              text: 'A week',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
              }
            },
            {
              text: 'A month',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              }
            },
            {
              text: '3 Months',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              }
            }
          ]
        }
      }
    }
  },

  methods: {
    pack (v) {
      console.log(this.v)
    }
  }
}
</script>
