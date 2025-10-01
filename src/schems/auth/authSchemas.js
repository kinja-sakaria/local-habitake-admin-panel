import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,40}$/;

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email')
        .max(255, 'Email must be at most 255 characters')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
        .min(12, 'Password must be at least 12 characters long.')
        .max(40, 'Password must not exceed 40 characters.')
        .matches(
            passwordRegex,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        )
        .test(
            'no-leading-trailing-whitespace',
            'Password cannot start or end with spaces',
            (value) => value && value === value.trim()
        ),
});


export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
});
export const otpSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required').length(6, 'Enter 6 digits'),
});
