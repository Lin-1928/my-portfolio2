import React, { useState } from "react";
import axios from "axios";

export default function SignIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/signin", {
        email,
        password,
      });

      // 登录成功后，保存 token 和用户信息
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user); // 这里假设你有父组件管理用户状态

      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.response.data.error || "Signin failed");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
