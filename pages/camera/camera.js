Page({
  data: {
    isAuth: false,
    faceImg: '',
    currentTime:'',
    clock:true
  },
  onLoad() {
    const _this = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          _this.setData({
            isAuth: true
          })
        } else {
          // 用户还没有授权，向用户发起授权请求
          wx.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              _this.setData({
                isAuth: true
              })
            },
            fail() { // 用户不同意授权
              _this.openSetting().then(res => {
                _this.setData({
                  isAuth: true
                })
              })
            }
          })
        }
      },
      fail: res => {
        console.log('获取用户授权信息失败')
      }
    })

    //实时显示时间
    this.updateTime();
    setInterval(this.updateTime,1000)
  },

  updateTime: function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份从0开始，需要加1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    // 格式化时间字符串
    const formattedTime = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    this.setData({
      currentTime: formattedTime
    });
  },

  // 打开授权设置界面
  openSetting() {
    const _this = this
    let promise = new Promise((resolve, reject) => {
      wx.showModal({
        title: '授权',
        content: '请先授权获取摄像头权限',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.camera']) { // 用户打开了授权开关
                  resolve(true)
                } else { // 用户没有打开授权开关， 继续打开设置页面
                  _this.openSetting().then(res => {
                    resolve(true)
                  })
                }
              },
              fail(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            _this.openSetting().then(res => {
              resolve(true)
            })
          }
        }
      })
    })
    return promise;
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          faceImg: res.tempImagePath
        })
        this.updatePhoto();
      }
    })
  },
  updatePhoto(){
    wx.showLoading({
      title: '打卡中',
      mask:true
    })
    wx.uploadFile({
      header:{token:getApp().globalData.token},
      filePath: this.data.faceImg,
      name: 'file',
      url: 'https://cjw.sa1.tunnelfrp.com/clock/checkPhoto',
      success:function(e){
        const response = JSON.parse(e.data)
        wx.hideLoading()
        if(response.code == 0){
          wx.showToast({
            title: '打卡成功',
            icon:'success'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 2000);
        }else{
          wx.showToast({
            title: '打卡失败',
            icon:'error'
          })
        }
      }
    })
  },
  onShow(){
    let that = this;
    wx.request({
      url: 'https://cjw.sa1.tunnelfrp.com/position/getClock',
      method:'GET',
      header:{token:getApp().globalData.token},
      success:function(e){
        if(e.data.code == -1){
          that.setData({
            clock:false
          })
        }
      }
    })
  }
})
