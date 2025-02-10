import { Button } from "@/app/_components/uiparts/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/uiparts/Dialog";
import { Input } from "@/app/_components/uiparts/input";
import { UserIcon } from "@storybook/icons";
import React, { useState } from "react";

interface Props {
    onSubmit: (value: string) => void;
}
const EditNameDialog = (props: Props) => {
    const [nameCandidate, setNameCandidate] = useState<string>("");
    const isValid = (nameCandidate: string) => !!nameCandidate;

    const handleSubmit = () => {
        if (!isValid(nameCandidate)) return;
        props.onSubmit(nameCandidate);
        setNameCandidate("");
    };
    return (
        <Dialog>
            <DialogTrigger>
                <UserIcon size={18} color={"white"} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Name</DialogTitle>
                </DialogHeader>
                <Input
                    maxLength={15}
                    className="w-1/2 px-4 justify-self-center"
                    type="text"
                    placeholder="input name"
                    onChange={(event) => setNameCandidate(event.target.value)}
                />
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            disabled={!isValid(nameCandidate)}
                            type="button"
                            onClick={handleSubmit}
                        >
                            submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditNameDialog;
