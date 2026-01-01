import { Skeleton } from "@/app/_components/ui/base/Skeleton";

const DummyParticipantCard = () => (
    <div className="w-16 h-24 md:w-20 md:h-30 lg:w-24 lg:h-36 xl:w-28 xl:h-40 rounded-xl bg-card shadow-lg border border-border flex flex-col items-center justify-center p-2">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="mt-2 h-5 w-5 rounded-full" />
    </div>
);

export default DummyParticipantCard;
