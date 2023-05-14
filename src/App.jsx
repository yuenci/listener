import './App.css'
import LeftArea from "./components/LeftArea.jsx";
import RightArea from "./components/RightArea.jsx";
import {useEffect, useState} from "react";

function App() {
    const [subtitles, setSubtitles] = useState([])
    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0)

    useEffect(() => {
        console.log(currentSubtitleIndex)
    }, [currentSubtitleIndex])

    useEffect(() => {
        fetch("src/subtitles/Friends.S01E01.json")
            .then(res => res.json())
            .then(data => {
                console.log(data.all)
                setSubtitles(data.all)
            })
    }, [])





  return (
    <div className="app">
        <LeftArea  setCurrentSubtitleIndex={setCurrentSubtitleIndex} subtitles={subtitles}/>
        <RightArea subtitles={subtitles}/>
    </div>
  )
}

export default App
