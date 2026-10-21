
import { useState } from "react";
import {
  loginUser,
  registerUser
} from "../services/api";

export default function AuthForm({ page }) {
  const isRegister = page === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isRegister) {
        await registerUser({
          name,
          email,
          password,
          role
        });

        setPassword("");
        setMessage("Registration successful! Please login.");
        return;
      }

      const result = await loginUser({
        email,
        password
      });

      // Local development only.
      sessionStorage.setItem("sc-token", result.token);

      const destination =
        result.user.role === "admin"
          ? "/admin"
          : result.user.role === "recruiter"
          ? "/recruiter"
          : "/dashboard";

      window.location.hash = destination;
      window.location.reload();

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="portal-card portal-form"
      onSubmit={handleSubmit}
    >
      <h2>{isRegister ? "Create Account" : "Login"}</h2>

      {isRegister && (
        <label>
          Full Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      )}

      <label>
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {isRegister && (
        <label>
          Account Type
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </label>
      )}

      <button type="submit" disabled={loading}>
        {loading
          ? "Please wait..."
          : isRegister
          ? "Create Account"
          : "Login"}
      </button>

      {message && <p role="status">{message}</p>}

      {isRegister ? (
        <a href="#/login">Already have an account? Login</a>
      ) : (
        <a href="#/register">Create an account</a>
      )}
    </form>
  );
}
