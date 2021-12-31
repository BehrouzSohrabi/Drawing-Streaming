import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Menu from './components/Menu';
import List from './components/List';
import Canvas from './components/Canvas';
import View from './components/View';

const App = () => {
	const [pageTitle, setPageTitle] = useState(Header.defaultProps.title);
	const changePageTitle = (title: string) => {
		setPageTitle(title)
	}
	return (
		<Router>
			<div className="App">
				<Header title={pageTitle} linkClick={changePageTitle} />
				<Routes>
					<Route path='/' element={<Menu linkClick={changePageTitle} />} />
					<Route path='/list' element={<List />} />
					<Route path='/view' element={<View />} />
					<Route path='/canvas' element={<Canvas />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
