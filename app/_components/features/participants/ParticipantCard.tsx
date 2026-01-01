import { Check } from "lucide-react";
import { Spinner } from "@/app/_components/ui/base/Spinner";
import type { Vote } from "@/app/_types/types";
import { cn } from "@/lib/utils";

interface Props {
    name: string;
    vote: Vote;
    showVote: boolean;
}

const ParticipantCard = ({ name, vote, showVote }: Props) => {
    const isWaiting = vote === "not yet";
    const isFlipped = showVote;

    return (
        <div className="flex flex-col items-center">
            <div className="flip-card-container w-16 h-24 md:w-20 md:h-30 lg:w-24 lg:h-36 xl:w-28 xl:h-40">
                <div
                    className={cn(
                        "flip-card-inner relative w-full h-full",
                        isFlipped && "flipped",
                    )}
                >
                    {/* Front Face */}
                    <div className="flip-card-face flip-card-front rounded-xl bg-card shadow-lg border border-border flex items-center justify-center">
                        {isWaiting ? (
                            <Spinner size={20} />
                        ) : (
                            <Check
                                size={20}
                                strokeWidth={3}
                                className="text-green-500"
                            />
                        )}
                    </div>

                    {/* Back Face */}
                    <div className="flip-card-face flip-card-back rounded-xl bg-secondary shadow-lg border border-border flex items-center justify-center">
                        <span className="font-bold text-secondary-foreground text-lg md:text-xl lg:text-2xl xl:text-3xl">
                            {vote === "not yet" ? "" : vote}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-1 text-xs font-medium truncate w-16 md:w-20 lg:w-24 xl:w-28 text-center text-card-foreground">
                {name}
            </div>
        </div>
    );
};

export default ParticipantCard;
