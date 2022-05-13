import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    });
    const data = await response.json();
    result.push({ input: textInput, result: data.result });
    setTextInput("");
    console.log(result); //delete console.log
  }

  return (
    <div>
      <Head>
        <title>Tina's AI Playground</title>
        <link rel="icon" href="/dog.png" /> //favicon
      </Head>

      <main className={styles.main}>
        <h3>Send a prompt to AI</h3>

        {/* Intro section */}
        <div className={styles.graphic}>
          <span>🐙</span>
          <div className={styles.chatpointer} />
          <div className={styles.chatblue}>
            Hi, I'm Blotty. What can I do for you?
          </div>
        </div>

        {/* Inputs & results as a conversation */}
        <div className={styles.result}>
          {result.map((item) => (
            <div key={item.input}>
              <p className={styles.chatblue}>Input: {item.input}</p>
              <p className={styles.chatgray}>Result: {item.result}</p>
            </div>
          ))}
        </div>

        {/* User input form */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Tell me to do something."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </main>
    </div>
  );
}
