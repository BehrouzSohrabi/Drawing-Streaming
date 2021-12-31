import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title, linkClick }: HeaderType) => {
	return (
		<div className="Header">
			{location.pathname !== '/' && (
				<Link
					className='button left'
					onClick={() => linkClick(Header.defaultProps.title)}
					to="/"
				>
					Back
				</Link>
			)}
			<p className='center'>{title}</p>
			{location.pathname !== '/' && (
				<div className='button right'>menu</div>
			)}
		</div>
	);
};

Header.defaultProps = {
	title: 'Draw and View',
};

interface HeaderType {
	title: string;
	linkClick: any;
}

export default Header;
