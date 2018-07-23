const User = require('./user')
const Category = require('./category')
const Order = require('./order')
const OrderItem = require('./orderItem')
const Product = require('./product')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Product.hasMany(Category)
Category.hasMany(Product) //Category.hasMany(Category)

Product.hasMany(Review)
Review.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

OrderItem.hasOne(Product)
Product.belongsTo(OrderItem)

module.exports = {
  User,
  Category,
  Order,
  OrderItem,
  Product,
  Review
}
