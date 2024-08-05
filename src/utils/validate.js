export const checkVaidData = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);

    let errorMsg;
    if(!isEmailValid) {
        errorMsg = 'Email is invalid';
        return errorMsg;
    }

    if(!isPasswordValid) {
        errorMsg = 'Password is not valid';
        return errorMsg;
    }

    return null;
}