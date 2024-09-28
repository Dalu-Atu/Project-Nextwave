import styled from "styled-components";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import {
  IoPersonCircleOutline,
  IoHomeOutline,
  IoFilmOutline,
  IoTvOutline,
  IoHeartOutline,
  IoCalendarOutline,
  IoWalletOutline,
} from "react-icons/io5";
import Search from "./Search";

const StyledNavContainer = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: rgba(18, 18, 18, 0.8); */
  backdrop-filter: blur(10px);
  z-index: 99999; /* Higher z-index */
  position: fixed;
  top: 0;
  width: 100vw;

  .navigations,
  .operations {
    display: flex;
    color: #e0e0e0;
    z-index: 1;
  }

  .operations {
    display: flex;
    align-items: center;

    .search-container {
      display: flex;
      align-items: center;
      position: relative;
      top: -0.05rem;

      input {
        border-radius: 5px;
        background-color: rgba(224, 224, 224, 0.2);
        border: none;
        height: 1.3rem;
        padding-left: 0.3rem;
        color: #e0e0e0;
        transition: all 0.5s ease;
        width: 0;
        visibility: hidden;
      }

      &:hover input {
        visibility: visible;
        width: 160px;
        margin-right: 10px;

        @media (max-width: 400px) {
          width: 120px;
        }
      }

      .operations-icon {
        margin: 0 0.5rem;
        padding: 0.2rem;
        border-radius: 50%;
        color: #e0e0e0;
        background-color: rgba(224, 224, 224, 0.3);
        cursor: pointer;
      }
    }
  }

  @media (max-width: 874px) {
    .navigations {
      display: none;
    }

    .operations {
      margin-left: auto;
    }
  }
`;

const BottomNavContainer = styled.div`
  display: none;
  z-index: 100; /* Set a higher z-index */
  @media (max-width: 874px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.8rem 0;
    background-color: rgba(18, 18, 18, 0.8);
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(15px);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const BottomNavItem = styled(Link)`
  padding: 0;
  color: #e0e0e0;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;

  svg {
    font-size: 22px;
  }

  &.active {
    background-color: transparent;
    color: var(--secondary-color-dark);
    background-color: none;
    font-weight: 700;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 874px) {
    display: none;
  }
`;

const NavItem = styled(Link)`
  color: #e0e0e0;
  text-decoration: none;
  padding: 5px 1rem;

  &:hover {
    transform: scale(1.2);
    transition: all 0.5s ease;
    border-radius: 20px;
  }

  &.active {
    color: black;
    background-color: #e0e0e0;
    transition: all 0.5s ease;
    border-radius: 20px;
  }
`;

function NavContainer() {
  const navList = [
    { label: "For you", dest: "/dashboard", icon: <IoHomeOutline /> },
    { label: "Movies", dest: "/movies", icon: <IoFilmOutline /> },
    { label: "Series", dest: "/series", icon: <IoTvOutline /> },
    { label: "WatchList", dest: "/watchList", icon: <IoHeartOutline /> },
    { label: "Upcomings", dest: "/upcomings", icon: <IoCalendarOutline /> },
    { label: "Subscription", dest: "/subscription", icon: <IoWalletOutline /> },
  ];

  const location = useLocation();

  return (
    <>
      {/* Top Navigation (Logo + Search + Profile icons) */}
      <StyledNavContainer>
        <Logo>NextWave</Logo>

        <NavLinksContainer>
          {navList.map((item, i) => (
            <NavItem
              to={item.dest}
              key={i}
              className={location.pathname === item.dest ? "active" : ""}
            >
              {item.label}
            </NavItem>
          ))}
        </NavLinksContainer>

        <div className="operations">
          <div className="search-container">
            <Search placeholder="Search..." />
          </div>
          <Link to="/profile" style={{ color: "var(--primary-color)" }}>
            <IoPersonCircleOutline className="operations-icon" size={29} />
          </Link>
        </div>
      </StyledNavContainer>

      {/* Bottom Navigation for Mobile */}
      <BottomNavContainer>
        {navList.map((item, i) => (
          <BottomNavItem
            to={item.dest}
            key={i}
            className={location.pathname === item.dest ? "active" : ""}
          >
            {item.icon}
            <span>{item.label}</span>
          </BottomNavItem>
        ))}
      </BottomNavContainer>

      {/* Desktop Navigation */}
    </>
  );
}

export default NavContainer;
