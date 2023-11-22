import React, {useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordRouting = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        const tokenResponse = async () => {
            try {
                navigate(`/updatePassword/${token}`);
            } catch (err) {
                console.error("Login Failed:", err);
            }
        }
        tokenResponse();
    }, [token, navigate]);

    return <div style={{margin: "5em", backgroundColor: "CaptionText"}}>Routing to update the password</div>;
};

export default ResetPasswordRouting;