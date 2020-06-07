// pages/add/add.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const db = wx.cloud.database()
const _ = db.command

const book = db.collection('library')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname: '',
    author:'',
    info:'',
    price:'',
    publisher:'',
    rating_nums:'',
    total:'',
    imgurl:'',
    translater:''
  },

  input1: function(enevt) {
    // console.log(enevt.detail)
    this.data.bookname = enevt.detail
  },
  input2: function(enevt) {
    this.data.author = enevt.detail
  },
  input3: function(enevt) {
    this.data.info = enevt.detail
  },
  input4: function(enevt) {
    this.data.price = enevt.detail
  },
  input5: function(enevt) {
    this.data.publisher = enevt.detail
  },
  input6: function(enevt) {
    this.data.rating_nums = enevt.detail
  },
  input7: function(enevt) {
    this.data.total = enevt.detail
  },
  input8: function(enevt) {
    this.data.imgurl = enevt.detail
  },
  input9: function(enevt) {
    this.data.translater = enevt.detail
  },

add:function(event){
  console.log(this.data)
  book.add({
    data: this.data
  }).then(res =>{
    Toast.success('添加成功');
    console.log(res)
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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