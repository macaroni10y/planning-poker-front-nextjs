import { Check, Copy } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
    copyTarget: string;
}

const CopyToClipBoard = (props: Props) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await global.navigator.clipboard.writeText(props.copyTarget);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            type="button"
            className="flex items-center gap-1 border-none bg-transparent p-0 cursor-pointer"
            onClick={copy}
            aria-label="Copy to clipboard"
        >
            {props.children}
            <div className="px-1">
                {copied ? (
                    <Check size={16} className="text-green-500" />
                ) : (
                    <Copy size={16} />
                )}
            </div>
        </button>
    );
};

export default CopyToClipBoard;
