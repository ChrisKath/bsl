<template lang="html">
  <Row class-name="ivu-panel">

    <Row type="flex" align="middle" justify="start"
      class-name="ivu-row-head">
      <Col>
        <router-link :to="{name: 'auth.panel.add', params: {type: 'add'}}">

          <Button class="ivu-btn-add txt-up size-14 size-w600 flexed"
            type="primary"
            icon="ios-personadd-outline">
            @New
          </Button>

        </router-link>
      </Col>

      <Col class="mg-l20 size-17 size-w600">
        Admin Panel
      </Col>
    </Row>

    <Row class-name="ivu-row-body pd-15">

      <Col class-name="ivu-col-card mg-20 pd-15 pd-b25"
        v-for="(user, key) in users"
        :key="user.id"
        :class="{'ROOT': user.id===1}">

        <Icon v-if="user.isAdmin || user.id===1"
          :type="user.id===1 ? 'ios-world' : 'ribbon-b'"
          :class="{'ivu-root size-24 primary': true, 'error': user.id===1}"
        />

        <Avatar icon="person"/>

        <div class="ivu-display mg-t20 pd-b10 size-17 size-w700">
          <div class="txt-up size-10" v-if="user.id===1">root</div>
          <div class="txt-up size-10" v-else>
            {{ user.isAdmin ? 'admin' : 'member' }}
          </div>
          <p class="txt-up">{{ user.name }}</p>
        </div>

        <div class="ivu-more pd-t10 pd-b10 size-12 txt-c">
          <p>{{ user.username }}</p>
          <p>{{ user.email }}</p>
        </div>

        <ButtonGroup size="small">
          <router-link :to="{
            name: 'auth.panel.edit',
            params: {key: user.id, type: 'edit'}
          }">
            <Button icon="settings"
              :type="user.id===1 ? 'error' : 'primary'"
            />
          </router-link>

          <Button icon="refresh"
            :disabled="!user.passive"
            :type="user.id===1 ? 'error' : 'primary'"
            @click="touch({
              id: user.id,
              username: user.username
            })"
          />
        </ButtonGroup>
      </Col>

    </Row>

  </Row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { HTTP } from '~/store/http'

export default {
  methods: {
    ...mapActions({
      call: 'manage.account/call'
    }),

    touch (valve) {
      this.$modal.confirm({
        onOk: () => this.reset(valve),
        okText: this.$t('i.form.button.confirm'),
        cancelText: this.$t('i.form.button.cancel'),
        content: `<b class=txt-up>${valve.username}</b>, will be reset password?`
      })
    },

    async reset (params) {
      await HTTP.post('/panel/pwd/reset', params)
      this.$notice.success({
        title: 'Successful',
        desc: `<b class=txt-up>${params.username}</b>, has been reset password.`
      })
    }
  },

  computed: mapGetters({
    me: 'authen/voice',
    users: 'manage.account/users'
  }),

  created () {
    this.call()
  }
}
</script>
