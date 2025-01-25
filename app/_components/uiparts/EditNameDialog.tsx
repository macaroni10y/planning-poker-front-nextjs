import TheButton from "@/app/_components/uiparts/TheButton";
import { Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
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
                    <input
                        maxLength={15}
                        className="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-300"
                        type="text"
                        placeholder="input name"
                        onChange={(event) =>
                            setNameCandidate(event.target.value)
                        }
                    />
                    <TheButton
                        isActive={isValid(nameCandidate)}
                        className="w-10 h-10"
                        onClick={handleSubmit}
                        text="→"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditNameDialog;
