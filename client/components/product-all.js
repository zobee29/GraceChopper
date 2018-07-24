import React from 'react'
import {connect} from 'react-redux'
import { products } from '../store/products'
import { Link } from 'react-router-dom'


class ProductAll extends React.Component{
    constructor(){
        super()
        
    }

    componentDidMount(){
        this.props.fetchProducts();
        this.setState({});
    }

    render(){
        if(!this.props.products.length){
            return(<h1>Loading</h1>)
        } else{
            console.log("this.props", this.props)
    return(
            <div>
                {this.props.products.map((elements) => (
                    <div id='mainInfo' key={elements.id}>
                        <Link to={`/products/${elements.id}`}><h1>{elements.title}</h1></Link>
                        <h3>${elements.price}</h3>
                        <h3>{elements.stock} in stock</h3>
                        <img src={elements.imageUrl}/>
                    </div>
                    ))
                }
            </div>
        )}}
    }

    

const mapStateToProps = state => {
    return{
        products: state.products
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => {
        dispatch(products())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductAll)