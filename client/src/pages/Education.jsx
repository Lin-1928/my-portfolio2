import { useEffect, useState } from "react";
import axios from "axios";

// 接收父组件传来的 user
export default function Education({ user }) {
  const [qualifications, setQualifications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completion: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // === 1. 权限判断 ===
  const isAdmin = user && user.role === "admin";

  const fetchQualifications = async () => {
    try {
      // 注意：这里用的是 api/qualifications，请确保你后端路由也是这个
      const res = await axios.get("http://localhost:3000/api/qualifications");
      setQualifications(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  // === 2. 提交 (自动补全用户信息) ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAdmin) {
      setMessage(" 权限不足");
      return;
    }

    try {
      const payload = {
        ...form,
        // === 关键：带上身份信息通过数据库验证 ===
        role: user.role,
        email: user.email,
        firstname: user.name || "Admin",
        lastname: "(Manager)", 
      };

      await axios.post("http://localhost:3000/api/qualifications", payload);
      
      setMessage("Education record added!");
      setForm({ title: "", description: "", completion: "" });
      fetchQualifications();
    } catch (err) {
      setMessage(err.response?.data?.error || " Error adding record");
    }
  };

  // === 3. 删除 ===
  const handleDelete = async (id) => {
    if (!isAdmin) return;

    try {
      await axios.delete(`http://localhost:3000/api/qualifications/${id}`, {
        data: { role: user.role } // 带上权限
      });
      fetchQualifications();
      setMessage(" Deleted successfully");
    } catch (err) {
      console.error(err);
      setMessage(" Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Education & Qualifications</h1>

     
      <div style={{ marginBottom: "20px", padding: "10px", background: "#eef" }}>
        Logged in as: <strong>{user ? user.name : "Guest"}</strong>
        {isAdmin && <span style={{color:"green", marginLeft:"10px", fontWeight:"bold"}}>(Admin Mode)</span>}
      </div>

      {message && <p style={{ color: "blue" }}>{message}</p>}

    
      {isAdmin && (
        <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
          <h3>Add New Qualification</h3>
          <input
            type="text" placeholder="Title (e.g. BSc Computer Science)" value={form.title} required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <textarea
            placeholder="Description (School name, details...)" value={form.description} required
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="date" value={form.completion} required
            onChange={(e) => setForm({ ...form, completion: e.target.value })}
            style={{ display: "block", marginBottom: "10px" }}
          />
          <button type="submit">Add Record</button>
        </form>
      )}

      <hr />

     
      <h2>Records</h2>
      {qualifications.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {qualifications.map((q) => (
            <li key={q._id} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
              <h3>{q.title}</h3>
              <p>{q.description}</p>
              <small>Date: {new Date(q.completion).toLocaleDateString()}</small>
              <br/>
              {isAdmin && (
                <button onClick={() => handleDelete(q._id)} style={{ color: "red", marginTop: "5px" }}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


//3
/*import { useEffect, useState } from "react";
import axios from "axios";

export default function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completion: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 获取所有 qualifications
  const fetchQualifications = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/qualifications");
      setQualifications(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  // 表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/qualifications", form);
      setMessage("Education record added successfully!");
      setForm({ title: "", description: "", completion: "" });
      fetchQualifications(); // 重新加载列表
    } catch (err) {
      setMessage(err.response?.data?.error || "Error adding record");
    }
  };

  // 删除 record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/qualifications/${id}`);
      fetchQualifications(); // 更新列表
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Education</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea><br />
        <input
          type="date"
          value={form.completion}
          onChange={(e) => setForm({ ...form, completion: e.target.value })}
          required
        /><br />
        <button type="submit">Add Education</button>
      </form>
      {message && <p>{message}</p>}

      <h2>All Education Records</h2>
      {qualifications.length === 0 ? (
        <p>No education records yet.</p>
      ) : (
        <ul>
          {qualifications.map((q) => (
            <li key={q._id}>
              <h3>{q.title}</h3>
              <p>{q.description}</p>
              <p>Completed on: {new Date(q.completion).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(q._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}




//2
/*import { useEffect, useState } from "react";
import axios from "axios";

export default function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/qualifications")
      .then((res) => {
        setQualifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Education</h1>
      {qualifications.length === 0 ? (
        <p>No education records yet.</p>
      ) : (
        <ul>
          {qualifications.map((q) => (
            <li key={q._id}>
              <h3>{q.title}</h3>
              <p>{q.description}</p>
              <p>Completed on: {new Date(q.completion).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}







/*export default function Education() {
  return (
    <div>
      <h1>Education</h1>
      <p>Centennia College 2025</p>
    </div>
  );
}*/
