import styled from "styled-components";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IoPersonCircleOutline,
  IoHomeOutline,
  IoFilmOutline,
  IoTvOutline,
  IoHeartOutline,
  IoCalendarOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const StyledNavContainer = styled.div`
  padding: 0.25rem 1rem; /* Default padding for non-safe area devices */
  display: flex;
  justify-content: space-between;
  background-color: rgba(18, 18, 18, 0.6); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Glassmorphism effect */
  -webkit-backdrop-filter: blur(10px); /* Safari compatibility */
  z-index: 99999;
  position: fixed;
  top: 0;
  width: 100vw;
  height: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Apply safe area padding only on devices with a notch */
  @supports (padding: env(safe-area-inset-top)) {
    padding-top: calc(
      env(safe-area-inset-top) + -0.5rem
    ); /* Add safe area for iPhones */
  }

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

  z-index: 1000; /* Set a higher z-index */
  position: relative;
  @media (max-width: 874px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.8rem 0;
    background-color: rgba(18, 18, 18, 0.9);
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.9);
    background-color: rgba(18, 18, 18, 0.6); /* Semi-transparent background */
    backdrop-filter: blur(10px); /* Glassmorphism effect */
    -webkit-backdrop-filter: blur(10px); /* Safari compatibility */
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 2rem;
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
  const navigate = useNavigate();
  const navList = [
    { label: "For you", dest: "/dashboard", icon: <IoHomeOutline /> },
    { label: "Movies", dest: "/movies", icon: <IoFilmOutline /> },
    { label: "Series", dest: "/series", icon: <IoTvOutline /> },
    { label: "WatchList", dest: "/watchList", icon: <IoHeartOutline /> },
    { label: "Upcomings", dest: "/upcomings", icon: <IoCalendarOutline /> },
    { label: "Subscription", dest: "/subscription", icon: <IoWalletOutline /> },
  ];

  const location = useLocation();
  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <>
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
          <div className="search-container" onClick={handleSearchClick}>
            <IoIosSearch className="operations-icon" size={"29px"} />
          </div>
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
    </>
  );
}

export default NavContainer;
