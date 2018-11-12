<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <!--<div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">-->
    <div class="scroll-wrapper" ref="scrollWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const padding = 15 // tag's padding
import $ from 'jquery'
import niceScroll from 'jquery.nicescroll';

export default {
  name: 'scrollPane',
  data() {
    return {
      left: 0
    }
  },
  mounted(){
    $(".scroll-container").niceScroll({cursorborder:"",cursorcolor:"rgba(0,0,0,0)",touchbehavior: true,autohidemode:"hidden"})
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperWidth = $wrapper.offsetWidth

      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth - padding < $wrapperWidth) {
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth

      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .scroll-container {
    white-space: nowrap;
    flex: 1;
    margin-left:20px;
    overflow-x: scroll;
    overflow-y: hidden;
    .scroll-wrapper {
      flex: 1;
    }
  }
  /*隐藏滚动条*/
  ::-webkit-scrollbar {display: none;}

  /*webkit内核*/
  .scroll_content::-webkit-scrollbar {
    width:0px;
    height:0px;
  }
  .scroll_content::-webkit-scrollbar-button    {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-webkit-scrollbar-track     {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-webkit-scrollbar-track-piece {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-webkit-scrollbar-thumb{
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-webkit-scrollbar-corner {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-webkit-scrollbar-resizer  {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-webkit-scrollbar {
    width:10px;
    height:10px;
  }
  /*o内核*/
  .scroll_content .-o-scrollbar{
    -moz-appearance: none !important;
    background: rgba(0,255,0,0) !important;
  }
  .scroll_content::-o-scrollbar-button    {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-o-scrollbar-track     {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-o-scrollbar-track-piece {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-o-scrollbar-thumb{
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-o-scrollbar-corner {
    background-color:rgba(0,0,0,0);
  }
  .scroll_content::-o-scrollbar-resizer  {
    background-color:rgba(0,0,0,0);
  }
  /*IE10,IE11,IE12*/
  .scroll_content{
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto;
  }
</style>
