import { useContext, useState } from "react";
import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";
import { useAuth } from "../../context/AuthContext";

const AuthInputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  input {
    height: 3.5rem;
    padding: 0 1rem;
    width: 100%;
    max-width: 20rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 1rem;
    color: white;
    transition: all 0.3s ease;
    box-sizing: border-box;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.15);
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    input {
      max-width: 100%;
    }
  }
`;

const StyledAuthForm = styled.div`
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;
  color: white;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: white;
  }

  button {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    border-radius: 12px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 1rem;
    color: white;
    font-weight: 600;
    width: 100%;
    max-width: 20rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;

    &:hover:not(:disabled) {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.2)
      );
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
    }

    &:active:not(:disabled) {
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    h2 {
      font-size: 1.5rem;
    }

    button {
      max-width: 100%;
      font-size: 1rem;
      padding: 1rem 2rem;
    }
  }
`;

// Error fallback component
const ErrorFallback = styled.div`
  text-align: center;
  color: white;
  padding: 2rem;

  h3 {
    color: #ff6b6b;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }

  button {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

function AuthForm({ type = "login", $visible = true, onClose, onSubmit }) {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Call all hooks at the top level - no conditionals
  const auth = useAuth();
  const { signup, isSigningUp } = auth.useSignup();
  const { login, isLoggingIn } = auth.useLogin();

  const handleClick = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    try {
      if (type === "signup") {
        await signup({ email, password });
      } else {
        await login({ email, password });
      }

      // Call onSubmit if provided
      if (onSubmit) {
        onSubmit({ email, password, type });
      }
    } catch (err) {
      setError(err.message || "An error occurred during authentication");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <StyledAuthForm>
      <h2>{type === "signup" ? "Create Account" : "Welcome Back"}</h2>

      {error && (
        <div
          style={{
            color: "#ff6b6b",
            textAlign: "center",
            marginBottom: "1rem",
            padding: "0.5rem",
            background: "rgba(255, 107, 107, 0.1)",
            borderRadius: "6px",
            border: "1px solid rgba(255, 107, 107, 0.3)",
          }}
        >
          {error}
        </div>
      )}

      <AuthInputForm>
        <input
          value={email}
          onChange={(e) => {
            setMail(e.target.value);
            if (error) setError(""); // Clear error when user starts typing
          }}
          onKeyPress={handleKeyPress}
          type="email"
          placeholder="Enter your email"
          disabled={isSigningUp || isLoggingIn}
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(""); // Clear error when user starts typing
          }}
          onKeyPress={handleKeyPress}
          type="password"
          placeholder="Enter your password"
          disabled={isSigningUp || isLoggingIn}
        />
      </AuthInputForm>

      <button
        disabled={isSigningUp || isLoggingIn || !email || !password}
        onClick={handleClick}
      >
        {isSigningUp || isLoggingIn ? (
          <SpinnerMini />
        ) : type === "signup" ? (
          "Start Watching"
        ) : (
          "Continue Watching"
        )}
      </button>
    </StyledAuthForm>
  );
}

export default AuthForm;
