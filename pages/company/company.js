// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyId:'',
    companyName:'',
    imageSrc:'',
    owner:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({companyId:options.companyId,companyName:options.companyName})
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
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/company/getCompanyQC',
      method:"GET",
      header:{token:getApp().globalData.token},
      success:function(e){

        const fs = wx.getFileSystemManager();
        const base64Data = e.data.data
        const filePath = `${wx.env.USER_DATA_PATH}/temp.png`
        const dataUrl = `data:image/png;base64,${base64Data}`;
        fs.writeFileSync(filePath,dataUrl.split(',')[1],'base64')
        that.setData({imageSrc:filePath})
      }
    })

    //查看是否是公司的拥有者
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/company/checkCompany',
      method:'GET',
      header:{token:getApp().globalData.token},
      success:function(e){

        if(e.data.data){
          that.setData({
            owner:true
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
  goToClock(e){
    wx.navigateTo({
      url: '/pages/companySetting/user/user',
    })
  },
  //退出公司
  quitCompany(){
    let str = '确认退出？';
    if(this.data.owner){
      str = '确认解散？'
    }
    wx.showModal({
      title: '确认窗',
      content: str,
      complete: (res) => {
        if (res.cancel) {
          
        }
        if (res.confirm) {
          wx.request({
            url: 'https://cjw.sa1.tunnelfrp.com/company/quitCompany',
            method:'DELETE',
            header:{token:getApp().globalData.token},
            success:function(e){
              wx.navigateBack();
            }
          })
        }
      }
    })
  }
})