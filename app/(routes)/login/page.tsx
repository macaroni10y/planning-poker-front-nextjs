"use client";
import { useActionState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Header from "@/app/_components/ui/layout/Header";
import { loginAnonymously } from "@/app/(routes)/login/action";
import "react-toastify/dist/ReactToastify.css";
import ThemeSelector from "@/app/_components/features/voting/ThemeSelector";
import { Button } from "@/app/_components/ui/base/Button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/base/Card";
import { Input } from "@/app/_components/ui/base/Input";
import HeaderItem from "@/app/_components/ui/layout/HeaderItem";

const Page = () => {
    const [state, formAction, pending] = useActionState(loginAnonymously, {
        message: "",
    });

    useEffect(() => {
        if (state.message) {
            toast.error(state.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [state]);

    return (
        <>
            <div className="absolute w-full">
                <Header>
                    <HeaderItem>
                        <ThemeSelector />
                    </HeaderItem>
                </Header>
            </div>
            <div className="h-screen bg-background flex justify-center items-center">
                <Card className="w-2/3 max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Sign In
                        </CardTitle>
                    </CardHeader>
                    <form>
                        <CardContent>
                            <label
                                className="m-1 text-xs text-left w-full"
                                htmlFor="nickname"
                            >
                                Nickname
                            </label>
                            <Input
                                maxLength={24}
                                className="full text-xs h-10 py-2 px-4"
                                type="text"
                                name="nickname"
                                placeholder="John Doe"
                                required={true}
                            />
                        </CardContent>
                        <CardFooter>
                            <FormButton
                                className="w-full"
                                formAction={formAction}
                                pending={pending}
                            />
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <ToastContainer
                className={"absolute"}
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
};

interface FormButtonProps {
    formAction: (formData: FormData) => void;
    pending?: boolean;
    className?: string;
}

const FormButton = (props: FormButtonProps) => {
    return (
        <Button
            size="xlg"
            className={props.className}
            formAction={props.formAction}
            disabled={props.pending}
        >
            Continue
        </Button>
    );
};

export default Page;
