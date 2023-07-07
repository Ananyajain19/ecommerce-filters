import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Dropdown.css";
import { useLocation } from "react-router-dom";

const Dropdown = () => {
  const location =useLocation()
  let params = new URLSearchParams(window.location.search);
  let genderid = params.get("gender");
  let occasionid = params.get("occasion");
  let relationid = params.get("relationship");
  const [gender, setGender] = useState( "");
  const [occasion, setOccasion] = useState( "");
  const [relation, setRelation] = useState( "");
  const [gdata, setGdata] = useState([]);
  const [odata, setOdata] = useState([]);
  const [rdata, setRdata] = useState([]);
  const [gid , setGid] = useState("");
  const [oid,setOid] = useState("");
  const [rid , setRid] =useState("");
  const [searchParams, setSearchParams] = useSearchParams();
 const check = new URLSearchParams(location.search)
  function selectList(input, setInput, data, field , num , setNum) {
    return (
      <div className="menu">
        <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
          {field}
          <div className="input-select-wrapper">
            <select
              onChange={(e) => {
                const newValue = e.target.value;
                setInput(newValue);
                setNum(data.filter((val)=>val.name === newValue).map((item)=>item.id))
              }} 
              value={input}
              className="dropdown-select"
              // const paramsToUpdate = { ...searchParams };
                // if (field.toLowerCase() === "gender") {
                //   paramsToUpdate.gender = newValue;
                // } if (field.toLowerCase() === "relationship") {
                //   paramsToUpdate.relationship = newValue;
                // } if (field.toLowerCase() === "occasion") {
                //   paramsToUpdate.occasion = newValue;
                // }

                // setSearchParams(paramsToUpdate);
            >
              <option>Select</option>
              {data.map((item) => (
                <option key={item.id} >{item.name}</option>
              ))}
            </select>
          </div>
        </label>
      </div>
    );
  }
  

  useEffect(() => {
    fetchData("gender", gender);
    
  }, [gender]);

  useEffect(() => {
    fetchData("occasion", occasion);
  }, [occasion]);

  useEffect(() => {
    fetchData("relationship", relation);
  }, [relation]);

  const fetchData = (value, item) => {
    fetch(`https://api.toandfrom.com/v2/${value}?all=true&status=activate`)
      .then((response) => response.json())
      .then((data) => {
        const results = data.data;
        console.log(results);
        if (value === "gender") {
          setGdata(results);
        } else if (value === "occasion") {
          setOdata(results);
        } else if (value === "relationship") {
          setRdata(results);
        }
      });
  };

  // function getValue(){
  //   return(
  //     <div>
  //   Gender:{genderid}
  //     </div>
  //   )
  // }

  function DisplayNames( data, param, string ) {
   if(check.toString().length>0)
{
  if(param){
    let Display = ""
    data.map((items) => {
      if (items.id === param) {
        Display= items.name;
      }
    })
    return (
      <button className="filter-button">
        {string}: {Display}
       
      </button>
    )}
}
  };

  function ShowFilter() {
    // const [applyfilter, setApplyfilter] = useState([]);
    // function Display(giftfor, event, bond){
       
    //   let filters = [];
    //       if (genderid) {
    //         let g = ""
    //         gdata.map((item)=>{
    //           if(item.id === genderid){
    //             g=item.name
    //           }
    //         })
    //         filters.push(g);
    //       }
    //       if (occasionid) {
    //         filters.push(odata.filter((val)=>val.id===oid).map((item)=>item.name));
    //       }
    //       if (relationid) {
    //         filters.push(rdata.filter((val)=>val.id===rid).map((item)=>item.name));
    //       }
    
    //       setApplyfilter(filters); //Display
    
    //       // setGender("");
    //       // setOccasion("");
    //       // setRelation("");
    //  }
    const handleClick = () => {

     setSearchParams({gender: gid, occasion: oid, relationship:rid})
     
    };

    const handleDelete = () => {
       setSearchParams({});
    };

 

    return (
      <>
        <div className="button-row">
          <button className="apply-button" onClick={handleClick}>
            Apply Changes
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Changes
          </button>
        </div>
        {/* <div>
          {applyfilter.map((item) => (
            <button className="filter-button">{item}</button>
          ))}
        </div> */}
      </>
    );
  }

  return (
    <div>
      <div className="dropdown-container">
        {selectList(gender, setGender, gdata, "Gender",gid,setGid)}
        {selectList(occasion, setOccasion, odata, "Occasion",oid, setOid)}
        {selectList(relation, setRelation, rdata, "Relationship",rid,setRid)}
      </div>
      <div className="applyfilter">
        {ShowFilter()}
        <div className="filter-div">{DisplayNames(odata,occasionid,"Occasion")}</div>
        <div className="filter-div">{DisplayNames(gdata,genderid,"Gender")}</div>
        <div className="filter-div">{DisplayNames(gdata,relationid,"Relationship")}</div>
        
        
      </div>
    </div>
  );
};

export default Dropdown;
