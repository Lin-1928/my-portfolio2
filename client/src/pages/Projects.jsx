import { useEffect, useState } from "react";
import axios from "axios";

// Receive user info from parent component (includes name, email, role)
export default function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", completion: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // === 1. Real permission check ===
  const isAdmin = user && user.role === "admin";

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/projects");
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // === 2. Add project ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      setMessage("Admin only");
      return;
    }

    try {
      const payload = {
        ...form,
        role: user.role,
        email: user.email,
        firstname: user.name || "Admin",
        lastname: "(Manager)",
      };

      console.log("Submitting:", payload);

      await axios.post("http://localhost:3000/api/projects", payload);
      
      setMessage("✅ Project added successfully!");
      setForm({ title: "", description: "", completion: "" });
      fetchProjects();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error adding project");
    }
  };

  // === 3. Delete project ===
  const handleDelete = async (id) => {
    if (!isAdmin) return;

    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        data: { role: user.role } 
      });
      setMessage("✅ Project deleted successfully");
      fetchProjects();
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Failed to delete project");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Projects</h1>

      {/* Display current user info */}
      <div style={{ marginBottom: "20px", padding: "10px", background: "#eef" }}>
        Logged in as: <strong>{user ? user.name : "Not logged in"}</strong> <br/>
        Role: <span style={{ color: isAdmin ? "green" : "red", fontWeight: "bold" }}>
          {user ? user.role : "Guest"}
        </span>
        {!isAdmin && <p style={{fontSize:"12px", color:"#666"}}>(Regular users can only view projects)</p>}
      </div>

      {message && <p style={{ color: "blue" }}>{message}</p>}

      {/* Only admin can see the add project form */}
      {isAdmin && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px", border: "#5a5050ff", padding: "15px" }}>
          <h3>Add New Project (Admin Only)</h3>
          <input
            type="text" placeholder="Title" value={form.title} required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ display:"block", margin:"5px 0" }}
          />
          <textarea
            placeholder="Description" value={form.description} required
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ display:"block", margin:"5px 0" }}
          />
          <input
            type="date" value={form.completion} required
            onChange={(e) => setForm({ ...form, completion: e.target.value })}
            style={{ display:"block", margin:"5px 0" }}
          />
          <button type="submit">Add Project</button>
        </form>
      )}

      <hr />

      <h2>All Projects</h2>
      {projects.length === 0 ? <p>No projects yet.</p> : (
        <ul>
          {projects.map((p) => (
            <li key={p._id} style={{ marginBottom: "10px" }}>
              <strong>{p.title}</strong>: {p.description} <br/>
              <small>{new Date(p.completion).toLocaleDateString()}</small>
              
              {/* Only admin can see delete button */}
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(p._id)} 
                  style={{ marginLeft: "10px", color: "red" }}
                >
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



/*import { useEffect, useState } from "react";
import axios from "axios";

// 接收父组件传来的 user 信息 (包含 name, email, role)
export default function Projects({ user }) {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", completion: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // === 1. 真正的权限判断 ===
  // 只有当 user 存在，且 user.role 严格等于 'admin' 时，才是管理员
  // 如果 user 是 null，或者 role 是 'user'，这里就是 false
  const isAdmin = user && user.role === "admin";

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/projects");
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // === 2. 添加项目 (自动带上用户信息) ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 前端防线：如果不是 Admin，根本不准提交
    if (!isAdmin) {
      setMessage("admin only");
      return;
    }

    try {
      const payload = {
        ...form,
        // === 关键：使用真实登录用户的数据 ===
        role: user.role,                 // 发送真实的 role ('admin')
        email: user.email,               // 发送真实的 email
        firstname: user.name || "Admin", // 暂时用 name 代替 firstname
        lastname: "(Manager)",           // 暂时硬编码，或者你可以让 user 对象里包含 lastname
      };

      console.log("submiting:", payload);

      await axios.post("http://localhost:3000/api/projects", payload);
      
      setMessage("✅ successfully！");
      setForm({ title: "", description: "", completion: "" });
      fetchProjects();
    } catch (err) {
      setMessage(err.response?.data?.error || "eerror");
    }
  };

  // === 3. 删除项目 ===
  const handleDelete = async (id) => {
    if (!isAdmin) return; // 前端防线

    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        // 发送真实的 role
        data: { role: user.role } 
      });
      setMessage("✅ 删除成功");
      fetchProjects();
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ 删除失败");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Projects</h1>

      
      <div style={{ marginBottom: "20px", padding: "10px", background: "#eef" }}>
        当前登录: <strong>{user ? user.name : "未登录"}</strong> <br/>
        真实权限: <span style={{ color: isAdmin ? "green" : "red", fontWeight: "bold" }}>
          {user ? user.role : "Guest"}
        </span>
        {!isAdmin && <p style={{fontSize:"12px", color:"#666"}}>（普通用户只能查看，无法增删）</p>}
      </div>

      {message && <p style={{ color: "blue" }}>{message}</p>}

      
      {isAdmin && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px", border: "1px solid green", padding: "15px" }}>
          <h3>发布新项目 (Admin Area)</h3>
          <input
            type="text" placeholder="Title" value={form.title} required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ display:"block", margin:"5px 0" }}
          />
          <textarea
            placeholder="Description" value={form.description} required
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ display:"block", margin:"5px 0" }}
          />
          <input
            type="date" value={form.completion} required
            onChange={(e) => setForm({ ...form, completion: e.target.value })}
            style={{ display:"block", margin:"5px 0" }}
          />
          <button type="submit">Add Project</button>
        </form>
      )}

      <hr />

      <h2>All Projects</h2>
      {projects.length === 0 ? <p>暂无项目</p> : (
        <ul>
          {projects.map((p) => (
            <li key={p._id} style={{ marginBottom: "10px" }}>
              <strong>{p.title}</strong>: {p.description} <br/>
              <small>{new Date(p.completion).toLocaleDateString()}</small>
              
            
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(p._id)} 
                  style={{ marginLeft: "10px", color: "red" }}
                >
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












/*import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completion: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // 获取所有 projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/projects");
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 补上后端必填字段 firstname, lastname, email
      const payload = {
        ...form,
        firstname: "Admin",       // 可以改成你想显示的名字
        lastname: "Admin",
        email: "admin@example.com"
      };

      await axios.post("http://localhost:3000/api/projects", payload);
      setMessage("Project added successfully!");
      setForm({ title: "", description: "", completion: "" });
      fetchProjects(); // 重新加载列表
    } catch (err) {
      setMessage(err.response?.data?.error || "Error adding project");
    }
  };

  // 删除 project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`);
      fetchProjects(); // 更新列表
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Projects</h1>

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
        <button type="submit">Add Project</button>
      </form>
      {message && <p>{message}</p>}

      <h2>All Projects</h2>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((p) => (
            <li key={p._id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p>Completed on: {new Date(p.completion).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}







/*export default function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <p>TBD...</p>
    </div>
  );
}*/
