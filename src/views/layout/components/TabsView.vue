<template>
  <div class="tags-view-container">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''"
                   v-for="tag in Array.from(visitedViews)"
                   :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.name}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
  import ScrollPane from '@/components/ScrollPane'
  import $ from 'jquery'
  import niceScroll from 'jquery.nicescroll';

  export default {
    components: {ScrollPane},
    data() {
      return {
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.app.visitedViews.slice(-1000)
      }
    },
    watch: {
      $route() {
        this.addViewTags()
        this.moveToCurrentTag()
      }
    },
    mounted(){
      $(".tags-view-container").niceScroll({cursorborder:"",cursorcolor:"rgba(0,0,0,0)",touchbehavior: true,autohidemode:"hidden"})
    },
    methods: {
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      addViewTags() {
        const route = this.generateRoute();
        if (!route) {
          return false;
        }

        this.$store.dispatch("addVisitedViews", route).then(_ => {
          var activeTag = document.getElementsByClassName("tags-view-item router-link-exact-active router-link-active active")[0];
          var tagViewbar = document.getElementsByClassName("scroll-container tags-view-wrapper")[0];
          if (activeTag.offsetLeft - tagViewbar.scrollLeft <activeTag.parentElement.offsetLeft) {
            tagViewbar.scrollLeft =activeTag.offsetLeft - activeTag.parentElement.offsetLeft;
          }
          var navbar = document.getElementsByClassName("navbar el-menu--horizontal el-menu")[0];
          var toubar = document.getElementsByClassName("avatar-container  el-dropdown")[0];
          if (activeTag.offsetLeft > navbar.offsetWidth - toubar.offsetWidth - activeTag.offsetWidth ) {
            tagViewbar.scrollLeft =activeTag.offsetLeft -navbar.offsetWidth +toubar.offsetWidth +activeTag.clientWidth;
          }
        });
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag.$el)
              break
            }
          }
        })
      },
      closeSelectedTag(view) {
        let viewList = this.$store.state.app.visitedViews
          let deltaWidth = document.getElementsByClassName("scroll-wrapper")[0].children[viewList.indexOf(view)].clientWidth
          if (this.$refs.scrollPane.left < 0) {
            this.$refs.scrollPane.left += deltaWidth
            if (this.$refs.scrollPane.left > 0) {
              this.$refs.scrollPane.left = 0
            }
          }
        this.$store.dispatch('delVisitedViews', view).then((views) => {
          if (this.isActive(view)) {
            const latestView = views.slice(-1)[0]
            if (latestView) {
              this.$router.push(latestView.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      },
      openMenu(tag, e) {
        this.selectedTag = tag
        this.left = e.clientX
        this.top = e.clientY
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
    flex: 1;
    overflow-x: scroll;
    .tags-view-wrapper {
      background: #fff;
      .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &.active {
          background-color: #409eff;
          color: #fff;
          border-color: #409eff;
          &::before {
            content: "";
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 100;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
  /*隐藏滚动条*/
  ::-webkit-scrollbar {display: none;}
</style>

