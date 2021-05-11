import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ques1 from "./assets/ques1.png";
import Header from "./components/Header";
function App() {
  const style = {
    backgroundImage: `url:${ques1}`,
  };
  console.log(style);
  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: `url(${ques1})` }}>
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
