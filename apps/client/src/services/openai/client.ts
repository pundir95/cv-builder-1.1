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
