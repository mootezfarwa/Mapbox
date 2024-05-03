import React from 'react';
import './App.css';
import Form from './Component/form';
import Homepage from './Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './Component/mapp';
import Mapp from './Component/mapp';
import MappTest from './Component/mappTets';
import MapTest from './Component/mapTest';

 
function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Routes>
                        <Route path="/form" element={<Form />} />
                        <Route path="/" element={<Homepage />} />
                        <Route path="/mapp" element={<Mapp/>} />
                        <Route path="/mapTest" element={<MappTest/>} />
                        <Route path="/map" element={<MapTest/>} />
                  
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
 export default App;