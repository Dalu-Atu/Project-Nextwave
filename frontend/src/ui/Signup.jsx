// App.js
import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--color-bg);
  font-family: Arial, sans-serif;
  color: var(--primary-color);
`;

const CheckIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  text-align: left;
`;

const Benefit = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const BenefitIcon = styled(FaCheckCircle)`
  margin-right: 0.8rem;
  font-size: 1.2rem;
  color: #28d5a7;
`;

const BenefitText = styled.p`
  margin: 0;
`;

const NextButton = styled.button`
  background: var(--secondary-color);
  color: #fff;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 4rem;
  font-size: 1rem;
  cursor: pointer;
`;

const Signup = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <CheckIcon />

      <Title>Choose your plan.</Title>
      <BenefitsList>
        <Benefit>
          <BenefitIcon />
          <BenefitText>No commitments, cancel anytime.</BenefitText>
        </Benefit>
        <Benefit>
          <BenefitIcon />
          <BenefitText>Next Waves of Movies for one low price.</BenefitText>
        </Benefit>
        <Benefit>
          <BenefitIcon />
          <BenefitText>No ads and no extra fees. Ever.</BenefitText>
        </Benefit>
        <Benefit>
          <BenefitIcon />
          <BenefitText>Real time notifications on favorites.</BenefitText>
        </Benefit>
        <Benefit>
          <BenefitIcon />
          <BenefitText>Download to watch offline.</BenefitText>
        </Benefit>
      </BenefitsList>
      <NextButton onClick={() => navigate('/subscription')}>Next</NextButton>
    </Container>
  );
};

export default Signup;
