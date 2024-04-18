import React from 'react';
import './App.css';
import Form from './Component/form';
import Homepage from './Homepage';
import Map from './Component/mapTest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mapp from './Component/mappTets';
 
function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Routes>
                        <Route path="/form" element={<Form />} />
                        <Route path="/" element={<Homepage />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/mapp" element={<Mapp />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
 export default App;