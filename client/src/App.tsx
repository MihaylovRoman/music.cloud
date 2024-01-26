import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Registation from './pages/Registration/Registation';

function App() {
	return (
		<div className="App">

			<div className='container'>
				<Routes>
					<Route path='/' element={<Registation/>} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
