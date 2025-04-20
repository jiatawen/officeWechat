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
    reason: '',
    approvalRoles: ['甲', '乙', '丙', '丁'],
    approvalIds: [],
    approvers: [],
    approverIds: [],
    showApprovalPicker: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      status: options.status,
      ['date.start_date']: new Date().toISOString().substring(0, 10),
      ['date.end_date']: new Date().toISOString().substring(0, 10)
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
    const that = this;
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/position/getLeaders',
      method: 'GET',
      header: {
        token: getApp().globalData.token
      },
      success: function (e) {
        const data = e.data.data;
        const approvalRoles = [];
        const approvalIds = [];
        data.map(item => {
          approvalRoles.push(item.userName)
          approvalIds.push(item.positionId)
        })
        that.setData({
          approvalRoles: approvalRoles,
          approvalIds: approvalIds
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
  onReasonChange(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  // 显示选择器 
  showApprovalPicker() {
    this.setData({
      showApprovalPicker: true
    })
  },

  // 隐藏选择器 
  hideApprovalPicker() {
    this.setData({
      showApprovalPicker: false
    })
  },

  // 选择审批人 
  selectApprover(e) {
    const role = e.currentTarget.dataset.role
    const index = this.data.approvalRoles.indexOf(role) // 获取角色索引 

    if (index !== -1 && !this.data.approvers.includes(role)) {
      const selectedId = this.data.approvalIds[index] // 获取对应ID 

      this.setData({
        approvers: [...this.data.approvers, role],
        approverIds: [...this.data.approverIds, selectedId],
        showApprovalPicker: false
      })
    }
  },
  removeApprover(e) {
    const index = e.currentTarget.dataset.index

    this.setData({
      approvers: this.data.approvers.filter((_, i) => i !== index),
      approverIds: this.data.approverIds.filter((_, i) => i !== index)
    })

    // 触觉反馈（保持原功能）
    wx.createFeedback({
      type: 'impact',
      level: 'light'
    }).exec()
  },
  subReason() {
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    wx.request({
      url: `https://cjw.sa1.tunnelfrp.com/examine/setExamine?positionIds=${this.data.approverIds}`,
      method: 'POST',
      header: {
        token: getApp().globalData.token,
        'Content-Type': 'application/json'
      },
      data: {
        examineType: this.data.type[this.data.status],
        content: this.data.reason,
        startDate: this.data.date.start_date,
        endDate: this.data.date.end_date
      },
      success: function (e) {
        wx.hideLoading()
        if (e.data.data != 0) {
          wx.showToast({
            title: '提交成功',
            icon:'success'
          })
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
        }else{
          wx.showToast({
            title: '提交失败',
            icon:'error'
          })
        }
      }
    })
  }
});