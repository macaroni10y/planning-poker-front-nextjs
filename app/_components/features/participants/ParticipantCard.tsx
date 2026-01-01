import { Check } from "lucide-react";
import { Spinner } from "@/app/_components/ui/base/Spinner";
import type { Vote } from "@/app/_types/types";
import { cn } from "@/lib/utils";

interface Props {
    name: string;
    vote: Vote;
    showVote: boolean;
    size?: "normal" | "large";
}

const ParticipantCard = ({ name, vote, showVote, size = "normal" }: Props) => {
    const isWaiting = vote === "not yet";
    const isFlipped = showVote;
    const isLarge = size === "large";

    const cardSizeClass = isLarge
        ? "w-16 h-24 sm:w-20 sm:h-30 lg:w-20 lg:h-30 xl:w-24 xl:h-36"
        : "w-12 h-18 sm:w-16 sm:h-24 lg:w-16 lg:h-24 xl:w-20 xl:h-30";

    const nameLabelClass = isLarge
        ? "w-16 md:w-20 lg:w-24 xl:w-28"
        : "w-12 md:w-16 lg:w-20 xl:w-24";

    return (
        <div className="flex flex-col items-center">
            <div className={cn("flip-card-container", cardSizeClass)}>
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
                        <span className="font-bold text-secondary-foreground text-base md:text-lg lg:text-xl xl:text-2xl">
                            {vote === "not yet" ? "" : vote}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    "mt-1 text-xs font-medium truncate text-center text-card-foreground",
                    nameLabelClass,
                )}
            >
                {name}
            </div>
        </div>
    );
};

export default ParticipantCard;
