import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import background from "/bg-6.png";
import Logo from "../ui/Logo";
import AuthForm from "../ui/AuthForm";

// Smooth slide-in animation for auth form
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  background-color: black;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const HeroSectionWrapper = styled.div`
  background: url(${background});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const MainHeroSection = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0.5rem;
  text-align: center;
  overflow: hidden;

  .logo-text {
    background: var(--secondary-color);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const HeroContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  transition: all 0.4s ease;

  ${(props) =>
    props.$showingAuth &&
    `
    transform: scale(0.95);
    opacity: 0.8;
  `}
`;

const MainHeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitleText = styled.p`
  font-size: 1.5rem;
  margin: 2rem 0;
  transition: all 0.3s ease;

  @media (max-width: 518px) {
    font-size: large;
    padding: 0 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;

  @media (max-width: 518px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButtonStyled = styled.button`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 3rem;
  border-radius: 15px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-weight: 700;
  min-width: 160px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-3px);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.2)
    );
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(CTAButtonStyled)`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: white;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-3px);
  }
`;

const NavigationContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AuthNavButton = styled.button`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    );
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const AuthFormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(5px);
  animation: ${slideIn} 0.3s ease;
`;

const AuthFormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  position: relative;
  animation: ${slideIn} 0.4s ease;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  color: white;

  /* Ensure all text inside is white */
  * {
    color: white !important;
  }

  /* Style form inputs */
  input,
  textarea,
  select {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    border-radius: 8px !important;
    padding: 0.75rem !important;

    &::placeholder {
      color: rgba(255, 255, 255, 0.7) !important;
    }

    &:focus {
      border-color: rgba(255, 255, 255, 0.6) !important;
      outline: none !important;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
    }
  }

  /* Style form buttons */
  button[type="submit"] {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    ) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    border-radius: 10px !important;
    padding: 0.75rem 1.5rem !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
    cursor: pointer !important;

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.2)
      ) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const AuthToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.8);

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    text-decoration: underline;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      color: rgba(255, 255, 255, 0.7);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }
`;

// Error Boundary Component
class AuthFormErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("AuthForm Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "white" }}>
          <h3>Something went wrong with the authentication form.</h3>
          <p>Please try refreshing the page or contact support.</p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              this.props.onClose && this.props.onClose();
            }}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Close
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Homepage = () => {
  const [formType, setFormType] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFormTypeChange = (type) => {
    if (formType && type !== formType) {
      setIsAnimating(true);
      setTimeout(() => {
        setFormType(type);
        setIsAnimating(false);
      }, 200);
    } else {
      setFormType(type);
      setIsAnimating(false);
    }
  };

  const closeAuthForm = () => {
    setFormType("");
  };

  const toggleAuthType = () => {
    const newType = formType === "login" ? "signup" : "login";
    handleFormTypeChange(newType);
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    // For now, just close the form
    closeAuthForm();
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && formType) {
        closeAuthForm();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [formType]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (formType) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [formType]);

  return (
    <PageContainer>
      <HeroSectionWrapper>
        <NavigationContainer>
          <Logo />
          <AuthNavButton onClick={() => handleFormTypeChange("login")}>
            Sign In
          </AuthNavButton>
        </NavigationContainer>

        <MainHeroSection>
          <HeroContentWrapper $showingAuth={!!formType}>
            <MainHeroTitle>
              Download Your Favorites with
              <span className="logo-text"> NextWave</span>
            </MainHeroTitle>
            <HeroSubtitleText>
              Discover the next waves of unlimited movies and series. Start
              watching today!
            </HeroSubtitleText>

            <ButtonGroup>
              <CTAButtonStyled onClick={() => handleFormTypeChange("signup")}>
                Get Started Free
              </CTAButtonStyled>
              <SecondaryButton onClick={() => handleFormTypeChange("login")}>
                Sign In
              </SecondaryButton>
            </ButtonGroup>
          </HeroContentWrapper>
        </MainHeroSection>
      </HeroSectionWrapper>

      {formType && (
        <AuthFormOverlay onClick={closeAuthForm}>
          <AuthFormContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeAuthForm} title="Close">
              ×
            </CloseButton>

            {!isAnimating && (
              <AuthFormErrorBoundary onClose={closeAuthForm}>
                <AuthForm
                  type={formType}
                  $visible={true}
                  onClose={closeAuthForm}
                  onSubmit={handleFormSubmit}
                />
              </AuthFormErrorBoundary>
            )}

            <AuthToggleText>
              {formType === "login" ? (
                <>
                  Dont have an account?{" "}
                  <button onClick={toggleAuthType}>Sign up here</button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={toggleAuthType}>Sign in here</button>
                </>
              )}
            </AuthToggleText>
          </AuthFormContainer>
        </AuthFormOverlay>
      )}
    </PageContainer>
  );
};

export default Homepage;
