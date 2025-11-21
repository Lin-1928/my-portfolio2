import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

export default function App() {
  /////////// 从 localStorage 读取用户信息，页面刷新依然能保留??
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main style={{ padding: "1rem" }}>
        <Routes>
          {!user ? (
            <>
              <Route path="/signin" element={<SignIn setUser={setUser} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<SignIn setUser={setUser} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects user={user} />} />
              <Route path="/education" element={<Education user={user} />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact user={user} />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}




/*import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Services from './pages/Services'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}*/
