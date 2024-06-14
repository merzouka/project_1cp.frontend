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
    getDrawing: "drawing",
    participants: "participants_tirage",
    drawingSettings: "associate-tirage",
    drawingResult: "fetch-winners",
    // profile
    profile: (id: number | string) => `profile/${id}`,
    profileUpdate: "auth/update-profile",
    currentUser : "auth/currently_user",
    // appointment
    appointmentWinners: "winners_by_baladiya",
    appointmentStatusUpdate: "visite_status/",
    // payment
    paymentWinners: "winners_accepted/",
    paymentStatusUpdate: "payment_status/",
    // roles
    users: (params: URLSearchParams) => `administrateur/list?${params.toString()}`,
    assignPrivilege: "",
    // flights
    flights: 'administrateur/voles-list',
    createFlight: 'administrateur/add-vole',
    // hotels
    hotels: "administrateur/hotels-list",
    // hodjadj
    getHodjadj: 'bookings/hodjadj',
    assignHadj: 'bookings/haaj',
}
