import { useState, createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
const MyContext = createContext();

const MyProvider = (props) => {
  const [stage, setStage] = useState(1);
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState("");

  const addPlayerHandler = (name) => {
    setPlayers((prevState) => [...prevState, name]);
  };

  const removePlayerHandler = (idx) => {
    let newArray = [...players];
    newArray.splice(idx);
    setPlayers(newArray);
  };

  const nextHandler = () => {
    if (players.length < 2) {
      toast.error("You need more than 1 player", {
        position: "top-left",
        autoClose: 2000,
      });
    } else {
      setStage(2);
      setTimeout(() => {
        generateLooser();
      }, 2000);
      console.log(stage);
    }
  };

  const resetGameHandler = () => {
    setStage(1);
    setPlayers([]);
    setResult("");
  };

  const generateNewLooserHandler = () => {
    setResult("");
    generateLooser();
  };

  const generateLooser = () => {
    let result = players[Math.floor(Math.random() * players.length)];
    setResult(result);
  };

  return (
    <>
      <MyContext.Provider
        value={{
          //STATE
          stage: stage,
          players: players,
          result: result,
          //METHODS
          addPlayer: addPlayerHandler,
          removePlayer: removePlayerHandler,
          next: nextHandler,
          resetGame: resetGameHandler,
          generateNewLooser: generateNewLooserHandler,
        }}
      >
        {props.children}
      </MyContext.Provider>
      <ToastContainer />
    </>
  );
};

export { MyContext, MyProvider };
