import { ChatOpenAI } from "langchain/chat_models/openai";
import { RetrievalQAChain } from "langchain/chains";
import { Redis } from "@upstash/redis";

export const getLangChain = async ({
  sessionId,
  retriever,
}: {
  sessionId: string;
  retriever: any;
}) => {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  const model = new ChatOpenAI({
    openAIApiKey: process.env.TOGETHER_API_KEY!,
    modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    configuration: {
      basePath: "https://api.together.xyz/v1",
    },
  });

  const chain = RetrievalQAChain.fromLLM(model, retriever);

  return {
    chain,
    redis,
  };
};
