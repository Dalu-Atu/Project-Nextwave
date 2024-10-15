import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`

:root{
  --primary-color: #e0e0e0;


  --secondary-color: linear-gradient(45deg, #FF4500, #FF6347, #FFD700, #FFA500, #1E90FF, #00BFFF, #00CED1);
  --secondary-color-reverse: linear-gradient(45deg, #00CED1, #00BFFF, #1E90FF, #FFA500, #FFD700, #FF6347, #FF4500);
  --button-bg: linear-gradient(45deg, #ff4500, #ff6347, #ffd700, #1e90ff);

  --secondary-color-dark: red;
  --border-radius-sm: 5px;
  --color-bg:#141414; 
  --color-card:#333;
  --font-family: 'Roboto', Arial, sans-serif;
  --font-size-base: 16px;
  --font-size-large: 1.25rem;
  --font-size-small: 0.875rem;
     --primary-font-serif: 'Playfair Display', serif;
    --primary-font-sans-serif: 'Montserrat', sans-serif;
    --script-font: 'Great Vibes', cursive;
    --minimal-font: 'Poppins', sans-serif;
    --elegant-font: 'Raleway', sans-serif;
    --cinzel-font: 'Cinzel', serif;
}

/* Apply global font and reset default styles */
* {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
    font-family: var(--font-family);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    
}

/* Hide scrollbar for all elements */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

*::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

/* Default font sizes */
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

body{
  background-color: black;
  color: var(--primary-color);

  overflow-x: hidden;
   padding-top: env(safe-area-inset-top);
   
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  margin-bottom: 1rem;
}

p {
  font-size: var(--font-size-base);
  margin-bottom: 1.5rem;
}

a {
  text-decoration: none;
  color: var(--primary-color);
}

button{
    cursor: pointer;
    font-family: var(--font-family);
}

input, textarea {
    font-family: var(--font-family);
}

/* Active class styling */
.active {
    color: black;
    background-color: #e0e0e0;
    transition: all 0.5s ease;
    border-radius: 20px;
}
`;

export default GlobalStyles;
