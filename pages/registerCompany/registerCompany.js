// pages/registerCompany/registerCompany.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    address:''
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
  bindKeyInput(e){
    let key = e.currentTarget.dataset.key;
    if(key == 'name'){
      this.setData({name:e.detail.value})
    }else if (key == 'adress') {
      this.setData({address:e.detail.value})
    } 
  },
  // 数据提交
  async formSubmit(e) {
    wx.showLoading({
      title: '提交中',
      mask:true,
    })
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/company/register',
      method:"POST",
      header:{'token':getApp().globalData.token,
    'Content-Type':'application/json'},
    data:{
      companyName:this.data.name,
      companyAddress:this.data.address
    },
    success:function(e){
      wx.hideLoading();
      wx.navigateBack({
        delta:2
      });
    },
    fail:function(e){
      wx.hideLoading();
      wx.showToast({
        title: '创建失败',
      })
    }
    })
  }
})