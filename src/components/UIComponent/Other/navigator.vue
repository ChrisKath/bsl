<template lang="html">
  <div class="ivu-nav">
    <Button type="warning" size="large" class="size-w700">CREATE LINK</Button>

    <Dropdown trigger="click" placement="bottom-end">
      <Badge dot :class="{'ivu-badge-online': authen}">
        <Avatar size="large" icon="person"/>
      </Badge>

      <DropdownMenu slot="list">
        <DropdownItem>
          <router-link :to="{name: 'auth.main'}">Dashboard</router-link>
        </DropdownItem>

        <DropdownItem disabled>
          <span>Disabled</span>
        </DropdownItem>

        <DropdownItem>
          <div @click="$refs.l.modalSwitch()">
            <i class="fa fa-language vta-m mg-r5 size-15"/>
            <span v-text="$t('i.lang')"/>
            <Languages ref="l"/>
          </div>
        </DropdownItem>

        <DropdownItem divided>
          <router-link :to="{name: 'auth.logout'}">
            <Icon type="log-out" :size="15" class="mg-r5"/>
            {{ $t('i.form.button.signout') }}
          </router-link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    authen: 'auth/check'
  })
}
</script>
