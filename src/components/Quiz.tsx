import React, { useState } from "react";
import type { WordEntry } from "../types";

interface QuizProps {
  words: WordEntry[];
  quizStarted: boolean;
  onStartQuiz: () => void;
  onRetryOrSubmit: () => void;
  fileName?: string;
}

export default function Quiz({
  words,
  onStartQuiz,
  onRetryOrSubmit,
  fileName,
}: QuizProps) {
  const [mode, setMode] = useState<"word" | "definition" | "both">("definition");
  const [numQuestions, setNumQuestions] = useState<number>(words.length > 10 ? 10 : words.length);
  const [randomOrder, setRandomOrder] = useState<boolean>(true);

  const [questions, setQuestions] = useState<WordEntry[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Start Quiz
  const startQuiz = () => {
    let selectedQuestions = [...words];
    if (randomOrder) selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
    selectedQuestions = selectedQuestions.slice(0, numQuestions);

    setQuestions(selectedQuestions);
    setUserAnswers(Array(selectedQuestions.length).fill(""));
    setShowResult(false);

    onStartQuiz();
  };

  // Input Change
  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[idx] = value;
    setUserAnswers(newAnswers);
  };

  // Submit
  const handleSubmit = () => {
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Retry
  const handleRetry = () => {
    setQuestions([]);
    setUserAnswers([]);
    setShowResult(false);
    setMode("definition");
    setNumQuestions(words.length > 10 ? 10 : words.length);
    setRandomOrder(true);

    onRetryOrSubmit();
  };

  // Quiz Mode Selection Page
  if (questions.length === 0 && !showResult) {
    return (
      <div className="quiz-mode-container">
        {fileName && <p>Current file: {fileName}</p>}

        {/* Quiz Mode */}
        <div>
          <label>Quiz Mode: </label>
            <div className="mode-buttons">
              <button className={`mode-btn ${mode === "word" ? "active" : ""}`} onClick={() => setMode("word")}>
                Show Word
              </button>
              <div className="divider"></div>
              <button className={`mode-btn ${mode === "definition" ? "active" : ""}`} onClick={() => setMode("definition")}>
                Show Definition
              </button>
              <div className="divider"></div>
              <button className={`mode-btn ${mode === "both" ? "active" : ""}`} onClick={() => setMode("both")}>
                Random Word/Definition
              </button>
            </div>
        </div>

        {/* Number of Questions */}
        <div className="number-questions-sec">
          <label>
            Number of Questions (max {words.length}):{" "}
          </label>
          <input
              type="number"
              value={numQuestions}
              min={1}
              max={words.length}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            />
          <div className="divider"></div>
          <button className="max-btn" onClick={() => setNumQuestions(words.length)}>Max</button>
        </div>

        {/* Random Order */}
        <div className="random-order-sec">
          <label>
            Random Order:{" "}
          </label>
          <input type="checkbox" checked={randomOrder} onChange={(e) => setRandomOrder(e.target.checked)} />
        </div>

        {/* Start Quiz */}
        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  // Result Display Page
  if (showResult) {
    const results = questions.map((q, idx) => {
      const correctAnswer =
        mode === "word"
          ? q.Definition
          : mode === "definition"
          ? q.Word
          : Math.random() > 0.5
          ? q.Word
          : q.Definition;

      const userAnswer = userAnswers[idx] || "";
      const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

      return {
        idx: idx + 1,
        question: mode === "word" ? q.Word : q.Definition,
        userAnswer,
        correctAnswer,
        isCorrect,
      };
    });

    const score = results.filter((r) => r.isCorrect).length;

    return (
      <div>
        <h2>Result: {score}/{questions.length}</h2>

        <table className="quiz-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
              <th>✓ / ✗</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.idx}>
                <td>{r.idx}</td>
                <td>{r.question}</td>
                <td style={{ color: r.isCorrect ? "inherit" : "red" }}>{r.userAnswer}</td>
                <td>{r.correctAnswer}</td>
                <td>{r.isCorrect ? "✓" : "✗"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="px-3 py-1 border rounded" onClick={handleRetry}>Retry Quiz</button>
      </div>
    );
  }

  // Quiz Questions Page
  return (
    <div className="quiz-table-container">
      {fileName && <p>Current file: {fileName}</p>}
      <table className="quiz-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, idx) => {
            const questionText =
              mode === "word"
                ? q.Word
                : mode === "definition"
                ? q.Definition
                : Math.random() > 0.5
                ? q.Word
                : q.Definition;

            return (
              <tr key={idx}>
                <td>{idx + 1}.</td>
                <td>{questionText}</td>
                <td>
                  <input type="text" value={userAnswers[idx] || ""} onChange={(e) => handleChange(idx, e.target.value)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="quiz-button-group">
        <button onClick={handleRetry}>Retry</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}