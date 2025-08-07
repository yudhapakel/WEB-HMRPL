import React, {useState} from "react";
import axios from "../utils/axios";

const TestLogin = () => {
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("password");
    const [response, setResponse] = useState(null);

    const handleLogin = async () => {
        try {
            const res = await axios.post("/login", {
                email,
                password,
            });
            setResponse(res.data);
            alert("login berhasil, token: " + res.data.token);
        } catch (err) {
            console.error(err);
            alert("login gagal");
        }
    };

    return (
        <div style={{ padding: 20 }}>
      <h2>Test Login</h2>
      <div>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>

      {response && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
    );
};

export default TestLogin;