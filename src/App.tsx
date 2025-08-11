import { useState } from "react";
import Form from "./Components/Form";
import Ticket from "./Components/Ticket";

function App() {
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [generateTicket, setGenerateTicket] = useState<boolean>(false);

  return (
    <div className="back h-fit min-h-screen flex flex-col items-center gap-18 text-center !p-10 max-lg:!p-2.5">
      <img src="images/logo-full.svg" alt="logo" />
      <Form
        state={{
          preview,
          setPreview,
          name,
          setName,
          email,
          setEmail,
          github,
          setGithub,
          generateTicket,
          setGenerateTicket,
        }}
      />
      <Ticket
        state={{
          preview,
          name,
          email,
          github,
          generateTicket,
        }}
      />
      <div className="hidden attribution text-[11px] text-center">
        Challenge by{" "}
        <a
          className="text-[hsl(228, 45%, 44%)]"
          href="https://www.frontendmentor.io?ref=challenge"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          className="text-[hsl(228, 45%, 44%)]"
          href="https://github.com/savchrisostomidhs"
        >
          savchrisostomidhs
        </a>
        .
      </div>
    </div>
  );
}

export default App;
