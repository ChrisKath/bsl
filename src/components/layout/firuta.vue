<template lang="html">
  <Row class-name="ivu-firuta">

    <Row type="flex" justify="space-between" align="middle"
      class-name="mg-b15">
      <Col :span="1">
        <Button long type="primary"
          icon="refresh"
          title="Firuta Reset"
          @click="reset"
        />
      </Col>

      <Col :span="6">
        <DatePicker type="daterange"
          :options="daterange"
          v-model="v.daterange"
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

          <Option v-for="(user, key) in users"
            :value="user.id"
            :key="user.id">

            {{ user.name }}
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

          <Option v-for="(tag, key) in tags"
            :value="tag.id"
            :key="tag.id">

            {{ tag.name }}
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
          :step="20"
          :max="400"
          range
          show-stops
          @on-change="pack"
        />
      </Col>
    </Row>

  </Row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

function FirutaData () {
  return {
    bool: false,
    v: {
      daterange:  ['', ''],
      created_by: null,
      enable:     true,
      expired:    false,
      clicked:    [0, 60],
      tags:       []
    }
  }
}

export default {
  data () {
    return {
      ...new FirutaData(),
      daterange: {
        shortcuts: [
          {
            text: 'A week',
            value () {
              const end   = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: 'A month',
            value () {
              const end   = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '3 Months',
            value () {
              const end   = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            }
          }
        ]
      }
    }
  },

  methods: {
    ...mapActions({
      callTags: 'manage.tag/call',
      callUsers: 'manage.account/call'
    }),

    pack (valve) {
      if (this.bool) {
        this.bool = false
      } else {
        if (typeof valve[0] === 'string') {
          this.v.daterange[0] = valve[0]
          this.v.daterange[1] = valve[1]
        }
        this.$emit('on-emit', this.v)
      }
    },

    reset () {
      this.bool = true
      setTimeout(h => {
        this.v = new FirutaData().v
      }, 512)
      this.$emit('on-reset', true)
    }
  },

  computed: mapGetters({
    tags: 'manage.tag/tags',
    users: 'manage.account/users',
    checkUsers: 'manage.account/check'
  }),

  created () {
    this.callTags()
    if (!this.checkUsers) this.callUsers()
  },

  destroyed () {
    this.v = new FirutaData().v
  }
}
</script>
