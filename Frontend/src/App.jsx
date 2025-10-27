import Board from "./components/Board";
import PropertiesBox from "./components/PropertiesBox";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import PropertiesBoxProvider from "./store/PropertiesBoxProvider";
function App() {
  console.log("App rendered");
  return (
    <>
      <PropertiesBoxProvider>
        <BoardProvider>
          <Toolbox />
          <Board />
          <PropertiesBox />
        </BoardProvider>
      </PropertiesBoxProvider>
    </>
  );
}

export default App;
