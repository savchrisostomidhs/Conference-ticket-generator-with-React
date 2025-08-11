import React, { useRef, useState, type ChangeEvent } from "react";

interface State {
  preview: string | null;
  setPreview: (value: string | null) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  github: string;
  setGithub: (value: string) => void;
  generateTicket: boolean;
  setGenerateTicket: (value: boolean) => void;
}

function Form({ state }: { state: State }) {
  const [error, setError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file.size > 512000) {
      setError(true);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        state.setPreview(String(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      handleFile({
        target: {
          files: dataTransfer.files,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    state.setPreview(null);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === "Enter" && fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
      state.setGenerateTicket(true);
    }
  };

  return (
    <section
      className={`flex-col justify-between items-center gap-5 w-[60%] max-lg:w-full ${
        state.generateTicket ? "hidden" : "flex"
      }`}
    >
      <h1 className="!text-4xl !font-bold w-[75%] max-lg:w-full">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <p className="text-[hsl(252,6%,83%)] mt-2.5 max-lg:w-full">
        Secure your spot at next year's biggest coding conference.
      </p>
      <form
        className="flex flex-col justify-between items-start gap-5 w-[60%] mt-6 max-lg:w-full"
        onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <div className="input">
          <label className="w-full text-left" htmlFor="input-image">
            Upload Avatar
            <div
              tabIndex={0}
              onKeyDown={handleEnter}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="file border-dashed flex flex-col items-center justify-center gap-4 !p-2.5 h-[140px] mt-2 cursor-pointer"
            >
              {state.preview ? (
                <div className="h-full flex flex-col items-center gap-4">
                  <img
                    className="select-none h-[50%] rounded-md border-1 border-[hsla(245,15%,58%,0.2)]"
                    src={state.preview}
                    alt="preview"
                  />
                  <div className="flex gap-2.5 items-center">
                    <button onClick={handleRemove} className="button">
                      Remove image
                    </button>
                    <p className="button">Change image</p>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    className="select-none bg-[hsla(245,19%,35%,0.6)] rounded-lg p-1 border-1 border-[hsla(245,15%,58%,0.2)]"
                    src="images/icon-upload.svg"
                    alt="upload"
                  />
                  <p className="select-none text-[hsla(252,6%,83%,0.8)]">
                    Drag and drop or click to upload
                  </p>
                </>
              )}
            </div>
          </label>
          <input
            ref={fileInputRef}
            value={""}
            onChange={handleFile}
            className="hidden"
            type="file"
            id="input-image"
            accept="image/jpeg, image/png"
          />
          <p
            className={`select-none text-[8px] flex items-center gap-1 ${
              error ? "text-[hsl(7,71%,60%)]" : "text-[hsla(252,6%,83%,0.8)]"
            }`}
          >
            <svg
              className="opacity-80"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                className={`${error && "stroke-[hsl(7,71%,60%)]"}`}
                stroke="#D1D0D5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
              />
              <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
              <path
                className={`${error && "stroke-[hsl(7,71%,60%)]"}`}
                stroke="#D1D0D5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.004 10.462V7.596M8 5.569v-.042"
              />
            </svg>
            {error
              ? "File too large. Please upload a photo under 500KB."
              : "Upload your photo (JPG or PNG, max size: 500KB)."}
          </p>
        </div>

        <div className="input">
          <label htmlFor="input-name">Full Name</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              state.setName(e.currentTarget.value)
            }
            value={state.name}
            type="text"
            id="input-name"
          />
        </div>

        <div className="input">
          <label htmlFor="input-email">Email Address</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              state.setEmail(e.currentTarget.value)
            }
            value={state.email}
            type="email"
            id="input-email"
            placeholder="example@email.com"
          />
          <p
            className={`select-none text-[8px] items-center gap-1 text-[hsl(7,71%,60%)] ${
              emailError ? "flex" : "hidden"
            }`}
          >
            <svg
              className="opacity-80"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                className="stroke-[hsl(7,71%,60%)]"
                stroke="#D1D0D5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
              />
              <path fill="#D1D0D5" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
              <path
                className="stroke-[hsl(7,71%,60%)]"
                stroke="#D1D0D5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.004 10.462V7.596M8 5.569v-.042"
              />
            </svg>
            Please enter a valid email address.
          </p>
        </div>

        <div className="input">
          <label htmlFor="input-github">GitHub Username</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              state.setGithub(e.currentTarget.value)
            }
            value={state.github}
            type="text"
            id="input-github"
            placeholder="@yourusername"
          />
        </div>

        <button onClick={handleSubmit} className="submit" type="submit">
          Generate My Ticket
        </button>
      </form>
    </section>
  );
}

export default Form;
