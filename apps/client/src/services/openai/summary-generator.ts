/* eslint-disable lingui/text-restrictions */

import { t } from "@lingui/macro";

import { DEFAULT_MAX_TOKENS, DEFAULT_MODEL } from "@/client/constants/llm";
import { useOpenAiStore } from "@/client/stores/openai";

import { openai } from "./client";

const PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Generate 4 different professional summaries for the following role/input. Each summary should be unique and highlight different aspects of the role.
Do not return anything else except the 4 summaries. Each summary should be separated by "---" and should not have any prefix or suffix text.

Input: """{input}"""

Summaries: """`;

export const summaryGenerator = async (text: string) => {
  const prompt = PROMPT.replace("{input}", text);

  const { model, maxTokens } = useOpenAiStore.getState();

  const result = await openai().chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: model ?? DEFAULT_MODEL,
    max_tokens: maxTokens ?? DEFAULT_MAX_TOKENS,
    temperature: 0.7,
    stop: ['"""'],
    n: 1,
  });

  if (result.choices.length === 0) {
    throw new Error(t`OpenAI did not return any choices for your text.`);
  }

  const content = result.choices[0].message.content ?? text;
  return content.split('---').map(summary => summary.trim());
};
