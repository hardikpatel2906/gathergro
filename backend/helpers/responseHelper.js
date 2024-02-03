/*--------------- | SUCCESS RESPONSE HELPER | ---------------*/
const successResponse = (code, message, response) => {
    let data = {
        statusCode: code,
        status: true,
        message: message,
        response: response
    }
    return data;
};

/*--------------- | ALERT RESPONSE HELPER | ---------------*/
const alertResponse = (code, message, response) => {
    let data = {
        statusCode: code,
        status: false,
        message: message,
        response: response
    }
    return data;
};

/*--------------- | ERROR RESPONSE HELPER | ---------------*/
const errorResponse = (code, message, response) => {
    let data = {
        statusCode: code,
        status: false,
        message: message,
        response: response
    }
    return data;
};

module.exports = { successResponse, alertResponse, errorResponse };