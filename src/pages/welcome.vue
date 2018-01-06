<template lang="html">
  <div class>
    <h1 v-if="auth" v-text="`Online`"/>
    <h1 v-else v-text="`no sign-in`"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'default',
  computed: mapGetters({
    auth: 'auth/check'
  })
}
</script>
