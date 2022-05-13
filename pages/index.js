import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

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
  }

  return (
    <div>
      <Head>
        <title>Tina's AI Playground</title>
        <link rel="icon" href="/squiddy.png" />
      </Head>

      <main className={styles.main}>
        <h3>Send a prompt to AI</h3>

        {/* Intro section */}
        <section className={styles.graphic}>
          <figure>🐙</figure>
          <div className={styles.chatpointer} />
          <figcaption className={styles.chatblue}>
            Hi, I'm Blotty. What can I do for you?
          </figcaption>
        </section>

        {/* Inputs & results as a conversation */}
        <section className={styles.result}>
          {result.map((item) => (
            <div key={item.input}>
              <p>
                <span className={styles.chatgray}>{item.input}</span>
              </p>
              <p>
                <span className={styles.chatblue}>{item.result}</span>
              </p>
            </div>
          ))}
        </section>

        {/* User input form */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Tell me to do something or ask me a question."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
        <footer className={styles.footer}>2022 <a href="https://tinagao.com/projects/">tinagao.com</a></footer>
      </main>
    </div>
  );
}
