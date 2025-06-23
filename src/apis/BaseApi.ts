export class BaseApi {
    readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    }
}