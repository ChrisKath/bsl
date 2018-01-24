<template lang="html">
  <Row class-name="ivu-tags">
    <RowHead router-back="auth.main" :title-name="$t('i.menu.manageTag')"/>

    <Row class-name="ivu-row-body pd-15">
      <Col class-name="ivu-col-card mg-15 pd-15 pd-b30"
        v-for="(item, key) in $lodash.orderBy(items, ['name'], ['asc'])"
        :key="item.id">
        <Avatar icon="ios-pricetags"/>

        <div class="mg-t20 pd-b10">
          <p class="size-17 size-w700 txt-up">{{ item.name }}</p>
          <p class="size-10 txt-up pd-t5">
            {{ new Date(item.timestamp) | moment('ll') }}
            <br />
            {{ new Date(item.timestamp) | moment('from', 'now') }}
          </p>
        </div>

        <Button type="warning" class="ivu-btn-sub" icon="ios-trash-outline"
          @click="clear(item.name)">
          {{ $t('i.form.button.remove') }}
        </Button>
      </Col>

      <Col class-name="ivu-col-card col-dis mg-15">
        <div class="col-add disable" v-if="!push" @click="push = true">
          <Icon type="ios-plus-empty" size="99"/>
          <p class="txt-up size-14 size-w700">new tag</p>
        </div>

        <div class="col-form" v-else>
          <Avatar icon="ios-pricetags"/>

          <Input v-model="tag_name" placeholder="Tag name"
            :maxlength="14"
            class="mg-t20"
          />

          <ButtonGroup>
            <Button type="primary" icon="android-done" @click="touch"/>
            <Button type="primary" icon="android-close" @click="cancle"/>
          </ButtonGroup>
        </div>
      </Col>
    </Row>

  </Row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      push: false,
      tag_name: ''
    }
  },

  methods: {
    ...mapActions({
      add: 'manage.tag/add',
      remove: 'manage.tag/remove'
    }),

    touch () {
      if (!this.tag_name) {
        this.$Message.warning('Please fill is required')
      } else {
        const fined = this.$lodash.find(this.items, {name: this.tag_name})
        if (fined === undefined) {
          this.add(this.tag_name)
          this.cancle()
        } else {
          this.$Notice.error({
            title: 'Oops!!',
            desc: 'This name has already been used.'
          })
        }
      }
    },

    clear (name) {
      this.$Modal.confirm({
        onOk: () => this.remove(name),
        content: `<b class=txt-up>${name}</b>, Tag an deletion?`,
        okText: this.$t('i.form.button.confirm'),
        cancelText: this.$t('i.form.button.cancel')
      })
    },

    cancle () {
      this.push = false
      this.tag_name = ''
    }
  },

  computed: mapGetters({
    items: 'manage.tag/tags'
  })
}
</script>
