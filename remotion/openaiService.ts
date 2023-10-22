import axios, { AxiosResponse } from "axios";

export async function callGpt4(text: string) {
  let ret: any = "";
  try {
    const response: AxiosResponse = await axios({
      method: "POST",
      url: "https://api.openai.com/v1/chat/completions",
      data: {
        messages: [
          {
            role: "user",
            content: `Give me a short answer about 10 words maximum. DON'T EXCEED THE WORD LIMIT BY ANY CHANCES. act as an instructor where all the prompts are questions from your students.
            Your answer should be a headline and the content (content can be more than 10 words, about 80 words MAX). the format your answer should be as follows:
            {
              Title: "Your title",
              "Content": "Your content"
            }
            
        prompt: ${text}
        `,
          },
        ],
        temperature: 0.5,
        n: 1,
        model: "gpt-4",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
    });

    ret = response.data.choices[0].message.content;
    console.log(ret); // Log the response after the successful API call.
  } catch (e) {
    console.error(e);
    ret = e;
  }

  return ret;
}
