import { useAuth } from "../Contexts/authContext"
import { useState } from "react";

function Journal({ onEntryChange }){

    const questions = [
        "Question 1", "Question 2", "Question 3", "Question 4",
        "Question 5", "Question 6", "Question 7", "Question 8",
        "Question 9", "Question 10"
    ];

    const [answer, setAnswer] = useState("Enter Answer Here")

    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState({});

    const handleChange = (e) => {
        setAnswers((prev) => ({
            ...prev,
            [selectedQuestionIndex]: value
        }));
        onEntryChange(selectedQuestionIndex, value);
    }

    return(
            <div className="w-full">
            {/* Horizontal question selector */}
            <div className="flex w-1/2 flex-row overflow-x-scroll">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className={`p-4 cursor-pointer ${
                            selectedQuestionIndex === index ? "bg-gray-300" : ""
                        }`}
                        onClick={() => setSelectedQuestionIndex(index)}
                    >
                        {question}
                    </div>
                ))}
            </div>

            {/* Input field for the selected question */}
            <input
                className="w-full p-2 mt-4 border rounded"
                value={answers[selectedQuestionIndex] || ""}
                onChange={handleChange}
                placeholder="Enter Answer Here"
            />
        </div>
    )

}

export default Journal