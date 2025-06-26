import RoomClient from "./RoomClient";

const Page = async ({ params }: { params: Promise<{ roomId: string }> }) => {
    const { roomId } = await params;
    const extractedRoomId = roomId.substring(0, 12);

    return <RoomClient roomId={extractedRoomId} />;
};

export default Page;
