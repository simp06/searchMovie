import React,{ Component }   from 'react';

import ListFavorito from './ListFavorito';
class App extends Component{
  constructor(props) {
    super(props);
    this.url_api ="https://www.omdbapi.com/?apikey=d8e6ea9d";
    this.state={
      search:'',
      result :[],
      response:true,
      error:false,
      intervalIsSet:false,
      mostrarDetalle:false,
      favorito:false,
      listFavoritos:null,
    }
   
  }
  componentDidMount() {
    this.buscarPelicula("");
  }
  onChange = e => {
    const { value } = e.target;
    this.setState({
      search: value
    });

    this.buscarPelicula(value);
  };
  
  buscarPelicula = (value) => {
      fetch( this.url_api+"&s='"+value+"'")
      .then(result => {
        return result.json();
      })
      .then(res =>{
          if(res.Response==="False"){
            this.setState({response:res.Response,error:res.Error});
          }else{
            this.setState({result:res.Search});
          }
         }
        );
    };
   
  componentWillUnmount() {
    this.buscarPelicula("");
  }
 esValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }
  mostrarDetalle = (data)=>{
    let elements = document.querySelectorAll('[data-imb='+data+']');
     for (let element of elements) {
        element.style.display = "block";
    }
  }
  agregarListadoFavorito = (titulo)=>{
    this.setState({favorito:true});
    let store = localStorage.getItem("favorito")==null?[]:JSON.parse(localStorage.getItem("favorito"));
    if(!store.includes(titulo)){
      store.push(titulo);
    }
    localStorage.setItem("favorito", JSON.stringify(store));
    this.setState({listFavoritos:JSON.parse(localStorage.getItem("favorito"))});
  }
 render(){
   const {result,error} =this.state;
    return (
      <div>
         <div style={{ padding: "10px" }}>
      <form>
        <input
          type="text"
          onChange={this.onChange}
          placeholder="ej:batman"
          style={{ width: "200px" }}
        />
     
        </form>
      </div>
          {error && (typeof result==="undefined" || result.length===0) ?error : 
           <table>
           <thead>
             <tr>
             <th>Titulo</th>
             <th>Año</th>
             <th>Foto</th>
             </tr>
           </thead>
            <tbody>
            { result.map(res => (
             <tr key={res.imdbID} onClick={() => this.mostrarDetalle(res.imdbID)}>
              <td>
              <span style={{ colodatar: "gray" }}> {res.Title} </span> 
              </td>      
              <td>  
              <span style={{ color: "gray" }}> {res.Year} </span>  
              </td> 
              <td>
              <span>{this.esValidUrl(res.Poster)?<img src={res.Poster} width="40" height="40" alt={res.Title}></img>:res.Poster}</span>
              </td>
              <td>
              <button onClick={() => this.agregarListadoFavorito(res.Title)}>
                Añadir a favoritos
               </button>
              </td>
              <td>
                <table data-imb={res.imdbID} style={{display: 'none' }}  >
                  <thead>
                  <tr>
                  <th>imdbID</th>
                  <th>Type</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{res.imdbID}</td>
                      <td>{res.Type}</td>
                    </tr>
                  </tbody>
                </table>
              </td>  
             </tr>
              )
            )}
            </tbody>
            </table>
            
          }
       {
       this.state.favorito &&
       <div>
         <h2>Listado de Peliculas favoritas</h2>
            { this.state.listFavoritos.map((pelicula, index) => {
                 return <ListFavorito key={index}
                 title={pelicula} />
            })}
       </div>
      }    
    </div>
    );
    }

  }
export default App;
