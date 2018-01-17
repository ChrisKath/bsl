<template lang="html">
  <div class="ivu-nav">
    <Form class="ivu-form-search" autocomplete="on">
      <Input :placeholder="$t('i.form.search')">
        <Button slot="append" icon="ios-search" size="large" class="size-18"/>
      </Input>
    </Form>

    <Button type="primary" size="large" class="size-w700 min-w200"
      @click="$refs.c.open()">
      {{ $t('i.menu.createlink') }}
      <Creation ref="c"/>
    </Button>

    <Dropdown trigger="click" placement="bottom-end">
      <div class="fx-c-c">
        <Badge dot :class="{'ivu-badge-online': authen}">
          <Avatar size="large" icon="person"/>
        </Badge>
        <!-- <Icon type="ios-arrow-down" class="size-20 mg-l10"/> -->
      </div>

      <DropdownMenu slot="list">
        <DropdownItem class="ivu-dropdown-info">
          <div class>
            <h2 class="size-w600">ゴジです</h2>
            <h3 class="grey">root</h3>
          </div>
        </DropdownItem>

        <DropdownItem divided>
          <router-link :to="{name: 'auth.main'}">
            <Icon type="ios-speedometer-outline" :size="20" class="vta-m mg-r5"/>
            <span v-text="$t('i.menu.dashboard')"/>
          </router-link>
        </DropdownItem>

        <DropdownItem disabled>
          <router-link :to="{name: 'auth.logout'}">
            <Icon type="ios-settings" :size="20" class="vta-m mg-r5"/>
            <span v-text="$t('i.menu.account')"/>
          </router-link>
        </DropdownItem>

        <DropdownItem>
          <a @click="$refs.l.open()">
            <i class="fa fa-language vta-m mg-r5 size-20"/>
            <span v-text="$t('i.lang')"/>
            <Languages ref="l"/>
          </a>
        </DropdownItem>

        <DropdownItem divided>
          <a @click="logout" target="_self">
            <Icon type="log-out" :size="20" class="vta-m mg-r5"/>
            {{ $t('i.form.button.signout') }}
          </a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ICreation from 'Comp/UIComponent/Other/creation'

export default {
  methods: {
    ...mapActions({
      clear: 'auth/logout'
    }),

    logout () {
      this.$Loading.start()
      this.clear()
    }
  },

  computed: mapGetters({
    authen: 'auth/check'
  }),

  components: {
    'Creation': ICreation
  }
}
</script>
