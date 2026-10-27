import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          setError(result.message || "Login failed. Please try again.");
          return;
        }

        onLogin(result);
      })
      .catch(() => {
        setError("Could not reach the server. Check that the Flask app is running.");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login With Username</h3>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError("");
        }}
      />
      <button type="submit">Login</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

export default Login;
