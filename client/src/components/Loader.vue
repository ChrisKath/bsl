<template>
  <transition name="loader" appear>
    <div class="ui--loader">
      
      <div class="ui--loader-container">
        <svg class="circle" viewBox="25 25 50 50">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="5"
            stroke-miterlimit="10"
          />
        </svg>
      </div>

    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LoaderContainer extends Vue {}
</script>