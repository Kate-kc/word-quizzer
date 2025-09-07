import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import Quiz from "../components/Quiz";
import type { WordEntry } from "../types";

export default function Home() {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as WordEntry[];
          setWords(data.filter((row) => row.Word && row.Definition));
        },
      });
    } else if (ext === "xlsx" || ext === "xls") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const wb = XLSX.read(evt.target?.result, { type: "binary" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data: WordEntry[] = XLSX.utils.sheet_to_json(sheet);
        setWords(data.filter((row) => row.Word && row.Definition));
      };
      reader.readAsBinaryString(file);
    } else {
      alert("Please upload a CSV or Excel file");
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleRetry = () => {
    setQuizStarted(false);
  };

  return (
    <div className="container">
      <h1>Word Quizzer</h1>

      {!quizStarted && (
        <div className="file-upload">
          <input
            id="fileUpload"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="upload-btn"
            onClick={() => document.getElementById("fileUpload")?.click()}
          >
            Upload File
          </button>

          {fileName && <span className="ml-2">Current file: {fileName}</span>}
        </div>
      )}

      {/* Quiz component */}
      {words.length > 0 && (
        <Quiz
          words={words}
          onStartQuiz={handleStartQuiz}
          onRetryOrSubmit={handleRetry}
          fileName={fileName}
        />
      )}
    </div>
  );
}