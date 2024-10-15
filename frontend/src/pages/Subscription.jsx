import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import PaymentModal from "./PaymentPage"; // Assuming PaymentModal is in the same directory
import { useFreeSubscription } from "../../services/payment";
import SpinnerMini from "../ui/SpinnerMini";
import { useAuth } from "../../context/AuthContext";
import NavContainer from "../ui/NavContainer";

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SubscriptionContainer = styled.div`
  max-width: 1200px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  animation: ${slideInFromLeft} 0.5s ease-out forwards;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: white;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const PlansSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlanCard = styled.div`
  border-radius: 15px;
  padding: 2rem;
  width: 40%;
  text-align: center;
  background: linear-gradient(145deg, #212121, #3f3b3b);
  margin: 0 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--secondary-color-dark);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 1.5rem;

  li {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
`;

const CTAButton = styled.button`
  background: var(--button-bg);
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.25rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background 0.3s ease, transform 0.3s ease;
  color: white;

  &:hover {
    background: var(--secondary-color-dark);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SubscribedSticker = styled.div`
  min-width: 7rem;
  border-radius: var(--border-radius-sm);
  padding: 0.7rem;
  background: rgba(0, 0, 0, 0.2);
  color: var(--secondary-color-light);
  font-size: large;
  transform: rotate(40deg);
  position: absolute;
  top: 1rem;
  left: -0.3rem;
`;

function Subscription() {
  const [isModalOpen, setModalOpen] = useState();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { activateFreePlan, isactivatingFreePlan } = useFreeSubscription();
  const { user } = useAuth();
  const selectedPlanByUser = user?.subscriptionDetails?.plan;

  const handleSubscriptionClick = (plan) => {
    if (plan === "free") return activateFreePlan();
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <>
      {selectedPlanByUser && <NavContainer />}
      <SubscriptionContainer>
        <HeroSection>
          <h1>Subscribe Now</h1>
          <p>Unlock unlimited movies and series with our premium plans</p>
          <CTAButton onClick={() => handleSubscriptionClick("free")}>
            Start Free Plan
          </CTAButton>
        </HeroSection>
        <PlansSection>
          <PlanCard>
            {selectedPlanByUser === "free" && (
              <SubscribedSticker>Subscribed</SubscribedSticker>
            )}
            <h2>Free</h2>
            <p>$0/month</p>
            <FeatureList>
              <li>SD quality</li>
              <li>Watch on 1 screen</li>
              <li>Access to limited content</li>
            </FeatureList>
            <CTAButton onClick={() => handleSubscriptionClick("free")}>
              {isactivatingFreePlan ? (
                <div style={{ color: "#fff" }}>
                  <SpinnerMini />
                </div>
              ) : (
                "Choose Free"
              )}
            </CTAButton>
          </PlanCard>

          <PlanCard>
            {selectedPlanByUser === "premium" && (
              <SubscribedSticker>Subscribed</SubscribedSticker>
            )}
            <h2>Premium</h2>
            <p>$1.99/month</p>
            <FeatureList>
              <li>HD quality</li>
              <li>Watch on 4 screens</li>
              <li>Access to all content</li>
              <li>Exclusive releases</li>
              <li>Get Notified on upcomings</li>
              <li>Request a Movie</li>
            </FeatureList>
            <CTAButton onClick={() => handleSubscriptionClick("premium")}>
              Choose Premium
            </CTAButton>
          </PlanCard>
        </PlansSection>
        {isModalOpen && (
          <PaymentModal plan={selectedPlan} onClose={closeModal} />
        )}
      </SubscriptionContainer>
    </>
  );
}

export default Subscription;
