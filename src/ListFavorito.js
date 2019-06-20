
import React,{ Component }   from 'react';
class ListFavorito extends Component{ 
    constructor(props) {
        super(props);
        this.state={
            listado : false
        };
    }
    render(){
       return(<div>
        <p>{this.props.title}</p>      
       </div>);
    }
    
}
export default ListFavorito;