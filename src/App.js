import React from 'react';
import './App.css';
import Form from './Component/form';
import Homepage from './Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mapp from './Component/mapp';
import MappTest from './Component/mappTets';
import Map from './Component/map';


 
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
                        <Route path="/map" element={<Map/>} />
                  
                    </Routes>
                </div>
            </Router>
        </div>
    );
}
 export default App;