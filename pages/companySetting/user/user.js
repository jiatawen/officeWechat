// pages/companySetting/clock/clock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/position/getPositions',
      method: 'GET',
      header: {
        token: getApp().globalData.token
      },
      success: function (e) {
        const processedData = e.data.data.map(item  => {
          // 安全取值与格式校验 
          const formatTime = (timeStr) => {
            if (!timeStr || typeof timeStr !== 'string') return '--:--'; // 空值兜底 
            const parts = timeStr.split(':');  
            return parts.length  >= 2 ? `${parts[0]}:${parts[1]}` : '--:--'; // 兼容非标准格式 
          };
         
          return {
            ...item, // 保留其他字段 
            positionStartTime: formatTime(item.positionStartTime), 
            positionEndTime: formatTime(item.positionEndTime) 
          };
        });
         
        that.setData({ 
          users: processedData // 直接使用新数组 
        });
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
  setUser(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/companySetting/userSetting/userSetting?positionId='+e.target.dataset.positionid,
    })
  }
})