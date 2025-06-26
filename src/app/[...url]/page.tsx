import Threads from "@/Backgrounds/Threads/Threads";
import { ChatWrapper } from "@/Components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
  const sessionCookie = (await cookies()).get("sessionId")?.value;
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(
    /\//g,
    ""
  );

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  const initialMessages = (
    await ragChat.history.getMessages({
      amount: 10,
      sessionId,
    })
  ).reverse();

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "750px",
        position: "relative",
      }}
    >
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      <div className="h-full absolute top-0 left-1/2 transform -translate-x-1/2">
        <ChatWrapper
          sessionId={sessionId}
          initialMessages={initialMessages}
        />
      </div>
    </div>
  );
};

export default Page;
