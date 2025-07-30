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
