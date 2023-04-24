import React, { useState, useEffect } from 'react';

const Login = () => {
    const [identifierType, setIdentifierType] = useState('EMAIL');
    const [brand, setBrand] = useState('SABREDEMO');
    const [identifierValue, setIdentifierValue] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [sessionId, setSessionID] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const [otpGenerated, setOtpGenerated] = useState(false);

    const [otp, setOtp] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send registration data to backend API
        const response = await fetch('https://apac-s3wrapper.capillarytech.com/auth/v1/web/token/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifierType, identifierValue, brand, password,confirmPassword })
        });
        const data = await response.json();
        console.log(data);
        // Handle response from backend API
        if (response.ok) {
            // Registration successful
            setErrorMessage('');
            // setIdentifierValue('');
            setPassword('');
            setConfirmPassword('');
            // Registration successful, set session ID

            console.log('Seesion ID sett: ',data.user.sessionId)
            setSessionID(data.user.sessionId);
            // setAccessToken(data.auth.token);
            sessionStorage.setItem('sessionId', sessionId);
            console.log('Session ID:', sessionId); // Debugging statement
            // setOtpGenerated(true);
        } else {
            // Registration failed
            setErrorMessage(data.status.message);
        }
    };

    useEffect(() => {
        if (sessionId) {
            // Send OTP generate request to backend API
            // handleOtpGenerate();
            sessionStorage.setItem('sessionId', sessionId);
            console.log('handleOtpGenerate Session ID:', sessionId); // Debugging statement
            async function fetchData() {
                try {
                    const response = await fetch('https://apac-s3wrapper.capillarytech.com/auth/v1/web/otp/generate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer ${accessToken}`,
                            // 'sessionId': sessionId
                        },
                        body: JSON.stringify({ identifierType, identifierValue, brand, sessionId })
                    });

                    const data = await response.json();
                    console.log(data);
                    // Handle response from backend API
                    if (response.ok) {
                        // OTP generated successfully
                        setErrorMessage('');
                        setOtpGenerated(true);
                        sessionStorage.setItem('sessionId', sessionId);
                    } else {
                        // OTP generation failed
                        console.log('OTP GENERATE MESSAGE: ',data.status.message)
                        setErrorMessage(data.status.message);
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            fetchData();
            // Handle OTP generate response

            // ...
        }
    }, [sessionId]);

  /*  const handleOtpGenerate = async() => {
        console.log('handleOtpGenerate Session ID:', sessionId); // Debugging statement
        const response = await fetch('https://apac-s3wrapper.capillarytech.com/auth/v1/web/otp/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken}`,
                // 'X-Session-ID': sessionId
            },
            body: JSON.stringify({ identifierType, identifierValue, brand, sessionId })
        });

        const data = await response.json();
        console.log(data);
        // Handle response from backend API
        if (response.ok) {
            // OTP generated successfully
            setErrorMessage('');
            setOtpGenerated(true);
            sessionStorage.setItem('sessionId', sessionId);
        } else {
            // OTP generation failed
            console.log('OTP GENERATE MESSAGE: ',data.status.message)
            setErrorMessage(data.status.message);
        }
    }*/

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        // Send OTP data to backend API
        const response = await fetch('https://apac-s3wrapper.capillarytech.com/auth/v1/web/otp/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken}`,
                // 'X-Session-ID': sessionId
            },
            body: JSON.stringify({ identifierType,identifierValue,brand,sessionId,otp })
        });
        const data = await response.json();
        console.log(data);
        // Handle response from backend API
        if (response.ok) {
            // OTP generated successfully
            setErrorMessage('');
            // setOtpSent(true);
        } else {
            // OTP generation failed
            console.log('OTP Validate MESSAGE: ',data.status.message)
            setErrorMessage(data.status.message);
        }
    };

    return (
        <div className='card'>
            {/*{sessionId && (*/}
            {/*    <form onSubmit={handleOtpGenerate}>*/}
            {/*        /!* OTP generate form fields *!/*/}
            {/*    </form>*/}
            {/*)}*/}
            {otpGenerated ? (
                <form onSubmit={handleOtpSubmit}>
                    <label>
                        Enter OTP:
                        <input className='input input-bordered w-full max-w-xs' type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </label>
                    <button className='btn btn-secondary' type="submit">Submit</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input className='form-control input input-bordered w-full max-w-xs' type="email" placeholder="Email" value={identifierValue} onChange={(e) => setIdentifierValue(e.target.value)} />
                    <input className='form-control input input-bordered w-full max-w-xs' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input className='form-control input input-bordered w-full max-w-xs' type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />


                    <button className='btn btn-primary' type="submit">Register</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
                )}
        </div>
    );
};

export default Login;
