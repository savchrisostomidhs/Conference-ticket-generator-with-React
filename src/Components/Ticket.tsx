interface State {
  preview: string | null;
  name: string;
  email: string;
  github: string;
  generateTicket: boolean;
}

function Ticket({ state }: { state: State }) {
  return (
    <section
      className={`flex-col items-center gap-6 flex-1 mt-[-20px] max-lg:w-full ${
        state.generateTicket ? "flex" : "hidden"
      }`}
    >
      <h1 className="text-4xl font-[700] w-[50%] max-lg:w-full">
        Congrats, <span className="grad">{state.name}</span>! Your ticket is
        ready.
      </h1>
      <p className="text-[hsl(252,6%,83%)] w-[45%] max-lg:w-full">
        We've emailed your ticket to{" "}
        <span className="text-[hsl(7,88%,67%)]">{state.email}</span> and will
        send updates in the run up to the event.
      </p>
      <div className=" bg relative w-[600px] h-[280px] flex flex-col justify-between items-start p-5 mt-10 max-sm:gap-10 max-sm:w-full max-sm:h-auto">
        <img className="absolute w-full h-full top-0 left-0" src="images/pattern-ticket.svg" alt="" />
        <p className="text-[hsla(252,6%,83%,0.5)] text-3xl rotate-90 absolute right-2 top-[43%] select-none max-sm:text-lg">
          #01609
        </p>
        <div className="flex flex-col gap-1">
          <p className="flex gap-2.5 items-center text-[clamp(1rem,1.5vw,1.25rem] font-[700]">
            <img
              className="h-[30px] w-[30px]"
              src="images/logo-mark.svg"
              alt="logo"
            />{" "}
            Coding Conf
          </p>
          <p className="text-[hsl(252,6%,83%)] ml-10">
            Jan 31, 2025 / Austin, TX
          </p>
        </div>
        <div className="h-[30%] flex items-center gap-2.5 max-sm:h-[60px]">
          <img
            className="h-full rounded-md"
            src={state.preview ? state.preview : "images/image-avatar.jpg"}
            alt="avatar"
          />
          <div className="flex flex-col gap-2 justify-end items-start h-full py-1">
            <p className="text-2xl max-sm:text-sm">
              {state.name ? state.name : "Jonatan Kristof"}
            </p>
            <p className="h-fit flex gap-2.5 items-center text-[hsl(252,6%,83%)] max-sm:text-md">
              <img className="h-full" src="images/icon-github.svg" alt="github" />
              {state.github ? `@${state.github}` : "@jonatankristof0101"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ticket;
