import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    order_id: "",
    message: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        setResult("Complaint submitted successfully!");
        setForm({
          name: "",
          email: "",
          order_id: "",
          message: ""
        });
      } else {
        setResult(data.detail || "Something went wrong.");
      }
    } catch (error) {
      setResult("Cannot connect to backend.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>AI Customer Support</h1>
        <p>Submit your complaint and our AI will process it automatically.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="order_id"
            placeholder="Order ID"
            value={form.order_id}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Describe your complaint"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>

        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
}

export default App;