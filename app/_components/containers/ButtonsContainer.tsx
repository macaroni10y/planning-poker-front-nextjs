import TheButton from "@/app/_components/uiparts/TheButton";
import type { MouseEventHandler } from "react";

interface Props {
    onClickReveal: MouseEventHandler<HTMLButtonElement>;
    onClickNextVote: MouseEventHandler<HTMLButtonElement>;
}

const ButtonsContainer = (props: Props) => (
    <div className="flex p-3 w-full max-w-5xl bg-white justify-center rounded-b-xl">
        <TheButton onClick={props.onClickReveal} text="Reveal" />
        <TheButton onClick={props.onClickNextVote} text="Next Vote" />
    </div>
);

export default ButtonsContainer;
