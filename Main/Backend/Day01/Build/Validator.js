// Create Our Validator file 
function isValidEmail(email){
    return email.includes('@') && email.includes('.');
}
function isValidePhone(phone){
    return phone.length === 10 && !isNaN(phone);
}
function isStrongPassword(password){
    return password.length >=8;
}

export {isValidEmail, isValidePhone , isStrongPassword}; 
