import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
     setLoading(false);
     setShowResult(false);

  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let currentPrompt = prompt !== undefined ? prompt : input;
    if (prompt === undefined) {
      setPrevPrompt((prev) => [...prev, input]);
    }
    setRecentPrompt(currentPrompt);

    const response = await run(currentPrompt);
    let responseArray = response.split("**");

    let newArray = responseArray.map((item, index) =>
      index === 0 || index % 2 !== 1 ? item : `<b>${item}</b>`
    );

    let responseArray2 = newArray.join(" ").split("*").join("<br>");
    let newResponseArray = responseArray2.split(" ");

    newResponseArray.forEach((word, i) => delayPara(i, word + " "));

    setLoading(false);
    setInput("");
  };
  

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
