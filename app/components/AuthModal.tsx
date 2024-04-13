"use client";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ChangeEvent, useState } from 'react';
import AuthModalInputs from './AuthModalInputs';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
    const [open, setOpen] = useState(false);

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
    })

    const renderContent = (signinContent: string, signupContent: string): string => {
        return isSignIn ? signinContent : signupContent;
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <button
                className={`${renderContent("bg-blue-400 text-white", "")} border p-1 px-4 rounded mr-3`}
                onClick={() => setOpen(!open)}
            >
                {renderContent("Sign in", "Sign up")}
            </button>
            <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="p-2 h-[600px]">
                        <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                            <p className="text-sm">
                                {renderContent("Sign In", "Create Account")}
                            </p>
                        </div>
                        <div className="ma-auto">
                            <h2 className="text-2xl font-light text-center">
                                {renderContent("Log Into Your Account", "Create Your OpenTable Account")}
                            </h2>

                            <AuthModalInputs
                                inputs={inputs}
                                handleChangeInput={handleChangeInput}
                                isSignIn={isSignIn} />

                            <button className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-100'>
                                {renderContent("Sign In", "Create an Account")}
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
