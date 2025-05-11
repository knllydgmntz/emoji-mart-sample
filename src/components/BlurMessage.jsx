import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "../index.css";

const BlurMessage = () => {
  let pressTimer;
  const [focusedMessageId, setFocusedMessageId] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [messages] = useState([
    { id: 1, text: "Hello there!" },
    { id: 2, text: "How are you?" },
    { id: 3, text: "This is a test message" },
  ]);
  const [lastTapTime, setLastTapTime] = useState(0);

  const quickEmojis = [
    { id: "heart", native: "❤️" },
    { id: "thumbsup", native: "👍" },
    { id: "hearteyes", native: "😍" },
    { id: "approve", native: "👌" },
    { id: "handshake", native: "🤝" },
    { id: "rolling_on_the_floor_laughing", native: "🤣" },
    { id: "face blowing kiss", native: "😘" },
  ];

  function handleTap(messageId) {
    const currentTime = new Date().getTime();
    const tapInterval = currentTime - lastTapTime;

    if (tapInterval < 300) {
      // Double tap detected
      handleReaction(messageId, { native: "👍" });
    }

    setLastTapTime(currentTime);
  }

  function startLongPressTimer(id) {
    pressTimer = setTimeout(() => {
      setFocusedMessageId(id);
      setShowActionModal(true);
    }, 500);
  }

  function cancelLongPress() {
    clearTimeout(pressTimer);
  }

  function handleReaction(messageId, emoji) {
    console.log(`Added ${emoji.native} to message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
    setShowActionModal(false);
  }

  function handleReply(messageId) {
    console.log(`Replying to message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
    setShowActionModal(false);
  }

  function handleCopy(messageId) {
    console.log(`Copying to message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
    setShowActionModal(false);
  }

  function handlePin(messageId) {
    console.log(`Pinned a message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
    setShowActionModal(false);
  }

  function handleForward(messageId) {
    console.log(`Forwarding a message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
    setShowActionModal(false);
  }

  function handleDelete(messageId) {
    console.log(`Deleting message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
    setShowActionModal(false);
  }

  function handleReport(messageId) {
    console.log(`Report a message ${messageId}`);
    setFocusedMessageId(null);
    setShowEmojiPicker(false);
    setShowActionModal(false);
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
            {focusedMessageId === msg.id && showActionModal && (
              <div className="quick-reactions">
                {quickEmojis.map((emoji) => (
                  <button
                    key={emoji.id}
                    className="quick-reaction-button"
                    onClick={() => handleReaction(msg.id, emoji)}
                  >
                    {emoji.native}
                  </button>
                ))}
              </div>
            )}
            {msg.text}
            {focusedMessageId === msg.id && showActionModal && (
              <div className="action-modal">
                <button
                  onClick={() => handleReply(msg.id)}
                  className="action-button"
                >
                  Reply
                  <ion-icon name="arrow-undo-outline"></ion-icon>
                </button>

                <button
                  onClick={() => handleCopy(msg.id)}
                  className="action-button"
                >
                  Copy
                  <ion-icon name="copy-outline"></ion-icon>
                </button>

                <button
                  onClick={() => handlePin(msg.id)}
                  className="action-button"
                >
                  Pin
                  <ion-icon name="pin-outline"></ion-icon>
                </button>

                <button
                  onClick={() => handleForward(msg.id)}
                  className="action-button"
                >
                  Forward
                  <ion-icon name="arrow-redo-outline"></ion-icon>
                </button>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="action-button delete"
                >
                  Delete
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
                <button
                  onClick={() => handleReport(msg.id)}
                  className="action-button"
                >
                  Report
                  <ion-icon name="alert-circle-outline"></ion-icon>
                </button>
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setShowEmojiPicker(true);
                  }}
                  className="action-button"
                >
                  Add Reaction
                  <ion-icon name="add-circle-outline"></ion-icon>
                </button>
              </div>
            )}
            {focusedMessageId === msg.id && showEmojiPicker && (
              <div className="reaction-menu">
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => handleReaction(msg.id, emoji)}
                  theme="light"
                  previewPosition="none"
                  skinTonePosition="none"
                  perLine={7}
                  maxFrequentRows={2}
                  emojiSize={20}
                  emojiButtonSize={28}
                />
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
            setShowActionModal(false);
          }}
        />
      )}
    </div>
  );
};

export default BlurMessage;
