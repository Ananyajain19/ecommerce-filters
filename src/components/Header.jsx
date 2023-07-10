import React from 'react'
import FilterDropdown from './FilterDropdown'
import { BsCart4 } from 'react-icons/bs'
import {BiSearchAlt2} from 'react-icons/bi'
import {FiGift} from 'react-icons/fi'
import './Header.css';
const Header = () => {
  return (
    <div className='main-header'>
        <div>
      <FilterDropdown />
      </div>
      <span className='logo'>To&From</span>
      <div className='right-icons'>
        <div>{<BiSearchAlt2/>}</div>
      <div>{<FiGift/>}</div>
      <div>{<BsCart4/>}</div>
      
      </div>
      
    </div>
  )
}

export default Header
