import React, { useState } from 'react';
import ShowFilter from './ShowFilter';
import './FilterDropdown.css';
import {RiArrowDropDownLine} from 'react-icons/ri'
const FilterDropdown = () => {
  const [formVisible, setFormVisible] = useState(false);

  const handleButtonClick = () => {
    setFormVisible(true);
  };

  const handleClose = () => {
    setFormVisible(false);
  };

  return (
    <>
      <button className={`form-button ${formVisible ? 'active' : ''}`} onClick={handleButtonClick}>
        Gift Filter  <span className="arrow">{<RiArrowDropDownLine/>}</span>
      </button>
      <button className='sort-button'>Sort By</button>
      {formVisible && (
        <div className="modal">
          <div className="modal-content"> 
          <span style={{fontWeight:'bold'}}>Filters</span>
            <span className="close" onClick={handleClose}>&times;</span>
            
              <ShowFilter buttonval ={setFormVisible} />
           
          </div>
        </div>
      )}
    </>
  );
};

export default FilterDropdown;
