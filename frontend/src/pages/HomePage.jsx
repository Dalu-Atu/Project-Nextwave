import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import background from "../assets/background.jfif";
import Logo from "../ui/Logo";
import Subscription from "./Subscription";
import Footer from "../ui/Footer";
import premium from "../assets/premium.jfif";
import movies from "../assets/movies.jfif";
import series from "../assets/series.jfif";
import animation from "../assets/amimation.png";
import kids from "../assets/kids.png";
import AuthForm from "../ui/AuthForm";
import alice from "../assets/posters/alice.jpg";
import arcane from "../assets/posters/arcane.jpg";
import darkside from "../assets/posters/darkside.jfif";
import dune from "../assets/posters/dune.webp";
import fast from "../assets/posters/fast.jpg";
import heist from "../assets/posters/heist.jpg";
import mulan from "../assets/posters/mulan.jfif";
import nezha from "../assets/posters/nezha.jfif";
import salt from "../assets/posters/salt.jpg";
import sonic from "../assets/posters/sonic.webp";
import killer from "../assets/posters/killer.jpg";
import trigger from "../assets/posters/Trigger.jpg";
import squid from "../assets/posters/squid.jpg";
import terrifier from "../assets/posters/terrifier.webp";
import toronto from "../assets/posters/toronto.jpg";
import wednesday from "../assets/posters/wednesday.webp";

const PageContainer = styled.div`
  background-color: black;
  width: 100%;
  max-width: 1500px; /* Adjust this value as needed */
  margin: 0 auto; /* Center the content */
  /* padding: 0 20px; Add padding for smaller screens */
  box-sizing: border-box;
`;

const HeroSectionWrapper = styled.div`
  background: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  position: relative;
  text-align: center;

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
  padding: 9rem 0.5rem;
  text-align: center;
  overflow: hidden;

  .logo-text {
    background: var(--secondary-color);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
  @media (max-width: 768px) {
    padding: 5rem 0.5rem;
  }
`;

const HeroContentWrapper = styled.div``;

const MainHeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitleText = styled.p`
  font-size: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 518px) {
    font-size: large;
    padding: 0 1rem;
  }
`;

const CTAButtonStyled = styled.button`
  background: var(--button-bg);
  border: none;
  padding: 1rem 4rem;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  color: var(--primary-color);
  margin-top: 4rem;
  font-weight: 700;
`;

const NavigationContainer = styled.div`
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .login-button {
    cursor: pointer;
    position: relative;
    top: 0.8rem;
  }
  .login-button:hover {
    color: var(--secondary-color-dark);
    transition: all 0.3s ease;
  }
`;

const MainContentSection = styled.div`
  width: inherit;
  height: max-content;
  padding-top: 3rem;
`;

const DescriptionSection = styled.div`
  text-align: center;
  line-height: 3rem;
  h1 {
    font-size: 30px;
  }
  p {
    font-size: large;
    padding: 0rem 4rem;
    @media (max-width: 768px) {
      padding: 0rem 1rem;
    }
  }
`;

const HighlightLabel = styled.p`
  background: var(--secondary-color);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  font-size: large;
  font-weight: 1000;
`;

const OffersGrid = styled.div`
  display: grid;
  grid-column-gap: 10px;
  -webkit-column-gap: 0px;
  -moz-column-gap: 10px;
  column-gap: 20px;
  grid-row-gap: 10px;
  row-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  padding: 1rem 1rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    padding: 1rem 0.5rem;
  }
`;

const OfferCard = styled.div`
  position: relative;
  border-radius: var(--border-radius-sm);
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
    border: 1px solid gray;
    overflow: hidden;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const OfferImageStyled = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const OfflineContentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 4rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: linear-gradient(45deg, #00ced1, #00bfff, #1e90ff, #ffa500);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .image-container,
  .text-container {
    margin: 0rem 2rem;
  }
  .text-container {
    height: max-content;
    z-index: 5;
  }
  @media (max-width: 1226px) {
    padding: 0 1rem;
  }
  @media (max-width: 1130px) {
    padding: 0 0rem;

    .text-container {
      width: 100vw;
      padding: 0rem 0rem;
      position: relative;
      top: -4rem;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media (max-width: 1000px) {
    display: block;
    padding-bottom: 3rem;
    .text-container {
      position: relative;
      top: 3rem;
    }
  }
`;

const slideUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
`;

const slideDown = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`;

const CarouselContainer = styled.div`
  display: grid;
  justify-content: space-around;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
  overflow: hidden;
  min-width: fit-content;
  height: 450px; /* Adjust height based on movie card height */
  position: relative;
  @media (max-width: 1000px) {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    column-gap: 0.3rem;
    padding: 0 0rem;
    position: relative;
    top: 3rem;
  }
`;

const CarouselColumn = styled.div`
  width: fit-content;
  animation: ${(props) => (props.direction === "up" ? slideUp : slideDown)} 40s
    linear infinite;
  & > * {
    margin-bottom: 10px;
  }
`;

const MovieImage = styled.div`
  width: 200px; /* Adjust width */
  height: 250px; /* Adjust height to match 2:3 aspect ratio */
  border-radius: 8px;
  background-color: var(--color-card);
  background-size: cover;
  background-position: center;
  margin: 10px 0;
  @media (max-width: 768px) {
    width: 170px;
  }
  @media (max-width: 540px) {
    width: 130px;
    height: 180px;
  }
  @media (max-width: 420px) {
    width: 110px;
    height: 150px;
  }
`;
const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 4rem;
  background-color: var(--bg-color);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
`;

const FeatureCard = styled.div`
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(94, 93, 93, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: var(--text-color);
`;

// posters array
const movieImages = [
  alice,
  arcane,
  darkside,
  dune,
  fast,
  heist,
  mulan,
  nezha,
  salt,
  sonic,
  killer,
  trigger,
  squid,
  terrifier,
  toronto,
  wednesday,
];

const LandingPage = () => (
  <FeaturesSection>
    <FeatureCard>
      <FeatureTitle>Exclusive Originals</FeatureTitle>
      <FeatureText>
        Discover original shows and movies that you cant find anywhere else. Be
        the first to watch exclusive content.
      </FeatureText>
    </FeatureCard>

    <FeatureCard>
      <FeatureTitle>Watch Together</FeatureTitle>
      <FeatureText>
        Share the experience! Host watch parties and enjoy your favorite shows
        with friends and family from afar.
      </FeatureText>
    </FeatureCard>

    <FeatureCard>
      <FeatureTitle>Personalized Recommendations</FeatureTitle>
      <FeatureText>
        Get tailored recommendations based on your viewing habits. Discover new
        favorites effortlessly.
      </FeatureText>
    </FeatureCard>

    <FeatureCard>
      <FeatureTitle>No Commitments</FeatureTitle>
      <FeatureText>
        Enjoy flexibility with no contracts. Cancel anytime without worrying
        about hidden fees or penalties.
      </FeatureText>
    </FeatureCard>
  </FeaturesSection>
);

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const Carousel = () => {
  // Shuffle the movie images for each column separately
  const shuffledMovies1 = shuffleArray(movieImages);
  const shuffledMovies2 = shuffleArray(movieImages);
  const shuffledMovies3 = shuffleArray(movieImages);

  const renderMovies = (shuffledMovies) => {
    return shuffledMovies.map((image, index) => (
      <MovieImage key={index} style={{ backgroundImage: `url(${image})` }} />
    ));
  };

  return (
    <CarouselContainer>
      {/* First Column: Sliding Up */}
      <CarouselColumn direction="up">
        {renderMovies(shuffledMovies1)}
        {renderMovies(shuffledMovies1)}
        {renderMovies(shuffledMovies1)}
      </CarouselColumn>

      {/* Second Column: Sliding Down */}
      <CarouselColumn direction="down">
        {renderMovies(shuffledMovies2)}
        {renderMovies(shuffledMovies2)}
        {renderMovies(shuffledMovies2)}
      </CarouselColumn>

      {/* Third Column: Sliding Up */}
      <CarouselColumn direction="up">
        {renderMovies(shuffledMovies3)}
        {renderMovies(shuffledMovies3)}
        {renderMovies(shuffledMovies3)}{" "}
        {/* Duplicate content for seamless scrolling */}
      </CarouselColumn>
    </CarouselContainer>
  );
};
const Homepage = () => {
  const [formType, setFormType] = useState("");

  useEffect(() => {
    if (formType) {
      setTimeout(() => setFormType(formType), 100);
    }
  }, [formType]);

  return (
    <PageContainer>
      <HeroSectionWrapper>
        <NavigationContainer>
          <Logo />
          <p className="login-button" onClick={() => setFormType("login")}>
            LOGIN
          </p>
        </NavigationContainer>
        <MainHeroSection>
          <HeroContentWrapper>
            <MainHeroTitle>
              Download Your Favorites with
              <span className="logo-text"> NextWave</span>
            </MainHeroTitle>
            <HeroSubtitleText>
              Discover the next waves of unlimited movies and series. Start
              watching today!
            </HeroSubtitleText>
            {!formType ? (
              <CTAButtonStyled onClick={() => setFormType("signup")}>
                Get Started
              </CTAButtonStyled>
            ) : (
              <AuthForm type={formType} $visible={!formType} />
            )}
          </HeroContentWrapper>
        </MainHeroSection>
      </HeroSectionWrapper>

      <MainContentSection>
        <DescriptionSection>
          <HighlightLabel>INCLUDED IN ALL PLANS</HighlightLabel>
          <h1>All That You Love</h1>
          <p>
            Download full seasons of exclusive streaming series, current-season
            episodes, hit movies, Originals, kids shows, and many more...
          </p>
        </DescriptionSection>
        <OffersGrid>
          <OfferCard>
            <OfferImageStyled src={animation} />
          </OfferCard>
          <OfferCard>
            <OfferImageStyled src={movies} />
          </OfferCard>
          <OfferCard>
            <OfferImageStyled src={series} />
          </OfferCard>
          <OfferCard>
            <OfferImageStyled src={premium} />
          </OfferCard>
        </OffersGrid>
      </MainContentSection>

      <OfflineContentWrapper>
        <div className="text-container">
          <HighlightLabel>NO INTERNET? NO PROBLEM</HighlightLabel>
          <DescriptionSection>
            <h1>Download your shows to watch offline</h1>
            <p>
              Save your favorites easily and always have something to watch,
              Enjoy unlimited access to movies and series on all your devices.
              Download on your phone, tablet, or smart TV
            </p>
          </DescriptionSection>
        </div>
        <Carousel />
      </OfflineContentWrapper>

      <OfflineContentWrapper>
        <div className="text-container">
          <HighlightLabel>PARENTAL CONTROL</HighlightLabel>
          <DescriptionSection>
            <h1>Keep your kids safe with age-appropriate content</h1>
            <p>
              Let your kids embark on adventures with their favorite characters
              in a space designed just for them
            </p>
          </DescriptionSection>
        </div>
        <div className="image-container">
          <OfferImageStyled src={kids} />
        </div>
      </OfflineContentWrapper>
      <LandingPage />
      <Subscription />
      <Footer />
    </PageContainer>
  );
};

export default Homepage;
