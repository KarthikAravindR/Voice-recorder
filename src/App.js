import React, { useState } from "react";
import { DropDown } from "./components/dropdown";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";

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

  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0,
    },
  });

  const fromLanguageHandler = (event) => {
    setFromLanguage(event.target.value);
  };
  const toLanguageHandler = (event) => {
    setToLanguage(event.target.value);
  };

  const handleAudioStop = (data) => {
    // console.log(data);
    setAudioDetails(data);
  };

  const handleAudioUpload = (file) => {
    console.log(file, audioDetails);
  };

  const handleCountDown = (data) => {
    console.log(data);
  };

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    setAudioDetails(reset);
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
      {fromLanguage && toLanguage && (
        <div className="recorderWrapper">
          <Recorder
            record={true}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={(data) => handleAudioStop(data)}
            handleAudioUpload={(data) => handleAudioUpload(data)}
            handleCountDown={(data) => handleCountDown(data)}
            handleReset={() => handleReset()}
            mimeTypeToUseWhenRecording={`audio/webm`}
          />
        </div>
      )}
    </div>
  );
}

export default App;
