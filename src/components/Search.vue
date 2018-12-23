<template>
 <!-- 搜索框 -->
    <div class="search-wrapper">
      <div class="search-input">
        <icon type="search" size="16" />
        搜索
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
.search-wrapper{
  background: #DD434F;
  padding:20rpx;

  .search-input{
    background:#fff;
    height:60rpx;
    font-size:15px;
    color:#999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-input icon{
    margin-right:5px;
  }
}

</style>