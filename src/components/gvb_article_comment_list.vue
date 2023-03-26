<template>
  <div class="gvb_article_comment_list">
    <div class="gvb_comment_item">
      <div class="avatar">
        <img
            src="http://blog.fengfengzhidao.com/uploads/file/avatar/%E6%9E%AB%E6%9E%AB%E7%9F%A5%E9%81%93_2022-12-21_21-20-55.png"
            alt="">
      </div>
      <div class="comment">
        <div class="name">小枫枫</div>
        <div class="comment_content">
          可以的
        </div>
        <div class="info">
          <span class="date">2023-03-26 15:25:25</span>
          <span class="apply">回复 (0)</span>
          <span class="delete">删除</span>
        </div>

        <div class="sub_comment_list">
          <div class="sub_comment_item">
            <div class="sub_avatar">
              <img
                  src="http://blog.fengfengzhidao.com/uploads/file/avatar/%E6%9E%AB%E6%9E%AB%E7%9F%A5%E9%81%93_2022-12-21_21-20-55.png"
                  alt="">
            </div>
            <div class="sub_comment">
              <div class="line">
                <span class="name">枫枫</span><span class="content">哪个好</span>
              </div>
              <div class="info">
                <span class="date">2012-12-12 12:12:12</span>
                <span class="delete">删除</span>
              </div>

            </div>
          </div>
          <div class="sub_comment_apply">
            <img
                src="http://blog.fengfengzhidao.com/uploads/file/avatar/%E6%9E%AB%E6%9E%AB%E7%9F%A5%E9%81%93_2022-12-21_21-20-55.png"
                alt="" class="user_avatar">
            <a-input class="comment_ipt" placeholder="回复 @ 小枫枫"></a-input>
            <a-button type="primary">回复</a-button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.gvb_article_comment_list {
  .gvb_comment_item {

    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .avatar {
      width: 40px;

      img {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 50%;
      }

    }

    .comment {
      width: calc(100% - 60px);
      background-color: var(--card_bg);
      border-radius: 5px;
      padding: 10px;

      > .name {
        color: var(--active);
        font-weight: 600;
        font-size: 16px;
      }

      .comment_content {
        color: var(--text);
      }

      .info {
        color: var(--text);

        .date {

        }

        .apply, .delete {
          cursor: pointer;
        }

        > span {
          margin-right: 10px;
        }
      }

      .sub_comment_list {
        margin-top: 10px;

        .sub_comment_item {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;

          .sub_avatar {
            width: 30px;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }

          .sub_comment {
            width: calc(100% - 40px);

            .line {
              .name {
                color: var(--h2);
                font-weight: 600;
              }

              .content {
                margin-left: 10px;
                color: var(--text);
              }
            }
          }
        }

        .sub_comment_apply {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .user_avatar {
            width: 30px;
            height: 30px;
          }

          .comment_ipt {
            margin: 0 10px;
          }

        }
      }
    }
  }
}
</style>