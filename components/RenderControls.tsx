import { z } from "zod";
import { useRendering } from "../helpers/use-rendering";
import { CompositionProps, COMP_NAME } from "../types/constants";
import { AlignEnd } from "./AlignEnd";
import { Button } from "./Button/Button";
import { InputContainer } from "./Container";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "./Error";
import { Input } from "./Input";
import { ProgressBar } from "./ProgressBar";
import { Spacing } from "./Spacing";
import { callGpt4 } from "../remotion/openaiService";
import { toast } from "react-toastify";

export const RenderControls: React.FC<{
  text: string;
  prompt: string;
  content: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  inputProps: z.infer<typeof CompositionProps>;
}> = ({
  text,
  setText,
  inputProps,
  prompt,
  setPrompt,
  content,
  setContent,
}) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  async function HandleGPT() {
    toast.success("Please wait for your lecture to load!");
    const response: any = await callGpt4(prompt);
    const modifiedResponse = response.replace(/([a-zA-Z0-9-]+?):/g, '"$1":');
    const responseObject = JSON.parse(modifiedResponse);
    const { Title, Content } = responseObject; // Destructure the response directly
    console.log(Title); // Log the title for debugging purposes
    setText(Title); // Set the title in your application state
    setContent(Content); // Set the content in your application state
  }

  return (
    <InputContainer>
      {state.status === "init" ||
      state.status === "invoking" ||
      state.status === "error" ? (
        <>
          <Input
            disabled={state.status === "invoking"}
            setText={setText}
            text={text}
          ></Input>
          <Spacing></Spacing>
          <AlignEnd>
            <Button
              disabled={state.status === "invoking"}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === "error" ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </>
      ) : null}
      {state.status === "rendering" || state.status === "done" ? (
        <>
          <ProgressBar
            progress={state.status === "rendering" ? state.progress : 1}
          />
          <Spacing></Spacing>
          <AlignEnd>
            <DownloadButton undo={undo} state={state}></DownloadButton>
          </AlignEnd>
        </>
      ) : null}

      <Input setText={setPrompt} text={prompt}></Input>
      <Spacing></Spacing>
      <AlignEnd>
        <Button onClick={async () => await HandleGPT()}>Ask AI</Button>
      </AlignEnd>
    </InputContainer>
  );
};
