import React, { useContext } from "react";
import "./Main.css";
import { FaRegUser } from "react-icons/fa6";
import { FaRegCompass } from "react-icons/fa";
import { LuLightbulb } from "react-icons/lu";
import { MdEditNote } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { IoMicOutline } from "react-icons/io5";
import { PiArrowFatLinesRight } from "react-icons/pi";
import { Context } from "../../Context/context";
import { CiUser } from "react-icons/ci";
import { TbTopologyStar3 } from "react-icons/tb";
import asset from "../../assets/asset";

function Main() {

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <FaRegUser className="userIcon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="great">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can i help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming read trip.</p>
                <div className="icon">
                  <FaRegCompass size="30px" />
                </div>
              </div>
              <div className="card">
                <p>
                  Help me write a thank you note to my colleague for going above
                  and beyond
                </p>
                <div className="icon">
                  <LuLightbulb size="30px" />
                </div>
              </div>
              <div className="card">
                <p>
                  Give me some ideas to surprise my concert-loving friend on
                  their birthday.
                </p>
                <div className="icon">
                  <MdEditNote size="30px" />
                </div>
              </div>
              <div className="card">
                <p>
                  Structure a sales pitch for a hair dryer that's also a
                  microphone. Be concise.
                </p>
                <div className="icon">
                  <FaCodeBranch size="30px" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <CiUser size="30px" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={asset.gemini}  />
              {loading
              ?<div className="loader">
<hr />
<hr />
<hr />
              </div>:<p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
              
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
            />
            <div>
              <RiGalleryFill size="26px" />
              <IoMicOutline size="26px" />
              {input && <PiArrowFatLinesRight onClick={() => onSent()}  size="26px" />}
              
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy & Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
