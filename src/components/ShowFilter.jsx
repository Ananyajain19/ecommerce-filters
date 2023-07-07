// import "./styles.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ShowFilter() {
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
      
      <div>
        <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
          {field}
      <div>
      <select
        value={num}
        onChange={(e) => {
          setNum(e.target.value)
          
        }}
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

  const handleClick = () => {

    setSearchParams({gender: gid, occasion: oid, relationship:rid})
    
   };

   const handleDelete = () => {
      setSearchParams({});
   };

  return (
    <div>
    <div className="App">
      {Filters(state.genders ,"Gender",gid ,setGid)}
      {Filters(state.occasions ,"Occasion",oid,setOid)}
      {Filters(state.relationships,"Relationships",rid,setRid)}
    </div>
    <div className="button-row">
          <button className="apply-button" onClick={handleClick}>
            Apply Changes
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Changes
          </button>
        </div>
    </div>
  );
}
