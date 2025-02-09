"use client";
import { Button } from "@/app/_components/uiparts/Button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/uiparts/Card";
import EditNameDialog from "@/app/_components/uiparts/EditNameDialog";
import Header from "@/app/_components/uiparts/Header";
import HorizontalLine from "@/app/_components/uiparts/HorizontalLine";
import { Input } from "@/app/_components/uiparts/input";
import { nameNotSet, userNameAtom } from "@/app/_lib/atoms";
import { createClient } from "@/utils/supabase/client";
import { useAtom } from "jotai/index";
import { useRouter } from "next/navigation";
import React, { type KeyboardEventHandler, useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

const Page = () => {
    const router = useRouter();
    const [roomId, setRoomId] = useState<string>("");
    const [userName, setUserName] = useAtom(userNameAtom);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const isValid = () =>
        !!roomId && !/\s/.test(roomId) && !roomId.includes("/");

    const enter = (roomId: string) => router.push(`/rooms/${roomId}`);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.key === "Enter" && isValid()) {
            enter(roomId);
        }
    };

    const supabase = createClient();
    useEffect(() => {
        supabase.auth.getUser().then((user) => {
            if (user) {
                setUserName(
                    user.data.user?.user_metadata.display_name || nameNotSet,
                );
            }
        });
    }, []);

    return (
        <>
            <div className="absolute w-full">
                <Header
                    userName={userName}
                    onTapUserName={() => setIsDialogOpen(true)}
                />
            </div>
            <div className="h-screen bg-pink-50 flex flex-col items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Join room
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-flow-col gap-4">
                            <Input
                                maxLength={12}
                                className="h-12 border-gray-200"
                                type="text"
                                placeholder="Room ID"
                                onChange={(event) =>
                                    setRoomId(event.target.value)
                                }
                                onKeyDown={handleKeyDown}
                            />
                            <Button
                                size="icon"
                                disabled={!isValid()}
                                onClick={() => enter(roomId)}
                                className="h-12 w-12"
                            >
                                <BiCheck />
                            </Button>
                        </div>
                    </CardContent>
                    <CardContent>
                        <HorizontalLine innerText="or" />
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={() =>
                                enter(Math.random().toString(32).substring(6))
                            }
                            className="w-full"
                            size="xlg"
                        >
                            Create new room
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <EditNameDialog
                isOpen={isDialogOpen}
                onSubmit={async (candidate: string) => {
                    setUserName(candidate);
                    await supabase.auth.updateUser({
                        data: { display_name: candidate },
                    });
                }}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    );
};
export default Page;
