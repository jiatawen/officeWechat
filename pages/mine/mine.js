// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/image/头像.svg',
    userName: '',
    showAdd: true,
    companyName: '',
    companyId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    this.downloadImage();
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/user/getUser',
      method: 'GET',
      header: {
        token: getApp().globalData.token
      },
      success: function (e) {
        let user = e.data.data
        that.setData({
          userName: user.userName
        })
      }
    })
  },
  downloadImage() {
    let that = this;
    wx.downloadFile({
      url: 'https://cjw.sa1.tunnelfrp.com/user/getAvatarImg',
      header: {
        token: getApp().globalData.token
      },
      success: function (e) {
        that.setData({
          avatarUrl: e.tempFilePath
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
    let that = this;
    //获取企业信息
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/company/getCompany',
      method: 'GET',
      header: {
        token: getApp().globalData.token
      },
      success: function (e) {
        if (e.data.code == 0) {
          that.setData({
            showAdd: false,
            companyName: e.data.data.companyName,
            companyId: e.data.data.companyId,
          })
        } else if (e.data.code == -1) {
          that.setData({
            showAdd: true,
            companyName:null,
            companyId:null
          })
        }
      }
    })
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
   * 获取用户头像
   */
  onChooseAvatar(e) {
    this.setData({
      avatarUrl: e.detail.avatarUrl
    })
    wx.uploadFile({
      filePath: this.data.avatarUrl,
      name: 'file',
      url: 'https://cjw.sa1.tunnelfrp.com/user/upAvatarImg',
      header: {
        token: getApp().globalData.token
      },
      success: function (e) {}
    })
  },
  /**
   * 编辑个人资料
   */
  editProfile() {
    wx.navigateTo({
      url: '/pages/editProfile/editProfile',
    })
  },
  /**
   * 添加企业
   */
  addOffice() {
    wx.navigateTo({
      url: '/pages/addOffice/addOffice',
    })
  },
  toCompany() {
    let that = this;
    wx.navigateTo({
      url: '/pages/company/company?companyId=' + this.data.companyId + '&companyName=' + this.data.companyName,
    })
  },
  updatePhoto(){
    let that = this;
    wx.chooseMedia({
      count:1,
      mediaType:'image',
      sourceType:'album',
      success:function(e){
        that.uploadPhoto(e);
      }
    })
  },
  uploadPhoto(e){
    wx.uploadFile({
      filePath: e.tempFiles[0].tempFilePath,
      name: 'file',
      url: 'https://cjw.sa1.tunnelfrp.com/user/upUserPhoto',
      header:{
        token:getApp().globalData.token
      },
      success:function(e){
        console.log(e)
      }
    })
  }
})