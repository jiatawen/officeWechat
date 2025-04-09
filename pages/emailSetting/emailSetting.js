// pages/emailSetting/emailSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      email:options.email
    })
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

  },
  clearMail(){
    wx.showModal({
      title: '是否删除',
      content: '',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          wx.request({
            url: 'https://cjw.sa1.tunnelfrp.com/email/clearMail',
            method:"DELETE",
            header:{token:getApp().globalData.token},
            success:function(e){
              let pages = getCurrentPages();
              let prevpage=pages[pages.length - 2];
              if(prevpage){
                prevpage.setData({email:[],showRegister:'true'})
              }
              console.log(e)
              wx.navigateBack({
                delta: 0,
                success: (res) => {},
                fail: (res) => {},
                complete: (res) => {},
              })
            }
          })
        }
      }
    })
  }
})