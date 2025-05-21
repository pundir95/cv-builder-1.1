import { t } from "@lingui/macro";
import { OpenAI } from "openai";

import { useOpenAiStore } from "@/client/stores/openai";

export const openai = () => {
  const {baseURL } = useOpenAiStore.getState();
  let apiKey = "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";
  console.log(apiKey);


  if (!apiKey) {
    throw new Error(
      t`Your OpenAI API Key has not been set yet. Please go to your account settings to enable OpenAI Integration.`,
    );
  }

  if (baseURL) {
    return new OpenAI({
      apiKey,
      baseURL,
      dangerouslyAllowBrowser: true,
    });
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};
