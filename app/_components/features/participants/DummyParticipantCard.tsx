import { Skeleton } from "@/app/_components/ui/base/Skeleton";

const DummyParticipantCard = () => (
    <div className="w-12 h-18 md:w-16 md:h-24 lg:w-20 lg:h-30 xl:w-24 xl:h-36 rounded-xl bg-card shadow-lg border border-border flex flex-col items-center justify-center p-2">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="mt-2 h-5 w-5 rounded-full" />
    </div>
);

export default DummyParticipantCard;
