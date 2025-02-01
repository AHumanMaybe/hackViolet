import { Input } from "postcss"
import { useState } from "react"

function InfoCard({ question, id, onAnswerChange }){

    const [answer, setAnswer] = useState("Enter Answer Here")

    const handleChange = (e) => {
        setAnswer(e.target.value)
        onAnswerChange(id, e.target.value)
    }

    return(
        <div>
            <div>{question}</div>
            <input value={answer} onChange={handleChange}></input>
        </div>
    )

}

export default InfoCard