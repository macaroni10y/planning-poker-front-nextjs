import { UserIcon } from "@storybook/icons";
import { useState } from "react";
import { Button } from "@/app/_components/ui/base/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/base/Dialog";
import { Input } from "@/app/_components/ui/base/Input";

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
            <DialogContent className="bg-white">
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
