import type { MouseEventHandler } from "react";
import { Button } from "@/app/_components/ui/base/Button";

interface Props {
    onClickReveal: MouseEventHandler<HTMLButtonElement>;
    onClickNextVote: MouseEventHandler<HTMLButtonElement>;
}

const ButtonsContainer = (props: Props) => (
    <div className="flex justify-center gap-4 m-4">
        <Button size="xlg" className="w-44" onClick={props.onClickReveal}>
            Reveal
        </Button>
        <Button size="xlg" className="w-44" onClick={props.onClickNextVote}>
            Next Vote
        </Button>
    </div>
);

export default ButtonsContainer;
