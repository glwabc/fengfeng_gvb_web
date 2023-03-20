<template>
  <div class="base_view index_view">
    <div class="gvb_nav">
      <div class="gvb_container">
        <div class="logo">
          <div>枫枫知道</div>
          <div>FENGFENGZHIDAO</div>
        </div>
        <div class="left">
          <span><a href="/" class="router-link-active">首页</a></span>
          <span><a href="/news" class="">新闻</a></span>
          <span><a href="/about" class="">关于</a></span>
          <span><a href="/search" class="">文章搜索</a></span>
          <span><a href="/chat" class="">聊天室</a></span>
          <span><a href="http://docs.fengfengzhidao.com/">官方文档</a></span>
          <span class="search"><i class="fa fa-search"></i></span>
        </div>
        <div class="right">
          <span class="login_btn"><a href="">登录</a></span>
          <GVBUserInfo class="gvb_user_info"></GVBUserInfo>
          <div class="gvb_theme">
            <GVBTheme></GVBTheme>
          </div>

        </div>
      </div>
    </div>
    <div class="gvb_banner"></div>
    <div class="gvb_container"></div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import GVBTheme from "@/components/gvb_theme.vue"
import GVBUserInfo from "@/components/gvb_user_info.vue"
</script>

<style lang="scss">
.gvb_nav {
  background-color: white;
  height: 60px;
  box-shadow: 1px 1px 5px #0003;
  display: flex;
  justify-content: center;
  font-size: 16px;

  .logo {
    width: 10%;
    transform: scale(0.7);

    div:first-child {
      font-size: 26px;
    }

    div:last-child {
      font-size: 12px;
    }
  }

  .left {
    width: 50%;
    display: flex;

    span {
      margin-right: 30px;
    }

    .search i {
      cursor: pointer;
    }

    a {
      color: #2b3539;

      &:hover {
        color: var(--active);
      }
    }
  }

  .right {
    width: 40%;
    display: flex;
    justify-content: right;
    align-items: center;

    .login_btn {
      margin-right: 20px;

      a {
        color: #2b3539;
      }
    }

    .gvb_theme {
      margin-left: 20px;
    }

    .gvb_user_info {
      a {
        color: #2b3539;
      }
    }
  }
}

.gvb_container {
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base_view {
  background-color: #f0eeee;
}

</style>