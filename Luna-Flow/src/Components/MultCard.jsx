import { useState } from "react";

function MultCard({ question, id, options, onAnswerSelect, selectedAnswers }) {
    const [selectedAnswer, setSelectedAnswer] = useState(selectedAnswers?.[id] || null);

    const handleSelect = (answer) => {
        setSelectedAnswer(answer);
        onAnswerSelect(id, answer); // Send selected answer to parent
    };

    return (
        <div className="flex flex-col p-4 rounded-lg">
            {/* Display question */}
            <p className="text-lg font-semibold mb-2">{question}</p>

            {/* Render answer options */}
            <div className="flex flex-row space-x-2">
                {options.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(answer)}
                        className={`p-2 rounded-md ${
                            selectedAnswer === answer
                                ? "bg-indigo-400 text-white font-semibold"
                                : "shadow-md bg-amber-300/40 hover:bg-amber-300"
                        }`}
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MultCard;