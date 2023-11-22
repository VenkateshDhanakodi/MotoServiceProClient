import React, {useEffect } from 'react'
import { port } from '../../App';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordRouting = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        const tokenResponse = async () => {
            try {
                // console.log(token);
                // const response = await axios.get(`${port}/resetPassword/Bearer ${token}`);
                // console.log(response);
                // Checking if the status code is 200 (OK) then navigating to Update password page for updating password
                // if (response.status === 200) {
                    navigate(`/updatePassword/${token}`);
                // } else {
                //     console.log('Error in token Validation');
                // }
            } catch (err) {
                // toast.error(err.response.data.message);
                console.error("Login Failed:", err);
            }
        }
        tokenResponse();
    }, [token, navigate]);

    return <div style={{margin: "5em", backgroundColor: "CaptionText"}}>Routing to update the password</div>;
};

export default ResetPasswordRouting;