//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    avatarUrl: '/images/user-unlogin.png',
    nickName: '用户未登陆'
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log(res)
                  console.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  // wx.request({
                  //     // 自行补上自己的 APPID 和 SECRET
                  //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                  //     success: res => {
                  //         // 获取到用户的 openid
                  //         console.log("用户的openid:" + res.data.openid);
                  //     }
                  // });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      let {
        avatarUrl,
        city,
        nickName
      } = e.detail.userInfo
      avatarUrl = avatarUrl.split("/")
      avatarUrl[avatarUrl.length - 1] = 0;
      avatarUrl = avatarUrl.join('/');
      this.setData({
        isHide: false,
        avatarUrl,
        city,
        nickName
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  getUserInfomation: function (event) {
    let {
      avatarUrl,
      city,
      nickName
    } = event.detail.userInfo
    avatarUrl = avatarUrl.split("/")
    avatarUrl[avatarUrl.length - 1] = 0;
    avatarUrl = avatarUrl.join('/');
    this.setData({
      avatarUrl,
      city,
      nickName
    })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('userInfo').where({
      _openid: _.eq(app.globalData.openid)
    }).count({
      success: res => {
        if (res.total == 0) {
          db.collection('userInfo').add({
            data: {
              avatarUrl,
              city,
              nickName
            },
            success: res => {
              console.log('添加用户信息成功', res)
            },
            fail: err => {
              console.log('添加用户信息失败', err)
            }
          })
        } else {
          console.log('用户已存在')
        }
      },
      fail: err => {
        console.log('查询用户信息失败', err)
      }
    })
    this.onLoad()
  },
  history:function(event){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  current:function(event){
    wx.navigateTo({
      url: '../all/all',
    })
  },
  admin:function(event){
    wx.navigateTo({
      url: '../admin/admin',
    })
  },
  like:function(event){
    wx.navigateTo({
      url: '../like/like',
    })
  }

})
