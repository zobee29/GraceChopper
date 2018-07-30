import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_EDITED_PRODUCT = 'GET_EDITED_PRODUCT'
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS'

/**
 * INITIAL STATE
 */
const defaultProducts = {
  products: [],
  product: {},
  searchResults: {
    searchTerm: '',
    results: []
  }
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})
const addProduct = product => ({type: ADD_PRODUCT, product})
const getEditedProduct = product => ({type: GET_EDITED_PRODUCT, product})
const getSearchResults = searchResults => ({
  type: GET_SEARCH_RESULTS,
  searchResults
})

/**
 * THUNK CREATORS
 */
export const products = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/allproducts')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const singleProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewProduct = (
  productAndCategories,
  history
) => async dispatch => {
  try {
    const res = await axios.post(
      '/api/products/admin/add',
      productAndCategories
    )
    dispatch(addProduct(res.data))
    history.push(`/products/${res.data.id}`)
  } catch (err) {
    console.error(err)
  }
}

export const editProduct = (
  productAndCategories,
  history
) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/products/admin/${productAndCategories.id}`,
      productAndCategories
    )
    dispatch(getEditedProduct(res.data))
    history.push(`/admin/products`)
  } catch (err) {
    console.error(err)
  }
}

export const searchProducts = (text, history) => async dispatch => {
  try {
    console.log('text', text)
    const res = await axios.get(`/api/products/search?term=${text}`)
    const action = {
      searchTerm: text,
      results: res.data
    }
    dispatch(getSearchResults(action))
    history.push('/allproducts/results')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.product
      }
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product]
      }
    case GET_EDITED_PRODUCT:
      const updatedProducts = state.products.map(function(elem) {
        if (elem.id == action.product.id) {
          elem = action.product
        }
        return elem
      })
      return {
        ...state,
        products: updatedProducts
      }
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults
      }
    default:
      return state
  }
}
