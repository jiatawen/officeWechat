// pages/companySetting/userSetting/userSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionId: '',
    userName: '',
    positionName: '',
    positionStartTime: '',
    positionEndTime: '',
    positionClockStatus: false,
    colleagues: [],
    colleaguesIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      positionId: options.positionId
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
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/position/getPosition',
      method: 'GET',
      header: {
        token: getApp().globalData.token
      },
      data: {
        positionId: this.data.positionId
      },
      success: function (e) {
        const data = e.data.data;
        //数据处理
        if (data.positionClockStatus == 0) {
          data.positionClockStatus = false;
        } else {
          data.positionClockStatus = true;
        }
        data.positionStartTime = data.positionStartTime.substring(0, 5);
        data.positionEndTime = data.positionEndTime.substring(0, 5);
        that.setData({
          userName: data.userName,
          positionName: data.positionName,
          positionStartTime: data.positionStartTime,
          positionEndTime: data.positionEndTime,
          positionClockStatus: data.positionClockStatus
        })
      },
      fail: function (e) {}
    })
    //获取上司的菜单栏
    this.getColleagues();
  },
  getColleagues() {
    let that = this;
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/position/getColleagues',
      method: 'GET',
      header: {
        token: getApp().globalData.token
      },
      data: {
        positionId: this.data.positionId
      },
      success: function (e) {
        that.setData({
          colleagues: e.data.data
        })
        wx.request({
          url: 'https://cjw.sa1.tunnelfrp.com/position/getLeaderId',
          method: 'GET',
          header: {
            token: getApp().globalData.token
          },
          data: {
            positionId: that.data.positionId
          },
          success: function (e) {
            const leaderId = e.data.data;

            // 遍历colleagues数组查找匹配项 
            const index = that.data.colleagues.findIndex(item =>
              item.positionId === leaderId.toString() // 确保类型一致 
            );
            if (index !== -1) {
              that.setData({
                colleaguesIndex: index
              });
            } else {
              console.warn(' 未找到匹配的领导信息');
            }
          }
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
  onPositionNameChange(e) {
    this.setData({
      positionName: e.detail.value
    })
  },
  onStartTimeChange(e) {
    this.setData({
      positionStartTime: e.detail.value
    })
  },
  onEndTimeChange(e) {
    this.setData({
      positionEndTime: e.detail.value
    })
  },
  onCheckChange(e) {
    this.setData({
      positionClockStatus: e.detail.value
    })
  },
  onLeaderChange(e) {
    this.setData({
      colleaguesIndex: e.detail.value
    })
  },
  onSubmit(e) {
    wx.showLoading({
      title: '保存中',
      mask:true
    })
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/position/updatePosition',
      method: "PUT",
      header: {
        token: getApp().globalData.token,
        'Content-Type': 'application/json'
      },
      data:{
        positionId:this.data.positionId,
        positionName:this.data.positionName,
        positionStartTime:this.data.positionStartTime,
        positionEndTime:this.data.positionEndTime,
        positionClockStatus:this.data.positionClockStatus?1:0,
        positionManagerId:this.data.colleagues[this.data.colleaguesIndex].positionId
      },
      success:function(e){
        wx.hideLoading()
        console.log(e)
        if(e.data.code==0){
          
          wx.showToast({
            title: '修改成功',
            icon:'success',
            duration:2000,
            mask:true
          });
          setTimeout(()=>{
            wx.navigateBack()
          },2000)
        }
      }
    })
  }
})