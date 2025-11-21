import React, { useState, useEffect } from "react";
import axios from "axios";

// 接收父组件传来的 user
export default function Contact({ user }) {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", message: "" });
  const [message, setMessage] = useState("");
  
  // 判断是否是管理员
  const isAdmin = user && user.role === "admin";

  // 获取留言 (只有 Admin 需要运行这个)
  const fetchContacts = async () => {
    if (!isAdmin) return; // 普通用户不需要拉取列表
    try {
      const res = await axios.get("http://localhost:3000/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchContacts();
    }
  }, [isAdmin]); // 当 isAdmin 变化时运行

  // 发送留言 (所有人都可以)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 留言不需要发 role，因为是公开接口
      await axios.post("http://localhost:3000/api/contacts", form);
      
      setMessage("✅ Message sent successfully! We will contact you shortly.");
      setForm({ firstname: "", lastname: "", email: "", message: "" });
      
      // 如果是 Admin 自己发的，刷新下列表
      if (isAdmin) fetchContacts();
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Failed to send message");
    }
  };

  // 删除留言 (只有 Admin 可以)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${id}`, {
        data: { role: user.role } // 带上 Admin 权限
      });
      fetchContacts(); // 更新列表
    } catch (err) {
      console.error(err);
      alert("Failed to delete message");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Me</h1>
      <p>If you have any collaboration interests, please fill out the form below.</p>

      1. Send form (visible to all)
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text" placeholder="First Name" value={form.firstname} required
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text" placeholder="Last Name" value={form.lastname} required
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email" placeholder="Email" value={form.email} required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="Your Message..." value={form.message} required
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ width: "100%", height: "100px", padding: "8px" }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>Send Message</button>
      </form>
      
      {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}

      2. Message list (Admin only)
      {isAdmin && (
        <div style={{ marginTop: "40px", borderTop: "2px dashed #ccc", paddingTop: "20px" }}>
          <h2 style={{ color: "red" }}>Admin Area: Inbox ({contacts.length})</h2>
          {contacts.length === 0 ? <p>No messages yet.</p> : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {contacts.map((c) => (
                <li key={c._id} style={{ background: "#f9f9f9", border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{c.firstname} {c.lastname}</strong>
                    <span style={{ color: "#666", fontSize: "0.9em" }}>{c.email}</span>
                  </div>
                  <p style={{ margin: "10px 0", background: "#fff", padding: "10px", border: "1px solid #eee" }}>
                    {c.message}
                  </p>
                  <button 
                    onClick={() => handleDelete(c._id)}
                    style={{ background: "crimson", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                  >
                    Delete Message
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}




/*import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Contact() {
  const [contacts, setContacts] = useState([]); // 存储所有 contacts
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", message: "" });
  const [message, setMessage] = useState("");

  // 获取所有 contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/contacts", form);
      setMessage("Message sent successfully!");
      setForm({ firstname: "", lastname: "", email: "", message: "" });
      fetchContacts(); // 重新加载列表
    } catch (err) {
      setMessage(err.response?.data?.error || "Error sending message");
    }
  };

  // 删除 contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${id}`);
      fetchContacts(); // 更新列表
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        ></textarea><br />
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}

      <h2>All Messages</h2>
      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.firstname} {c.lastname} - {c.email} <br />
            {c.message} <br />
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}













///2
/*import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // ？？？提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/contacts", {
        firstname,
        lastname,
        email,
        message,
      });
      setResponse("Message sent successfully!");
      // ？?清空表单
      setFirstname("");
      setLastname("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setResponse(err.response?.data?.error || "Error sending message");
    }
  };

  return (
    <div>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea><br />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}*/




///1
/*export default function Contact() {
  return (
    <div>
      <h1>Contact Me</h1>
      <form>
        <input type="text" placeholder="First Name" /><br />
        <input type="text" placeholder="Last Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <textarea placeholder="Message"></textarea><br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}*/
