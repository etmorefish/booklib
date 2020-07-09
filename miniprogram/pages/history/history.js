// pages/history/history.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const db = wx.cloud.database()
const _ = db.command

const book = db.collection('library')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection('bhistory').get().then(res => {
      console.log(res.data)
      this.setData({
        hbook: res.data
      })
    });

  },
  
  up: function(event) {
    let bid = event.currentTarget.dataset.id;
    console.log(bid)
    book.doc(bid).get().then(res => {
      console.log(res)
      this.setData({
        bookname: res.data.bookname
      })
    })

  },
  // delete
  del: function(event) {
    var id = event.currentTarget.dataset.id;
    console.log('del' + id)
    db.collection('bhistory').doc(id).remove().then(res => {
      console.log(res)
      Toast.success('还书成功' );
    });
    book.doc(id).update({
      data: {
        total: _.inc(1)
      }
    }).then(res => {
      Toast.success('查询到' + res.data.length + '条数据');
      console.log(res)
    });

  },

  // renew
  renew: function(event) {
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    db.collection('bhistory').doc(id).get().then(res => {
      this.setData({
        time: res.data.time
      });
      console.log(this.data.time);
      db.collection('bhistory').doc(id).update({
        data:{
          time:_.inc(15)
        }
      }).then(res =>{
        Toast.success('成功续借15天')
        // wx.navigateTo({
        //   url: '../history/history',
        // })
        console.log(res)
        }).catch(e => {
          console.log(e)
        })
    });
    // var time = this.data.time + 15 ;


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    db.collection('bhistory').get().then(res => {
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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})