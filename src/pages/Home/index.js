import { Button, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import Categories from "../../Data/Categories";
import quiz from "./../../assets/quiz.svg";
import "./style.css";
const Home = ({ name, setName, fetchQuestions, handleLogOut }) => {
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quizz");
    }
  };
  const logOut = () => {
    handleLogOut();
    history.push("/");
  };
  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quizz Setting</span>
        <div className="settings__select">
          {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
          <TextField
            label="Enter your Name"
            variant="outlined"
            style={{ marginBottom: 25 }}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat) => {
              return (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            select
            label="Select Difficulty"
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start Quizz
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={logOut}
          >
            Logout
          </Button>
        </div>
      </div>
      <img src={quiz} className="banner" alt="quiz" />
    </div>
  );
};

export default Home;
