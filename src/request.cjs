// request tools

// node-fetch wrap
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Send request to llm server ,and streaming get response
// prompt: request prompt; func: function to execute when get response every stream
async function stream_request(prompt, func) {
  let dataChunks = [];
  // const url = "http://127.0.0.1:8002/router/spark";
  const url = "http://askword.cn/router/spark";

  const data = JSON.stringify({ prompt: prompt });

  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) return;

  for await (const chunk of response.body) {
    const value = chunk.toString();

    if (func) func(value);

    // check end signal, #finished#
    if (value !== "#finished#") dataChunks.push(value);
  }

  return dataChunks;
}

module.exports = { stream_request };
