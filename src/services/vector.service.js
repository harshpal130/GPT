const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const GPTindex = pc.index('gpt');

async function createMemory({ vectors, metadata, messageId }) {

  await GPTindex.upsert({
    records: [
      {
        id: String(messageId),
        values: vectors,
        metadata: {
          chat: String(metadata.chat),
          user: String(metadata.user),
          text: metadata.text
        }
      }
    ]
  });
}

async function queryMemory({ queryVector, limit = 5 }) {
  const data = await GPTindex.query({
    vector: queryVector,
    topK: limit,
    includeMetadata: true
  });

  return data.matches;
}

module.exports = {
  createMemory,
  queryMemory
};