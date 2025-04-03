// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
    token:'',
    userName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    const app = getApp();
    this.setData({
      token:app.globalData.token
    })
  },
  downloadImage(){
    let that = this;
    wx.downloadFile({
      url: 'https://cjw.sa1.tunnelfrp.com/user/getAvatarImg',
      header:{token:this.data.token},
      success:function(e){
        console.log(e)
        that.setData({
          avatarUrl:e.tempFilePath
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
    this.downloadImage();
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/user/getUser',
      method:'GET',
      header:{token:this.data.token},
      success:function(e){
        let user = e.data.data
        console.log(user)
        that.setData({
          userName:user.userName
        })
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
      header:{
        token:this.data.token
      },
      success:function(e){
        console.log(e)
      }
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
  }
})