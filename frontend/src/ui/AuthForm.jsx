import { useContext, useState } from "react";
import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";
import { useAuth } from "../../context/AuthContext";

const AuthInputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;

  input {
    height: 3.5rem;
    padding-left: 1rem;
    width: 100%;
    max-width: 20rem;
    margin: 0.5rem;
    border-radius: var(--border-radius-sm);
    background: transparent;
    box-shadow: 1px 1px 2px gray;
    border: 1px solid gray;
    font-size: 1rem;
    color: var(--color-primary);
  }

  input:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    input {
      margin: 1rem;
      font-size: 1.25rem;
      height: 3.5rem;
    }
  }
`;

const StyledAuthForm = styled.div`
  opacity: ${(props) => (props.$visible === "false" ? 1 : 0)};
  transform: ${(props) =>
    props.$visible === "true" ? "translateY(0)" : "translateY(-20px)"};
  transition: opacity 0.5s ease, transform 0.5s ease;

  button {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    border-radius: var(--border-radius-sm);
    background: #00aa6c;
    font-size: 1rem;
    color: #fff;
    border-style: none;
    width: 100%;
    max-width: 20rem;
  }

  @media (min-width: 768px) {
    button {
      font-size: 1.25rem;
      padding: 1rem 4rem;
      margin-top: 3rem;
    }
  }
`;

function AuthForm({ type, $visible }) {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { useSignup, useLogin } = useAuth();
  const { signup, isSigningUp } = useSignup();
  const { login, isLoggingIn } = useLogin();

  const handleClick = () => {
    if (type === "signup") {
      signup({ email, password });
    } else {
      login({ email, password });
    }
  };

  return (
    <StyledAuthForm $visible={$visible.toString()}>
      <AuthInputForm>
        <input
          value={email}
          onChange={(e) => setMail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </AuthInputForm>
      <button disabled={isSigningUp || isLoggingIn} onClick={handleClick}>
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
