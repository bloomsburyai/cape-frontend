<style scoped lang="scss">
  @import "../scss/component";

  .cape-markdown-layout {
    @include layout-vertical();
    position: relative;

    .cape-markdown-screen {
      @include layout-flex();
    }
  }
</style>

<template>
  <div class="cape-markdown-layout">
    <cape-markdown-toolbar/>
    <cape-markdown-screen/>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import Screen from '@/components/Screen'

export default {

  components: {
    'cape-markdown-toolbar': Toolbar,
    'cape-markdown-screen': Screen
  }

}
</script>
