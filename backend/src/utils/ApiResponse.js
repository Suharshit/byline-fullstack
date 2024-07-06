class ApiResponse {
    constructor(
        data,
        status,
        message = "Success",
        success = true
    ) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = status < 400 || success;
    }
}

export { ApiResponse }