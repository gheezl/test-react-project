import './App.css'

import { useState } from 'react'
import { Input, Button, Card } from "antd";
import { bytesToHex, utf8ToBytes } from '@noble/hashes/utils';
import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';

function App() {
  const [input, setInput] = useState<string>("");
  const [secret, setSecret] = useState<string>("secret");
  const [hash, setHash] = useState<string>("");

  const createHash = (input: string) => {
    const messageBytes = utf8ToBytes(input);
    const secretBytes = utf8ToBytes(secret);

    setHash(bytesToHex(hmac(sha256, secretBytes, messageBytes)));
    setInput("");
  }

  return (
    <>
      <div className="card">
        <div className="inputAndButtons">
          <Input placeholder='Enter String' value={input} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
          <Input placeholder='Enter Secret Key (Optional)' onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSecret(e.target.value)} />
          <Button onClick={() => createHash(input)} disabled={!input} >Get Hash</Button>
        </div>
        {
          hash && (
            <Card>
              <p>{hash}</p>
            </Card>
          )
        }
      </div>
    </>
  )
}

export default App
