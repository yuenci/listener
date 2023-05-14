import "./style.css"
export default function RightArea(props){
    const {subtitles} = props
    // console.log(subtitles)

    return(
        <div className="right-area">
            {subtitles.map((subtitle, index) => {
                return(
                    <div className="right-area__subtitle" key={index}>
                        <p className="right-area__subtitle_e">{subtitle.english}</p>
                        <p>{subtitle.chinese}</p>
                    </div>
                )
            })}
        </div>
    )
}