<template lang="html">
  <div class="ivu-nav">
    <Col class="ivu-form-search">
      <Input :placeholder="$t('i.form.search')"
        v-model="form.search"
        @keyup.native="touch"
        @keyup.enter.native="touched">

        <Button slot="append" icon="ios-search" size="large" class="size-18"
          @click="touched"
        />

      </Input>
    </Col>

    <Button type="primary" shape="circle" size="large"
      class="size-w700 min-w200"
      v-text="$t('i.menu.createlink')"
      @click="$refs.c.open()"
    />

    <Dropdown trigger="click" placement="bottom-end">
      <div class="fx-c-c">
        <Badge dot :class="{'ivu-badge-online': authen}">
          <Avatar size="large" icon="person"/>
        </Badge>
      </div>

      <DropdownMenu slot="list">
        <DropdownItem class="ivu-dropdown-info">
          <div class>
            <h2 class="txt-up size-w600">{{ voice.name }}</h2>
            <h3 class="txt-cap grey">{{ voice.username }}</h3>
          </div>
        </DropdownItem>

        <DropdownItem divided>
          <router-link :to="{name: 'auth.main'}">
            <Icon type="ios-speedometer-outline" :size="20" class="align-m mg-r5"/>
            <span v-text="$t('i.menu.dashboard')"/>
          </router-link>
        </DropdownItem>

        <DropdownItem disabled>
          <router-link :to="{name: 'auth.main'}">
            <Icon type="ios-settings" :size="20" class="align-m mg-r5"/>
            <span v-text="$t('i.menu.account')"/>
          </router-link>
        </DropdownItem>

        <DropdownItem v-if="voice.isAdmin">
          <router-link :to="{name: 'auth.tag'}">
            <Icon type="ios-pricetags-outline" :size="20" class="align-m mg-r5"/>
            <span v-text="$t('i.menu.manageTag')"/>
          </router-link>
        </DropdownItem>

        <DropdownItem v-if="voice.isAdmin">
          <router-link :to="{name: 'auth.panel'}">
            <Icon type="ios-personadd-outline" :size="23" class="align-m mg-r5"/>
            <span v-text="$t('i.menu.manageAccounts')"/>
          </router-link>
        </DropdownItem>

        <DropdownItem>
          <a @click="$refs.l.open()">
            <i class="fa fa-language align-m mg-r5 size-20"/>
            <span v-text="$t('i.lang')"/>
          </a>
          <Languages ref="l"/>
        </DropdownItem>

        <DropdownItem divided>
          <a @click="logout" target="_self">
            <Icon type="log-out" :size="20" class="align-m mg-r5"/>
            {{ $t('i.form.button.signout') }}
          </a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <Complex ref="c"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Complex from '~/components/UIComponent/Other/complex'

export default {
  data () {
    return {
      form: {
        search: ''
      }
    }
  },

  methods: {
    ...mapActions({
      signout: 'authen/signout',
      search: 'manage.watch/search',
      call: 'manage.watch/call'
    }),

    logout () {
      this.$loading.start()
      this.signout()
    },

    touch () {
      this.search({
        hook: false,
        search: this.form.search
      })

      this.$router.push({ name: 'auth.main' })
    },

    async touched () {
      if (this.form.search) {
        this.$loading.start()

        await this.search({
          hook: true,
          search: this.form.search
        })

        this.$loading.finish()
        this.$router.push({ name: 'auth.main' })
      } else {
        this.call()
        this.search({search: ''})
      }
    }
  },

  computed: mapGetters({
    voice: 'authen/voice',
    authen: 'authen/check'
  }),

  components: {
    'Complex': Complex
  }
}
</script>
