<template>
  <footer class="app_footer">
    <!-- Slogan -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <div>
            <i class="iconfont icon-footer01"></i>
            <span>包罗万象</span>
          </div>
          <div>
            <i class="iconfont icon-footer02"></i>
            <span>品质保证</span>
          </div>
          <div>
            <i class="iconfont icon-footer03"></i>
            <span>极速配送</span>
          </div>
        </div>
        <!-- 署名 -->
        <div class="name">
          <img src="@/assets/images/logo.png" alt="" />
          <span>Eshop</span>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped lang="scss">
.app_footer {
  overflow: hidden;
  color: #333;
  background-color: #f3f3f3;
  padding-top: 20px;
  .extra {
    background-color: #fff;
  }
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
    div {
      height: 58px;
      line-height: 58px;
      font-size: 28px;
      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
  .name {
    position: relative;
    height: 185px;
    padding-top: 77px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    img {
      position: absolute;
      bottom: 72px;
      left: 537px;
      height: 50px;
      width: 50px;
      background: #fff;
    }
    span {
      margin-left: 65px;
      font-size: 40px;
      font-style: italic;
    }
  }
}
</style>
