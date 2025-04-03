// pages/editProfile/editProfile.js 
Page({
  data: {
    token: '',
    nickname: '',
    genders: ['男', '女', '保密'],
    genderIndex: 2,
    birthday: '2000-01-01',
    birthdayFormatted: '2000年1月1日',
    signature: '',
    address: '',
    tel: '',
  },

  // 实时数据绑定核心方法 
  bindKeyInput(e) {
    let key = e.currentTarget.dataset.key;
    if (key == 'name') {
      this.setData({nickname:e.detail.value})
    } else if (key == 'adress') {
      this.setData({address:e.detail.value})
    } else if (key == 'phone') {
      this.setData({tel:e.detail.value})
    } else if (key == 'signature') {
      this.setData({signature:e.detail.value})
    }
  },

  // 增强型选择器处理 
  onGenderChange(e) {
    this.setData({
      genderIndex: e.detail.value,
    });
  },

  onDateChange(e) {
    const rawDate = e.detail.value;
    this.setData({
      birthday: rawDate,
      birthdayFormatted: this._formatDate(rawDate),
    });
  },

  // 数据格式化方法 
  _formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${year}年${parseInt(month)}月${parseInt(day)}日`;
  },

  // 数据提交
  async formSubmit(e) {
    wx.showLoading({
      title: '提交中',
      mask:true,
    })
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/user/edit',
      method:"PUT",
      header:{'token':this.data.token,'Content-Type':'application/json'},
      data:{
        userId:null,
        userName:this.data.nickname,
        userGender:this.data.genderIndex,
        userBirthday:this.data.birthday,
        userPhone:this.data.tel,
        userEmail:null,
        userAddress:this.data.address,
        userSignature:this.data.signature
      },
      success:function(e){
        console.log(e)
        wx.hideLoading()
        wx.showToast({
          title: '修改成功',
          icon:'success',
          duration:2000
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000);

      },
      fail:function(){
        wx.hideLoading()
        wx.showToast({
          title: '连接错误',
          icon:'error',
          duration:2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();
    this.setData({
      token: app.globalData.token
    })
    var that = this
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/user/getUser',
      header: {
        token: this.data.token
      },
      success: function (e) {
        let user = e.data.data
        that.setData({
          nickname: user.userName,
          genderIndex: user.userGender,
          birthday: user.userBirthday,
          address: user.userAddress,
          tel: user.userPhone,
          signature: user.userSignature
        });
      }
    })
  }
});