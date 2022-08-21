import { useEffect, useState } from "react";
import { QuestionRequest } from "../../types/form.types";

export const Questions = () => {
  const [questions, setQuestions] = useState<QuestionRequest[]>([]);
  useEffect(() => {
    if (questions.length === 0) {
      setQuestions([{ questionText: "¿Cual es tu nombre?", questionImage: "", options: [{ optionText: "Option 1", optionImage: "" }] }]);
    }
  }, []);
  const addQuestion = () => {
    setQuestions([...questions, { questionText: "¿Cual es tu nombre?", questionImage: "", options: [{ optionText: "Option 1", optionImage: "" }] }]);
  }
  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  }
  const addOption = (index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push({ optionText: "Option 1", optionImage: "" });
    setQuestions(newQuestions);
  }
  const handleChangeQuestionText = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  }
console.log(questions);
  return (
    <div>
      {questions.map((question, questionindex) => (
        <>
          <h1>Questions</h1>
          <form>
            <label>
              Question:
              <input type="text" name="Question" value={question.questionText} onChange={(e)=> handleChangeQuestionText(questionindex, e.target.value)} />
            </label>
            { question.options.map((option, optionindex) => (
              <>
                <label>
                  Option:
                  <input type="text" name="Option" value={option.optionText} />
                </label>
                <button onClick={(e) => {e.preventDefault(); addOption(questionindex)}}> add option</button>
              </>
            ))}
            <button onClick={(e) => {e.preventDefault(); addQuestion()}}>Add Question</button>
          </form>
        </>
      ))}

    </div>
  )
}