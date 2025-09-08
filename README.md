# Word Quizzer

**Word Quizzer** is an interactive vocabulary quiz app built with **React** and **TypeScript**.  
Upload your vocabulary lists in CSV or Excel format, customize quiz options, and test your knowledge.

---

## Features
- Upload CSV or Excel (.xlsx/.xls) files with vocabulary words and definitions
- Choose quiz mode:  
  - **Show Word** → answer with Definition  
  - **Show Definition** → answer with Word  
  - **Random** → either Word or Definition randomly
- Set the number of questions per quiz
- Enable/disable random order of questions
- Track your answers and see results with scores
- Retry quizzes while retaining the uploaded file

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Kate-kc/word-quizzer.git
cd word-quizzer
npm install
```

---

## Run the development server:
```bash
npm run dev
```
Open your browser at the URL shown in the terminal.

---

## Usage
1. Upload your vocabulary file
  - Supported file types: .csv, .xlsx, .xls
  - CSV format example:
  ```csv
Word,Definition
pomme,apple
banane,banana
  ```
  - Excel format example:
First row should be headers: Word | Definition. Following rows contain the vocabulary.
2.	Choose quiz options
  - Quiz Mode (Word / Definition / Random)
  - Number of questions (max the number of words in your file)
  - Random Order (checkbox)
3. Start Quiz
  - Click Start Quiz to begin
  - Enter your answers in the input fields
  - Click Submit to see your results
4. Retry Quiz
  - Click Retry to restart quiz options (file is retained)

---

## File Format Requirements
- The first row must contain headers: Word and Definition
- Each row after that should contain one vocabulary entry
- Empty rows are ignored
- Example CSV:
```csv
Word,Definition
pomme,apple
banane,banana
```
- Example Excel:

| Word         | Definition      |
|--------------|----------------|
| pomme  | apple           |
| banane    | banana           |

