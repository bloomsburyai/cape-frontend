<style scoped lang="scss">
  @import "../scss/component";

  .cape-markdown-screen {
    @include layout-scroll-vertical();
    display: block;
    background: $blue-grey-50;
    padding: 2rem 0;

    .cape-markdown-page {
      width: 50%;
      margin: 0 auto;
      padding: 3rem;
    }
  }
</style>

<template>
  <div class="cape-markdown-screen">
    <cape-markdown-page/>
  </div>
</template>

<script>
import Page from '@/components/Page'

export default {

  data () {
    return {
      content: ''
    }
  },

  components: {
    'cape-markdown-page': Page
  }

}
</script>
