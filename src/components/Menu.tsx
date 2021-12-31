import React from 'react';
import { Link } from 'react-router-dom'

const Menu = ({linkClick}: MenuType) => {
  return (
    <ul className='menu'>
      <li><Link onClick={() => linkClick('List')} to='/list'>List</Link></li>
      <li><Link onClick={() => linkClick('View')} to='/view'>View</Link></li>
      <li><Link onClick={() => linkClick('Canvas')} to='/canvas'>Canvas</Link></li>
    </ul>
  )
}

interface MenuType {
  linkClick: any;
}

export default Menu
