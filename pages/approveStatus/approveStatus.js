// pages/approveStatus/approveStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ['请假', '出差', '加班'],
    list:[{
      id:1,
      status:false,
      typeIndex:0,
      startTime:'2020-01-10',
      endTime:'2022-01-10'
    },{
      id:2,
      status:true,
      typeIndex:0,
      startTime:'2020-01-10',
      endTime:'2022-01-10'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  }
})