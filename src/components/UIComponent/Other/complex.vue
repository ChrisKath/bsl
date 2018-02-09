<template lang="html">
  <Modal class-name="ivu-complex" width="auto"
    v-model="visible"
    :closable="false" :scrollable="true">

    <Row type="flex" align="top" justify="space-between">
      <div class="ivu-col-span-11 ivu-added" @click="open(false)">
        <router-link :to="{name: 'auth.watch.store',
          params: {
            key: 'add',
            type: 'normal'
          }
        }">

          <Icon type="ios-compose-outline"/>

          <div class="ivu-title txt-up mg-t10 size-30 size-w700">normal</div>

          <div class="ivu-info mg-t20 size-12 size-w100">
            Normal create just <b>Convert URL to Short Link</b>.
            you have a full website URL and campaign parameters.
          </div>

        </router-link>
      </div>

      <div class="ivu-col-span-11 ivu-added" @click="open(false)">
        <router-link :to="{name: 'auth.watch.store',
          params: {
            key: 'add',
            type: 'advanced'
          }
        }">

          <Icon type="ios-paper-outline"/>

          <div class="txt-up mg-t10 size-30 size-w700">advanced</div>

          <div class="mg-t20 size-12 size-w100">
            <b>Campaign URL builder</b>, this tool allows you to easily add
            campaign parameters to URLs so you can track Custom Campaigns by yourself.
          </div>

        </router-link>
      </div>
    </Row>

    <Row class-name="txt-c mg-t25 pd-t25">
      More information and examples for Campaign URL builder
      <a href="//ga-dev-tools.appspot.com/campaign-url-builder"
        target="_blank" class="size-w700">
        Click here.
      </a>
    </Row>

  </Modal>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },

  methods: {
    open (bool = true) {
      this.visible = bool
    }
  }
}
</script>
