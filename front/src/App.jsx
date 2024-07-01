import styled from "styled-components";
import { MainLayout } from "./styles/Layout";

function App() {
  return (
    <StyledApp className="App">
      <MainLayout />
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
