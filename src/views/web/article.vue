<template>
  <div class="base_view article_view">
    <GVBNav></GVBNav>
    <GVBBanner
        url="http://blog.fengfengzhidao.com/uploads/file/cover/19.png"
        slogan="文章标题"
        abstract="这是一篇文章"
        is-article
    ></GVBBanner>
    <div class="gvb_base_container">
      <div class="gvb_inner_container">
        <article>
          <div class="article_head">
            <h2>Gorm高级查询</h2>
            <div class="info">
              <span class="date">发布时间：2023-02-02</span>
              <span>作者：枫枫</span>
            </div>
            <div class="tag">
              <i title="文章标签" class="fa fa-tags"></i>
              <a-tag color="red">golang</a-tag>
              <a-tag color="blue">gorm</a-tag>
            </div>

          </div>
          <div class="article_content">

          </div>
          <div class="article_on_the">
            <div class="article_on_the_inner">
              <a href="#">上一篇</a>
              <a href="#">下一篇</a>
            </div>
          </div>
          <div class="article_comment_to">
            <div class="title">你觉得文章怎么样</div>
            <div class="body">
              <a-textarea
                  :auto-size="{ minRows: 6, maxRows: 6 }"
                  placeholder="请输入文章评论"></a-textarea>
              <a-button class="add_comment_btn" type="primary">发布</a-button>
            </div>
            <div class="comment_footer">
              <span>109</span> 人参与，
              <span>0</span> 条评论
            </div>
          </div>
        </article>
        <aside>
          <div class="article_user_info">
            <div class="user_info_avatar">
              <img src="http://blog.fengfengzhidao.com/uploads/file/avatar/%E5%A4%B4%E5%83%8F_0006_23.jpg" alt="">
            </div>
            <div class="user_info_info">
              <div class="user_name">
                枫枫
              </div>
              <div class="user_abstract">
                一个疯狂的coder
              </div>
            </div>
            <div class="user_link">
              <a href="#"><i class="fa fa-github-square"></i></a>
            </div>
            <div class="article_data">
              <div class="item"><span>109</span><span>浏览</span></div>
              <div class="item"><span>0</span><span>收藏</span></div>
              <div class="item"><span>3</span><span>点赞</span></div>
              <div class="item"><span>2</span><span>评论</span></div>
            </div>
          </div>
          <div class="article_directory">
            <div class="title">
              文章目录
            </div>
            <div class="body">
              12
            </div>
          </div>
          <div class="article_action">
            <div class="item">赞</div>
            <div class="item">藏</div>
            <div class="item">顶</div>
            <div class="item">评</div>
          </div>
        </aside>
      </div>
    </div>
    <GVBFooter></GVBFooter>
  </div>

</template>

<script setup>
import GVBNav from "@/components/gvb_nav.vue"
import GVBBanner from "@/components/gvb_banner.vue"
import GVBFooter from "@/components/gvb_footer.vue"
import {useRoute} from "vue-router";

const route = useRoute()
console.log(route)
</script>


<style lang="scss">
.article_view {
  .gvb_inner_container {
    display: flex;
    justify-content: space-between;

    > article {
      width: calc(100% - 300px);

      .article_head {
        padding: 20px 0 10px 0;
        background-color: var(--card_bg);
        border-radius: 5px 5px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
          font-weight: 700;
        }

        .info {
          .date {
            margin-right: 20px;
          }
        }

        .tag {
          display: flex;
          align-items: center;

          .fa-tags {
            margin-right: 10px;
          }
        }
      }

      .article_content {
        min-height: 100px;
        background-color: var(--card_bg);
        margin-top: 1px;
      }

      .article_on_the {
        padding: 20px;
        background-color: var(--card_bg);
        border-radius: 0 0 5px 5px;

        .article_on_the_inner {
          display: flex;
          padding-top: 10px;
          justify-content: space-between;
          border-top: 1px solid var(--bg);
        }
      }

      .article_comment_to {
        margin-top: 20px;
        background-color: var(--card_bg);
        padding: 20px;
        border-radius: 5px;

        .title {
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid var(--bg);
          padding-bottom: 10px;
        }

        .body {
          margin-top: 10px;
          position: relative;

          .ant-input {
            border-radius: 5px;
          }

          .add_comment_btn {
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
        }

        .comment_footer {
          margin-top: 10px;

          span {
            color: #ff9800;
          }

        }
      }
    }

    > aside {
      width: 280px;

      .article_user_info {
        background-color: var(--card_bg);
        border-radius: 5px;
        padding: 20px;

        .user_info_avatar {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;

          img {
            display: block;
            width: 70px;
            height: 70px;
            border-radius: 50%;
          }
        }

        .user_info_info {
          display: flex;
          flex-direction: column;
          align-items: center;

          .user_name {
            font-size: 18px;
            font-weight: 700;
          }

          .user_abstract {
            color: var(--text);
          }
        }

        .user_link {
          display: flex;
          margin: 20px 0;
          display: flex;
          justify-content: center;

          a {
            margin-right: 20px;
            color: var(--text);

            &:last-child {
              margin-right: 0;
            }

            i {
              font-size: 28px;
            }
          }
        }

        .article_data {
          display: grid;
          grid-template-columns: repeat(4, 1fr);

          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

          }

        }

      }

      .article_directory {
        padding: 20px;
        border-radius: 5px;
        background-color: var(--card_bg);
        margin-top: 20px;

        .title {
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid var(--bg);
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        .body {
          max-height: 200px;
          overflow-y: auto;
          overflow-x: hidden;
          display: grid;
          grid-row-gap: 10px;
        }
      }

      .article_action{
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 10px;
        .item{
          background-color: var(--card_bg);
          padding: 10px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &:first-child{
            border-radius: 5px 0 0 5px;
          }

          &:last-child{
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
  }
}
</style>