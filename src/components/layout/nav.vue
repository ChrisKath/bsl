<template lang="html">
  <Header>
    <div class="ivu--nav-logo" v-text="$t('i.table.noDataText')"/>

    <div class="ivu--nav-lang" @click="languageModal = true">
      <i class="fa fa-language fa--icon mr-8"/>
      <span aria-label="languages" v-text="$t('i.lang')"/>
    </div>

    <Modal v-model="languageModal"
      :width="600"
      :closable="true"
      :scrollable="true"
      :footerHide="true">
      <Language :closeModal="close"/>
    </Modal>
  </Header>
</template>

<script>
import languages from '~/components/UIComponent/Other/language'
export default {
  data () {
    return {
      languageModal: false
    }
  },

  methods: {
    close (bool) {
      this.languageModal = bool
    }
  },

  components: {
    'Language': languages
  }
}
</script>

<style lang="less" scoped>
.ivu--nav {
  color: #828a9b;
  line-height: 2.5;

  &-logo {
    position: relative;
    float: left;
    top: 15px;
    width: 150px;
    height: 30px;
    background: #5b6270;
    text-align: center;
  }

  &-lang {
    position: relative;
    float: right;
    top: 15px;
    padding: 0 15px;
    cursor: pointer;
    border-radius: 50px;
    border: solid 1px #828a9b;

    .fa--icon {
      font-size: 15px;
    }
  }
}
</style>
