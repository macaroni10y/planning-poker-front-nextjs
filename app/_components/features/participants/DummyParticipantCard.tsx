import { Skeleton } from "@/app/_components/ui/base/Skeleton";

const DummyParticipantCard = () => (
    <div className="flex flex-col items-center">
        <Skeleton className="w-16 h-24 sm:w-20 sm:h-30 lg:w-20 lg:h-30 xl:w-24 xl:h-36 rounded-xl shadow-lg flex flex-col items-center justify-center p-2" />
        <Skeleton className="mt-2 h-4 sm:h-5 lg:h-5 xl:h-6 rounded-md w-16 md:w-20 lg:w-24 xl:w-28" />
    </div>
);

export default DummyParticipantCard;
