// pages/info/info.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const db = wx.cloud.database()
const _ = db.command

const book = db.collection('library')
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
      book:'',
      bookname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
   book.doc(options.id).get({
      success: res => {
        console.log('info:'+res.data)
        console.log('name:' + res.data.bookname)
        this.data.bookname = res.data.bookname
        this.setData({
          book: res.data
        });
      },
      fail: err => {
        console.error(error)
      }
    })

  },

  // 订阅
  order: function (event) {
    // book.doc(event.currentTarget.dataset.id).get().then(res =>{
    //   console.log("1:"+res.data)
    // });
    console.log('id:'+event.currentTarget.dataset.id)
    book.doc(event.currentTarget.dataset.id).update({
      data:{
        total: _.inc(-1)
      }
    }).then( res =>{
      // Toast.success('查询到' + res.data.length + '条数据');
      console.log('gx-1:'+res)
    });
    db.collection('bhistory').add({
      data:{
        _id: event.currentTarget.dataset.id,
        bookname: this.data.bookname,
        time: 30
      }
    }).then(res => {
      console.log('222'+res)
      Toast.success('借阅成功');

    })
      .catch(console.error)

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