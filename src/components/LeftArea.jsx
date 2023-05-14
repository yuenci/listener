import "./style.css"
import {useRef, useState} from "react";
export default function LeftArea(props){
    const {setCurrentSubtitleIndex,subtitles} = props
    const [play, setPlay] = useState(false)
    const audioRef = useRef(null);

    function playAudio(){
        setPlay(!play)
        if(play){
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
    }

    let isThrottled = false;

    function handleTimeUpdate() {
        if (isThrottled) return;

        isThrottled = true;

        setTimeout(() => {
            console.log(audioRef.current.currentTime);

            // 使用二分查找找到当前的字幕
            let left = 0;
            let right = subtitles.length - 1;
            let mid = Math.floor((left + right) / 2);

            while (left <= right) {
                console.log(subtitles[mid])
                if (
                    subtitles[mid].time.start <= audioRef.current.currentTime &&
                    audioRef.current.currentTime <= subtitles[mid].time.end
                ) {
                    console.log(mid);
                    setCurrentSubtitleIndex(mid);
                    break;
                } else if (subtitles[mid].time.start > audioRef.current.currentTime) {
                    right = mid - 1;
                    mid = Math.floor((left + right) / 2);
                } else {
                    left = mid + 1;
                    mid = Math.floor((left + right) / 2);
                }
            }

            isThrottled = false;
        }, 2000);
    }

    function add5s(){
        audioRef.current.currentTime += 5
        audioRef.current.play()
        setPlay(true)
    }

    function minus5s(){
        audioRef.current.currentTime -= 5
        audioRef.current.play()
        setPlay(true)
    }

    return(
        <div className="left-area">
            <div className="left-area__header">
                <div className="left-area__header__title">
                    <img src="/backward.svg"  alt="" className="play-btn" onClick={minus5s}/>
                    {play
                        ?  <img src="/pause.svg"  alt="" className="play-btn" onClick={playAudio}/>
                        :  <img src="/play.svg"  alt="" className="play-btn" onClick={playAudio}/>
                    }
                    <img src="/forward.svg"  alt="" className="play-btn" onClick={add5s}/>
                </div>
            </div>
            <audio controls ref={audioRef} onTimeUpdate={handleTimeUpdate}>
                <source src="https://firebasestorage.googleapis.com/v0/b/listener-8e52f.appspot.com/o/Friends_S1%2FS01E01.mp3?alt=media&token=e767433f-8b85-4743-a821-5793c401353b" />
            </audio>
        </div>
    )
}