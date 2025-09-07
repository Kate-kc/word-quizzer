import React from "react";
import type { WordEntry } from "../types";

interface WordTableProps {
  words: WordEntry[];
}

export default function WordTable({ words }: WordTableProps) {
  if (!words.length) {
    return <p className="mt-4">No words loaded yet</p>;
  }

  return (
    <table className="mt-4 w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Word</th>
          <th className="border border-gray-300 p-2">Definition</th>
        </tr>
      </thead>
      <tbody>
        {words.map((row, idx) => (
          <tr key={idx}>
            <td className="border border-gray-300 p-2">{row.Word}</td>
            <td className="border border-gray-300 p-2">{row.Definition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}