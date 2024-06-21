import React, { useContext, useState } from "react";
import "./sideBar.css";
import { IoMenu } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa6";
import { MdOutlineHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Context } from "../../Context/context";

function SideBar() {
  const [extend, setExtend] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt,newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    await onSent(prompt);
    setRecentPrompt(prompt);
  };

  return (
    <div className="sideBar">
      <div className="top">
        <IoMenu
          className="menu"
          size="20px"
          onClick={() => setExtend(!extend)}
        />
        <div onClick={() => newChat()} className="new-chat">
          <IoMdAdd size="20px" />
          {extend && <p>New Chat</p>}
        </div>
        {extend && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div
                key={index}
                className="recent-entry"
                onClick={() => loadPrompt(item)}
              >
                <FiMessageSquare size="20px" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <FaQuestion size="20px" />
          {extend && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <MdOutlineHistory size="20px" />
          {extend && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <IoSettingsOutline size="20px" />
          {extend && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
