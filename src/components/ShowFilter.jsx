// import "./styles.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './ShowFilter.css'
export default function ShowFilter({buttonval}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gid , setGid] = useState(searchParams.get("gender")??"");
  const [oid,setOid] = useState(searchParams.get("occasion")??"");
  const [rid , setRid] =useState(searchParams.get("relationship")??"");

  const [state, setState] = useState({
    genders: [],
     occasions :[],
    relationships: []
  });
  
  useEffect(() => {
    (async () => {
      const [genders, occasions, relationships] = await Promise.all([
        fetch(
          `https://api.toandfrom.com/v2/gender?all=true&status=activate`
        )
          .then((res) => res.json())
          .then((res) => res.data),
        fetch(`https://api.toandfrom.com/v2/occasion?all=true&status=activate`)
          .then((res) => res.json())
          .then((res) => res.data),
        fetch(`https://api.toandfrom.com/v2/relationship?all=true&status=activate`)
          .then((res) => res.json())
          .then((res) => res.data)
      ]);
      setState({
        genders,
        occasions,
        relationships
      });
    })();
  }, []);

  function Filters(filtervalue ,field, num , setNum){

    
    return(
      
      <div className="menu">
        <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
          {field}
      <div className="input-select-wrapper">
      <select
        value={num}
        
        onChange={(e) => {
          setNum(e.target.value)
          
        }}
        className="dropdown-select"
      >
        <option value="">None</option>
        {filtervalue.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      </div>
      </label>
      </div>
    )
  }
 function Display (){
  const handleClick = () => {

    setSearchParams({gender: gid, occasion: oid, relationship:rid})
    
   };

   const handleDelete = () => {
      setSearchParams({});
      buttonval(false);
   };

   return(
    <div className="button-row" style={{fontFamily:"poppins"}}>
    <button className="apply-button" onClick={handleClick}>
      Apply Filters
    </button>
    <button className="delete-button" onClick={handleDelete}>
      Clear Filters
    </button>
  </div> 
   );

 }
  
  return (
    <div className="select-component">
      {Display()}
    <div className="dropdown-container">
      {Filters(state.genders ,"Gender",gid ,setGid)}
      {Filters(state.occasions ,"Occasion",oid,setOid)}
      {Filters(state.relationships,"Relationships",rid,setRid)}
    </div>
   
    </div>
  );
}
