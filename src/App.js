import React, { useState } from "react";
import { DropDown } from "./components/dropdown";
import { ReactMediaRecorder } from "react-media-recorder";

import "./App.css";

const languages = [
  "Tamil",
  "English - US",
  "English - UK",
  "Arabic",
  "Chinese - Simplified",
  "Italian",
  "Korean",
  "Japanese",
  "Spanish",
  "Portuguese",
  "French",
  "German",
  "Russian",
  "Vietnamese",
  "Thai",
];

function App() {
  const [fromLanguage, setFromLanguage] = useState(null);
  const [toLanguage, setToLanguage] = useState(null);

  const fromLanguageHandler = (event) => {
    setFromLanguage(event.target.value);
  };
  const toLanguageHandler = (event) => {
    setToLanguage(event.target.value);
  };

  const handleAudioUpload = (fileUrl, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("from", fromLanguage);
    formData.append("to", toLanguage);
    fetch("http://localhost:8000/translate", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("data", data));
  };

  return (
    <div className="App">
      <div className="appHeader">
        <h1>Voice Message Demo</h1>
      </div>
      <div className="languageWrapper">
        <DropDown
          label={`Speaking Language`}
          options={languages}
          onChangeHandler={fromLanguageHandler}
        />
        <DropDown
          label={`Translating Language`}
          options={languages}
          onChangeHandler={toLanguageHandler}
        />
      </div>
      {true && (
        <ReactMediaRecorder
          audio
          onStop={(blobUrl, blob) => handleAudioUpload(blobUrl, blob)}
          mediaRecorderOptions={{ mimeType: "audio/wav" }}
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
            return (
              <div className="recorderWrapper">
                <p>{status}</p>
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
                <audio src={mediaBlobUrl} controls autoPlay loop />
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export default App;
