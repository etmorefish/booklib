//index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'

const db = wx.cloud.database()
const _ = db.command

const book = db.collection('library')

const app = getApp()

Page({
  data: {
    value: '',
  },
  onChange(e) {
    console.log(e.detail)
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log(this.data.value)
    Toast('搜索' + this.data.value);
    
  },
  onClick(e){
    console.log('click:'+ this.data.value)

    Toast({
      context: this,
      message: '搜索' + this.data.value
    });
    let key = this.data.value;
    console.log("查询的内容", key)
    book.where(_.or([{
      bookname: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      author: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    }
    ])).get({
      success: res => {
        this.setData({
          books: res.data
        })
        console.log(res);
        // console.log(res.data.length)
        Toast.success('查询到' + res.data.length+'条数据');
      },
      fail: err => {
        Toast.fail('fail');
        console.log(err)
      }
    })
        // productsCollection.where({
    //   bookname: db.RegExp({
    //     regexp: key
    //   })
    // }).get().then( res => {
    //   console.log('*****:'+res.data)
    // })
  },
// 查看详情
  viewItem: function (event) {
    console.log(event)
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../info/info?id=' + id
    });
  },


  
});
