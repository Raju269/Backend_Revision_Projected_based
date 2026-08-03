function isValidEmail(email){
    return email.includes('@') && email.includes('.');
}

function isValidPhone(phone){
    return phone.length === 10 && !isNaN(phone);
}

function isStrongPassword(password){
    return password.length >=8;

}

export {isValidEmail,isValidPhone,isStrongPassword}