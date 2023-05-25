import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Notes from "./components/Notes";
import CreateNote from "./components/CreateNote";
import UpdateNote from "./components/UpdateNote";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route index element={<Navbar />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/update/:id" element={<UpdateNote />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
