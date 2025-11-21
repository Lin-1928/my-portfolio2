import { Link } from "react-router-dom"; 
import Logo from "./Logo";

export default function Navbar({ user, setUser }) {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", 
        padding: "10px 20px",
        backgroundColor: "#f0f0f0",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
      }}
    >
      <Logo />
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          margin: 0,
          gap: "15px",
        }}
      >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/education">Education</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        {}
        {!user ? (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li style={{ marginLeft: "10px" }}>Hello, {user.name}</li>
            <li>
              <button 
                onClick={handleSignOut} 
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}




/*import { Link } from "react-router-dom";
import Logo from "./Logo"; 

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", 
        padding: "10px 20px",
        backgroundColor: "#f0f0f0",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
      }}
    >
      <Logo />
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          margin: 0,
          gap: "15px",
        }}
      >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/education">Education</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}*/

