// pages/like/like.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const db = wx.cloud.database()
const _ = db.command

const book = db.collection('blikes')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

info:function(e){
  console.log(e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '../info/info?id=' + e.currentTarget.dataset.id 
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   book.get().then(res => {
      console.log(res.data)
      this.setData({
        hbook: res.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    book.get().then(res => {
      console.log(res.data)
      this.setData({
        hbook: res.data
      })
      console.log('数据更新完成')
      wx.stopPullDownRefresh()
    });

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})