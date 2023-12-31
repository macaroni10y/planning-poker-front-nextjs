import React from "react";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    text: string,
}

const TheButton = (props: Props) =>
    (
        <div className="bg-pink-200 hover:bg-pink-300 font-bold py-2 px-4 rounded">
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    )

export default TheButton;