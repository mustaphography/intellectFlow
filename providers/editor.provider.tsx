"use client";

import { Editor } from "@monaco-editor/react";

interface EditorProviderProps {
  children: React.ReactNode;
}

export default function EditorProvider({ children }: EditorProviderProps) {
  return (
    <>
      {children}
      <Editor />
    </>
  );
}
