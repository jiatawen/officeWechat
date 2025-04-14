// pages/addOffice/addOffice.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companys:[],
    scanActive: true,
    scanArea: { left:0, right:280, top:0, bottom:280 },
    lastScan: 0 
  },
  handleScan({ detail }) {
    const now = Date.now() 
    
    // 防抖验证（500ms间隔）
    if (!detail.result  || now - this.data.lastScan  < 500) return 
    
    this.setData({  
      scanActive: false,
      lastScan: now 
    })
    
    wx.showLoading({ 
      title: '处理中...',
      mask: true,
      success: () => {
        console.log(detail)
        console.log(detail.result)
        this.sendData(detail.result) 
      }
    })
  },
 
  sendData(result) {
    wx.request({ 
      url: 'http://127.0.0.1:8081/test',
      method: 'POST',
      data: { code: result },
      success: (res) => {
        if (res.statusCode  === 200) {
          wx.showToast({  title: '识别成功' })
        }
      },
      complete: () => {
        wx.hideLoading() 
        this.setData({  scanActive: true })
      }
    })
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

  },
  /**
   * 创建企业
   */
  createOffice(){
    wx.navigateTo({
      url: '/pages/registerCompany/registerCompany',
    })
  }
})