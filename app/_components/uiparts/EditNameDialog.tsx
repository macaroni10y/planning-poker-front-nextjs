import { Button } from "@/app/_components/uiparts/Button";
import { Input } from "@/app/_components/uiparts/input";
import { Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";

interface Props {
    isOpen: boolean;
    onSubmit: (value: string) => void;
    onClose: () => void;
}
const EditNameDialog = (props: Props) => {
    const [nameCandidate, setNameCandidate] = useState<string>("");
    const isValid = (nameCandidate: string) => !!nameCandidate;

    const handleSubmit = () => {
        if (!isValid(nameCandidate)) return;
        props.onSubmit(nameCandidate);
        setNameCandidate("");
        props.onClose();
    };

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogContent>
                <div
                    onClick={props.onClose}
                    onKeyDown={props.onClose}
                    className="absolute top-1 right-1 cursor-pointer"
                >
                    <IoCloseSharp />
                </div>
                <div className="flex justify-center items-center">
                    <Input
                        maxLength={15}
                        className="w-2/3 py-2 px-4"
                        type="text"
                        placeholder="input name"
                        onChange={(event) =>
                            setNameCandidate(event.target.value)
                        }
                    />
                    <Button
                        size="icon"
                        disabled={!isValid(nameCandidate)}
                        onClick={handleSubmit}
                        className="ml-4"
                    >
                        <BiCheck />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditNameDialog;
