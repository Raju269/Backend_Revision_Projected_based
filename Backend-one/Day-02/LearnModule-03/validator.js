function isValidEmail(email){
    return email.includes('@') && email.includes('.');
}

function isValidPhone(phone){
    return phone.length === 10 && !isNaN(phone);
}

function isStrongPassword(Password){
    return Password.length >= 8;
}

export {isStrongPassword,isValidEmail,isValidPhone};