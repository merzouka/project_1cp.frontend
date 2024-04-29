export const endpoints = {
    // auth
    login: "auth/login",
    resetPassword: "auth/reset-password",
    resetPasswordEmail: "auth/reset-password-email",
    register: "auth/register",
    verificationEmail: "auth/verification-email",
    otpVerification: "auth/verify-otp",
    emailUnique: "auth/email-unique",
    logout: "auth/logout",
    profileCitites: (id: number | string | undefined) => `baladiya-ids/${id}`,
    // drawing
    startDrawing: "drawing/start",
    drawingSettings: "drawing/settings",
    // profile
    profile: (id: number | string) => `profile/${id}`,
}