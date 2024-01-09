import React from "react";
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Homepage from "./pages/Homepage";
import Notepage from "./pages/Notepage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/notepad/:id" element={<Notepage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
