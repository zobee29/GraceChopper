import React from 'react'
import {connect} from 'react-redux'
import {products} from '../store/products'
import Sidebar from './sidebar'

class ProductAll extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    if (!this.props.products.length) {
      return <h1>Loading</h1>
    } else {
      const {activeCategories} = this.props
      let visibleProducts = this.props.products
      if (activeCategories.length !== 0) {
        visibleProducts = this.props.products.filter(product => {
            return activeCategories.every(tag => {
                return product.categories.map(cat => {
                    return cat.id
                }).includes(tag)
            })
        })
      }

      return (
        <div>
          <Sidebar />
          {visibleProducts.map(elements => (
            <div key={elements.id} id="mainInfo">
              <h1>{elements.title}</h1>
              <h3>${elements.price}</h3>
              <h3>{elements.stock} in stock</h3>
              <img src={elements.imageUrl} />
            </div>
          ))}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    activeCategories: state.categories.active
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => {
    dispatch(products())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAll)
