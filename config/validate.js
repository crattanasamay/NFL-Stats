function validateUser(user) {
    if (user.email == undefined) {
        return false;
    }

    if (user.name == undefined) {
        return false;
    }
    if (user.password == undefined) {
        return false;
    }

    if (user.lastname == undefined) {
        return false;
    }

    return true
};

function validatePassword(password) {
    if (String(password).length < 5) {
        return false
    }

    if (String(password).search(/[0-9]/) < 0) {
        return false
    }

    if (String(password).search(/[a-z]/) < 0) {
        return false
    }

    if (String(password).search(/[A-Z]/) < 0) {
        return false
    }            

    return true
}

module.exports = {validateUser, validatePassword};