import { Document } from "langchain/document";

export async function fetchVectorFromUpstash(
  sessionId: string
): Promise<Document[]> {
  const url = `${process.env.UPSTASH_VECTOR_REST_URL}/get/${sessionId}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_VECTOR_REST_TOKEN}`,
    },
  });

  const raw = await res.json();

  if (!raw.result) return [];

  const docs: Document[] = JSON.parse(raw.result).map(
    (d: any) => new Document(d)
  );
  return docs;
}
