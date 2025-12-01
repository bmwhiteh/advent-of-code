import "./styles.css";
import { useState } from "react";

export default function App() {
  const [password, setPassword] = useState("");
  const [trace, setTrace] = useState("");
  const [input, setInput] = useState("");

  function readFile(e) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
      const input = event.target.result;
      const lines = input.split("\n");
      let count = 0;
      let start = 50;
      let clicks = 0;
      for (let line of lines) {
        setInput(line);
        let direction = line.substring(0, 1);
        clicks = line.substring(1, line.length);
        if (direction == "L") {
          start -= parseInt(clicks, 10);
        } else if (direction == "R") {
          start += parseInt(clicks, 10);
        }
        if (start == 0) {
          count++;
        }
      }
      setTrace(
        trace + "\n count:" + count + " start: " + start + " clicks: " + clicks
      );
      setPassword(count);
    };

    reader.readAsText(file);
  }

  return (
    <div className="App">
      <h1>Day 1 - Get the Password</h1>
      <h2>
        Read in the File of safe dial movements to determine the number of times
        the dial stops at 0. This final result will be the password
      </h2>
      <input type="file" onChange={readFile} />

      <h3>Password: </h3>
      <pre>{password}</pre>
      <br />
      <h3>Trace: </h3>
      <pre>{trace}</pre>
      <h3>Input: </h3>
      <pre>{input}</pre>
    </div>
  );
}
