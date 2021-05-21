import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import ques1 from "./assets/ques1.png";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { fire } from "./firebase/utils";
import WithAuth from "./hoc/WithAuth";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quizz from "./pages/Quizz";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";
import Result from "./pages/Results";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const urlLink = window.location.href;

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  };

  const handleLogOut = () => {
    fire.auth().signOut();
    localStorage.removeItem("isLogin");
  };
  // check user exists
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
      } else {
        setCurrentUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
    return () => {
      setCurrentUser(null);
    };
  }, []);

  useEffect(() => {
    const isChecking = localStorage.getItem("isLogin") || "";
    if (isChecking !== "true" && urlLink !== "http://localhost:3000/") {
      window.location.href = "http://localhost:3000/";
    }
  });

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundImage: `url(${ques1})` }}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainLayout>
              <Login />
            </MainLayout>
          </Route>
          <Route path="/registration">
            <MainLayout>
              <Registration />
            </MainLayout>
          </Route>
          <Route path="/recovery">
            <MainLayout>
              <Recovery />
            </MainLayout>
          </Route>
          <Route path="/home">
            <Home
              handleLogOut={handleLogOut}
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>
          <Route path="/quizz">
            <Quizz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </Route>
          <Route path="/result">
            <Result name={name} score={score} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
