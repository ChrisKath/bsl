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
        v-for="(item, key) in $lodash.orderBy(items, ['permis'], ['asc'])"
        :key="item.id"
        :class="{'ROOT': item.permis === '#'}">

        <Icon
          class="ivu-root size-24 primary"
          v-if="item.permis === 0 || item.permis === '#'"
          :type="item.permis === '#' ? 'ios-world' : 'ribbon-b'"
          :class="{'error': item.permis === '#'}"
        />

        <Avatar icon="person"/>

        <div class="ivu-display mg-t20 pd-b10 size-17 size-w700">
          <div class="txt-up size-10" v-if="item.permis === '#'">root</div>
          <div class="txt-up size-10" v-else>
            {{ item.permis === 0 ? 'admin' : 'member' }}
          </div>
          <p>{{ item.name }}</p>
        </div>

        <div class="ivu-more pd-t10 pd-b10 size-12 txt-c">
          <p>{{ item.username }}</p>
          <p>{{ item.email }}</p>
        </div>

        <ButtonGroup size="small">
          <router-link
            :to="{
              name: 'auth.panel.edit',
              params: {
                key: item.uid,
                type: 'edit'
              }
            }">

            <Button icon="settings"
              :type="item.permis === '#' ? 'error' : 'primary'"
            />

          </router-link>

          <Button icon="refresh"
            :type="item.permis === '#' ? 'error' : 'primary'"
            />
        </ButtonGroup>
      </Col>

    </Row>

  </Row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    items: 'manage.account/accounts'
  })
}
</script>
