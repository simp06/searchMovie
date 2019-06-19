import React,{ Component }   from 'react';


class App extends Component{
  constructor(props) {
    super(props);
    this.url_api ="http://www.omdbapi.com/?apikey=d8e6ea9d";
    this.state={
      search:'',
      result :[],
      response:true,
      error:false,
      intervalIsSet:false
    }
   
  }
  componentDidMount() {
   
    this.getResultFromDb("");
  }
  onChange = e => {
    const { value } = e.target;
    this.setState({
      search: value
    });

    this.getResultFromDb(value);
  };
  
  getResultFromDb = (value) => {
      fetch( this.url_api+"&s='"+value+"'")
      .then(result => {
        return result.json();
      })
      .then(res =>{
          console.log(res);
          if(res.Response==="False"){
            this.setState({response:res.Response,error:res.Error});
          }else{
            this.setState({result:res.Search});
          }
          
         }
        );
    
    };
   
  componentWillUnmount() {
    this.getResultFromDb("");
  }
 isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }
  imgError = (image) => {
    image.onerror = "";
    image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/NC_403.svg/600px-NC_403.svg.png";
    return true;
  }
  handleClick = ()=>{
    console.log("afsafsafaf");
  }
  

 render(){
   const {result,error} =this.state;
    return (
      <div>
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
             <tr key={res.imdbID} onClick={this.handleClick}>
              <td>
              <span style={{ color: "gray" }}> {res.Title} </span> 
              </td> 
              <td>
              <span style={{ color: "gray" }}> {res.Year} </span>  
              </td> 
              <td>
              <span>{this.isValidUrl(res.Poster)?<img src={res.Poster} width="40" height="40" alt={res.Title}></img>:res.Poster}</span>
              </td>
             </tr>   
            
            ))}
            </tbody></table>
          }
           
         
      <div style={{ padding: "10px" }}>
      <form>
        <input
          type="text"
          onChange={this.onChange}
          placeholder="add something in the database"
          style={{ width: "200px" }}
        />
        <button onClick={() => this.putDataToDB(this.state.message)}>
          ADD
        </button>
        </form>
      </div>
    </div>
    );
    }

  }
export default App;
