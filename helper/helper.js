function parseError(error) {
    const result = {
        code: 500,
        data: null,
    };

    if (error.failure && error.failure.details) {
        result.data = error.failure.details;
    } else if (error.response) {
        result.code = error.response.status;
        result.data = error.response.data;
    } else if (error.request) {
        result.data = error.request;
    } else if (error.message) {
        result.data = error.message;
    } else {
        result.data = error.toString();
    }

    return result;
}

module.exports = parseError;