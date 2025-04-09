// pages/emailInfo/emailInfo.js
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
    console.log(options.emailid)
    let that = this;
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/email/getEmailById',
      header: {
        token: getApp().globalData.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      data: {
        emailId: options.emailid
      },
      success:function(e){
        that.setData({
          email:e.data.data
        })
      }
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
  aiHelp(){
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/email/aiHelp',
      method:"GET",
      header:{token:getApp().globalData.token},
      data:{
        emailId:this.data.email.emailId
      },
      success:function(e){
        console.log(e)
      }
    })
  }
})