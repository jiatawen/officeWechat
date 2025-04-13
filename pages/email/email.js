// pages/email/email.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuShow:false,
    canIUseGetUserProfile:true,
    avatarUrl:null,
    email:[],
    token:'',
    showRegister:'false',
    userEmail:'',
    emailPassword:''
  },
  preventScroll(e){
  },

  /**
   * 点击邮箱详情
   */
  WatchEmail(e){
    wx.navigateTo({
      url: '/pages/emailInfo/emailInfo?emailid='+e.currentTarget.dataset.emailid,
    })
  },
  /**
   * 打开email_menu
   * @param e
   */
  menuDisplay(e){
    this.setData({
      menuShow: e.target.dataset.status
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.showEmails()
  },
  showEmails(){
    wx.showLoading({
      title: '获取邮件',
    })
    const app = getApp();
    this.setData({
      token:app.globalData.token
    })
    let that = this;
    setTimeout(()=>{
      wx.request({
        url: 'https://cjw.sa1.tunnelfrp.com/email/getEmail',
        method:"GET",
        header:{token:app.globalData.token},
        success:function(e){
          if(e.data.code == -1){
            that.setData({
              showRegister:true
            })
          }else{
            that.setData({
              email:[...e.data.data]
            })
          }
          wx.hideLoading()
        },
        fail:function(){
          wx.hideLoading()
          wx.showToast({
            title: '获取邮件错误',
            icon:'error'
          })
        }
      })
    },2000)
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
    wx.showLoading({
      title: '获取邮件中',
      mask:true
    })
    let that = this;
      wx.request({
        url: 'https://cjw.sa1.tunnelfrp.com/email/refreshEmail',
        method:"GET",
        header:{token:getApp().globalData.token},
        success:function(e){
          that.setData({
            email:[...e.data.data]
          })
          wx.hideLoading()
        }
      })
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
  menuSetting(){
    wx.navigateTo({
      url: '/pages/emailSetting/emailSetting?email='+this.data.email[0].email,
    })
  },
  inputEmail(e){
    this.setData({
      userEmail:e.detail.value
    })
  },
  inputPassword(e){
    this.setData({emailPassword:e.detail.value})
  },
  setEmail(){
    wx.showLoading({
      title: '提交中',
      mask:true
    })
    const that = this;
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/email/setEmail',
      header:{token:getApp().globalData.token},
      data:{
        userEmail:this.data.userEmail,
        userEmailPassword:this.data.emailPassword
      },
      success:function(e){
        wx.hideLoading()
        that.setData({
          showRegister:false,
        })
        that.showEmails();
      }
    })
  }
})