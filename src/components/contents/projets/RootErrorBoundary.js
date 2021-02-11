import React, { Component } from 'react'

class RootErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err){
        this.setState({hasError: true})
        console.log(err)
    }

    render(){
        if(this.state.hasError) {
            return <div style={{display: "flex", justifyContent:'center'}}><h2>Upcoming...</h2></div>
        }
        else {
            return this.props.children
        }
    }
}

export default RootErrorBoundary