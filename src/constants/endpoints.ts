export const endpoints = {
    // general
    cities: "baladiyat",
    // auth
    login: "auth/login",
    resetPassword: "auth/reset-password",
    resetPasswordEmail: "auth/reset-password-email",
    register: "auth/register",
    verificationEmail: "auth/verification-email",
    otpVerification: "auth/verify-email",
    emailUnique: "auth/email-unique",
    logout: "auth/logout",
    profileCitites: "baladiya_names_by_utilisateur",
    // drawing
    drawingDefined: "check-tirage",
    participants: "participants_tirage",
    drawingSettings: "associate-tirage",
    // profile
    profile: (id: number | string) => `profile/${id}`,
    profileUpdate: "profile/update",
    currentUser : "auth/currently_user",
}
