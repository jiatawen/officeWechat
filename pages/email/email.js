// pages/email/email.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuShow:false,
    canIUseGetUserProfile:true,
    avatarUrl:null,
    email:[],
    token:''
  },
  preventScroll(e){
  },

  /**
   * 点击邮箱详情
   */
  WatchEmail(e){
    wx.navigateTo({
      url: '/pages/emailInfo/emailInfo?emailid='+e.currentTarget.dataset.emailid,
    })
  },
  /**
   * 打开email_menu
   * @param e
   */
  menuDisplay(e){
    console.log(e)
    this.setData({
      menuShow: e.target.dataset.status
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    this.setData({
      token:app.globalData.token
    })
    let that = this;
    setTimeout(()=>{
      wx.request({
        url: 'https://cjw.sa1.tunnelfrp.com/email/getEmail',
        method:"GET",
        header:{token:app.globalData.token},
        success:function(e){
          console.log(e);
          that.setData({
            email:[...e.data.data]
          })
        }
      })
    },2000)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.showLoading({
      title: '获取邮件中',
      mask:true
    })
    let that = this;
      wx.request({
        url: 'https://cjw.sa1.tunnelfrp.com/email/refreshEmail',
        method:"GET",
        header:{token:getApp().globalData.token},
        success:function(e){
          console.log(e);
          that.setData({
            email:[...e.data.data]
          })
          wx.hideLoading()
        }
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})