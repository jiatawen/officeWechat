// pages/reason/reason.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ['请假', '出差', '加班'],
    status: "",
    reason_type: ['年假', '事假', '病假', '调休假', '其他'],
    reason_type_Index: 0,
    date: {
      start_date: '',
      end_date: '',

    },
    reason:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      status: options.status,
      ['date.start_date']:new Date().toISOString().substring(0, 10),
      ['date.end_date']:new Date().toISOString().substring(0, 10)
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
  /**
   * 切换请假类型
   */
  onReasonTypeChange(e) {
    this.setData({
      reason_type_Index: e.detail.value
    })
  },
  onStartDateChange(e) {
    this.setData({
      ['date.start_date']: e.detail.value
    })
    if (this.data.date.start_date > this.data.date.end_date) {
      this.setData({
        ['date.end_date']: e.detail.value
      })
    }
  },
  onEndDateChange(e) {
    this.setData({
      ['date.end_date']: e.detail.value
    })
  },
  onReasonChange(){
    console.log('onReasonChange')
  }
})