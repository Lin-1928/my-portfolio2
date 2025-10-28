
import logo from "../assets/favicon.ico";

export default function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
      
    </div>
  );
}
