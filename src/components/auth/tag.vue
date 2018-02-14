<template lang="html">
  <Row class-name="ivu-tags">
    <RowHead :route-back="i.back" :title-name="$t('i.menu.manageTag')"/>

    <Row class-name="ivu-row-body pd-15">
      <Col class-name="ivu-col-card mg-15 pd-15 pd-b30"
        v-for="(tag, key) in tags"
        :key="tag.id">

        <Badge :count="tag.used">
          <Avatar icon="ios-pricetags"/>
        </Badge>

        <div class="mg-t20 pd-b10">
          <p class="size-17 size-w700 txt-up" style="white-space: nowrap">
            {{ tag.name }}
          </p>

          <p class="size-10 txt-up pd-t5">
            {{ $moment(tag.created_at).format('ll') }}
            <br />
            {{ $moment(tag.created_at).fromNow() }}
          </p>
        </div>

        <Button type="warning" class="ivu-btn-sub" icon="ios-trash-outline"
          @click="clear(tag.id, tag.name)">
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

          <Input v-model="name" placeholder="Tag name"
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
      i: {
        loading: false,
        back: { name: 'auth.main' }
      },
      name: null,
      push: false
    }
  },

  methods: {
    ...mapActions({
      call: 'manage.tag/call',
      add: 'manage.tag/add',
      remove: 'manage.tag/remove'
    }),

    async touch () {
      if (!this.name) {
        this.$message.warning('Please fill is required')
      } else {
        const res = await this.add(this.name)
        if (res) this.cancle()
      }
    },

    clear (id, name) {
      this.$modal.confirm({
        onOk: () => this.remove({id, name}),
        okText: this.$t('i.form.button.confirm'),
        cancelText: this.$t('i.form.button.cancel'),
        content: `<b class=txt-up>${name}</b>, Tag an deletion?`
      })
    },

    cancle () {
      this.push = false
      this.name = null
    }
  },

  async created () {
    await this.call()
  },

  computed: mapGetters({
    tags: 'manage.tag/tags'
  })
}
</script>
