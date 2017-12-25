//保存各个集合的Schema文件(集合属性)

module.exports = {
  user: {
    name: {type: String, required: true},
    password: {type: String, required: true}
  },
  commodity: {
    name: String,
    price: Number,
    imgSrc: String
  },
  cart: {
    uId: {type: String},//用户id
    cId: {type: String},//商品id
    cName: {type: String},
    cPrice: {type: String},
    cImgSrc: {type: String},
    cQuantity: {type: Number},
    cStatus: {type: Boolean, default: false}
  }
};
