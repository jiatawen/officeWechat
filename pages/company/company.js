// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId:'',
    companyName:'',
    imageSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    this.setData({companyId:options.companyId,companyName:options.companyName})
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/company/getCompanyQC',
      method:"GET",
      header:{token:getApp().globalData.token},
      success:function(e){
        console.log(e)
        const fs = wx.getFileSystemManager();
        const base64Data = e.data.data
        const filePath = `${wx.env.USER_DATA_PATH}/temp.png`
        const dataUrl = `data:image/png;base64,${base64Data}`;
        fs.writeFileSync(filePath,dataUrl.split(',')[1],'base64')
        that.setData({imageSrc:filePath})
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
  goToClock(e){
    wx.navigateTo({
      url: '/pages/companySetting/user/user',
    })
  }
})