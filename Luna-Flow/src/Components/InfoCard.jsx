import { Input } from "postcss"
import { useState } from "react"

function InfoCard({ question, id, onAnswerChange }){

    const [answer, setAnswer] = useState("Enter Answer Here")

    const handleChange = (e) => {
        setAnswer(e.target.value)
        onAnswerChange(id, e.target.value)
    }

    return (
        <div className="flex flex-row m-4 space-y-2">
            
            <div className="font-semibold m-4 mb-4 ">{question}</div>
            
            <input 
                value={answer} 
                onChange={handleChange} 
                className="bg-amber-100 p-2 ml-2 mt-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500" 
            />
        </div>
    )

}

export default InfoCard