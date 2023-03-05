<template>
  <div class="gvb_tabs">
    <div class="gvb_tab_item home">
      首页
    </div>
    <div class="gvb_tab_item">
      首页
      <span class="gvb_tab_remove_icon">×</span>
    </div>
    <div class="gvb_tab_item active">
      首页
      <span class="gvb_tab_remove_icon">×</span>
    </div>

    <div class="gvb_tab_item remove_all">
      全部关闭
    </div>

  </div>
</template>

<script>
</script>

<style lang="scss">
.gvb_tabs {
  height: 30px;
  border-color: var(--order);
  border-style: solid;
  border-width: 1px 0 1px 0;
  background-color: var(--card_bg);
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;

  .gvb_tab_item {
    background-color: var(--card_bg);
    border: 1px solid var(--card_boder);
    padding: 0 10px;
    margin-right: 10px;
    cursor: pointer;
    color: var(--text);
    display: flex;
    align-items: center;

    .gvb_tab_remove_icon {
      cursor: pointer;
      width: 12px;
      height: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      border-radius: 50%;

      &:hover {
        background-color: #f0eeee;
      }
    }

    &:first-child {
      margin-left: 20px;
    }

    &.active {
      background-color: var(--active);
      border-color: var(--active);
      color: white;

      &::before {
        display: inline-block;
        content: "";
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 50%;
        margin-right: 5px;
      }

      .gvb_tab_remove_icon:hover{
        background-color: #8fbef3;
      }
    }

    &.remove_all{
      position: absolute;
      right: 10px;

    }
  }
}
</style>