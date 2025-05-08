import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "../index.css";

const BlurMessage = () => {
  let pressTimer;
  const [focusedMessageId, setFocusedMessageId] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages] = useState([
    { id: 1, text: "Hello there!" },
    { id: 2, text: "How are you?" },
    { id: 3, text: "This is a test message" },
  ]);
  const [lastTapTime, setLastTapTime] = useState(0);

  function handleTap(messageId) {
    const currentTime = new Date().getTime();
    const tapInterval = currentTime - lastTapTime;

    if (tapInterval < 300) {
      // Double tap detected
      handleReaction(messageId, { apple: "👍" });
    }

    setLastTapTime(currentTime);
  }

  function startLongPressTimer(id) {
    pressTimer = setTimeout(() => {
      setFocusedMessageId(id);
      setShowEmojiPicker(true);
    }, 500);
  }

  function cancelLongPress() {
    clearTimeout(pressTimer);
  }

  function handleReaction(messageId, emoji) {
    console.log(`Added ${emoji.native} to message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
  }

  function handleReply(messageId) {
    // Handle reply here
    console.log(`Replying to message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
  }

  return (
    <div>
      <div className={`chat-container ${focusedMessageId ? "blurred" : ""}`}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              focusedMessageId === msg.id ? "focused" : ""
            }`}
            onPointerDown={() => startLongPressTimer(msg.id)}
            onPointerUp={cancelLongPress}
            onClick={() => handleTap(msg.id)}
          >
            {msg.text}
            {focusedMessageId === msg.id && (
              <div className="reaction-menu">
                {showEmojiPicker && (
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji) => handleReaction(msg.id, emoji)}
                    theme="light"
                    previewPosition="none"
                    skinTonePosition="none"
                  />
                )}
                <button onClick={() => handleReply(msg.id)}></button>
              </div>
            )}
          </div>
        ))}
      </div>

      {focusedMessageId && (
        <div
          className="backdrop"
          onClick={() => {
            setFocusedMessageId(null);
            setShowEmojiPicker(false);
          }}
        />
      )}
    </div>
  );
};

export default BlurMessage;
