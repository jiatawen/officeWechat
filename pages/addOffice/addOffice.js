// pages/addOffice/addOffice.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId: '',
    companyName: '',
    showAdd: false,
    scanActive: true,
    scanArea: {
      left: 0,
      right: 280,
      top: 0,
      bottom: 280
    },
    lastScan: 0
  },
  handleScan({
    detail
  }) {
    const now = Date.now()

    // 防抖验证（500ms间隔）
    if (!detail.result || now - this.data.lastScan < 500) return

    this.setData({
      scanActive: false,
      lastScan: now
    })

    wx.showLoading({
      title: '处理中...',
      mask: true,
      success: () => {
        this.sendData(detail.result)
      }
    })
  },

  sendData(result) {
    let that = this;
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/company/getCompanyById',
      method: 'GET',
      header: {
        token: getApp().globalData.token,
        'Content-Type': 'application/json'
      },
      data: {
        companyId: result
      },
      success: (res) => {
        console.log(res)
        that.setData({
          companyId: res.data.data.companyId,
          companyName: res.data.data.companyName,
          showAdd: true
        })
      },
      complete: () => {
        wx.hideLoading()
        this.setData({
          scanActive: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
  createOffice() {
    wx.navigateTo({
      url: '/pages/registerCompany/registerCompany',
    })
  },
  joinCompany(e) {
    let that = this;
    wx.showLoading({
      title: '加入公司中',
      mask:true
    })
    console.log(e)
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/company/joinCompany',
      method: "POST",
      header: {
        token: getApp().globalData.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data:{
        companyId:this.data.companyId
      },
      success:function(e){
        console.log(e)
        wx.hideLoading()
        if(e.data.code==0){
          wx.showToast({
            title: '欢迎加入'+that.data.companyName,
            icon:'success',
            duration:2000,
            mask:true
          });
          const pages = getCurrentPages();
          const prevPage = pages[pages.length - 2];
          prevPage.setData({
            showAdd:false,
            companyName:that.data.companyName,
            companyId:that.data.companyId
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta:1,
              success:()=>{}
            })
          },2000)
        }
      },
      fail:function(e){
        wx.hideLoading()
        wx.showToast({
          title: '加入失败',
          icon:'error'
        })
      }
    })
  }
})