import { Route, Routes } from "react-router-dom";
import './App.css';
import Intro from "./main/intro/Intro";
import Login from "./main/login/Login";
import Game from "./main/game/Game";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Intro}></Route>
        <Route path="/signIn" Component={Login}></Route>
        <Route path="/game" Component={Game}></Route>
      </Routes>
    </div>
  );
}

export default App;
