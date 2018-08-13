<style scoped lang="scss">
  @import "../../scss/cape";

  $height: 2.25rem;

  .cape-dashboard-documents-sidebar-dropdown-trigger {
    @include typography-button();
    display: inline-block;
    background-color: transparent;
    height: $height;
    border-radius: 0.125rem;
    padding: 0 1rem;
    font-weight: $font-weight-regular;
  }

  .cape-dashboard-documents-sidebar-dropdown-trigger.block {
    display: block;
    width: 100%;
  }

  .body {
    height: 100%;
    @include layout-horizontal();
    @include layout-center-center();
  }

  .body .icon {
    margin: 0 0.5rem 0 0;
  }

  .body .label {
    display: inline-block;
    line-height: $height;
  }

  .body .caret {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    color: $grey-400;
    margin: 0 0 0 0.5rem;
  }
</style>

<template>
  <button class="btn cape-dashboard-documents-sidebar-dropdown-trigger"
    v-bind:class="componentClassObject">
    <span class="body">
      <i
       v-bind:class="iconClass"
       v-bind:style="iconStyleObject"
       aria-hidden="true"
       class="icon"></i>
      <span class="label"
        v-bind:style="labelStyleObject">
        {{ label }}
      </span>
      <i class="fa fa-caret-down caret" aria-hidden="true"></i>
    </span>
  </button>
</template>

<script>
import IconLabelButton from '@/components/button/IconLabel'

export default {

  extends: IconLabelButton

}
</script>
