import { useState } from "react";
import styled from "styled-components";
import { MainLayout } from "./styles/Layout";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const [active, setActive] = useState(1);

  return (
    <StyledApp className="App">
      <MainLayout />
      <Navigation active={active} setActive={setActive} />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  height: 100vh;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
`;

export default App;
