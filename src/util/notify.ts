import { Notyf } from "notyf";

export enum SccMsg {
    LOGIN_SUCCESS = "Login successful",
    COMPANY_ADDED = "Company successfully added",
    COMPANY_UPDATED = "Company successfully updated",
    COUPON_UPDATED = "Coupon successsfully updated",
    COMPANY_DELETED = "Company successfully deleted"
}

export enum ErrMsg {
    LOGIN_ERROR = "Login failed",
    GENERAL_ERROR = "Something went wrong with loading page!",
    LOGIN_AUTHORIZATION_NEEDED = "You need to be logged in to access this page!",
    COMPANY_ADD_ERROR_EXISTS = "Company already exists",
    COMPANY_NOT_FOUND = "Could not find companies matching query",
    NO_COMPANIES_EXIST = "No companies in database",
    CUSTOMER_NOT_FOUND = "Could not find customers matching query",
    NO_CUSTOMERS_EXIST = "No customers in database",
    NO_COMPANY_COUPONS = "Company doesn't have any coupon",
    NO_CUSTOMER_COUPONS = "Customer doesn't have any coupons",
    NO_COUPONS_CATEGORY = "No coupons from that category",
    NO_COUPONS_PRICE = "No coupons find at that price"
}

class Notify {
    private notification = new Notyf({
        duration: 4000,
        position: {x: "center", y: "top"}
    });

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const message = this.extractMsg(err);
        this.notification.error(message);
    }

    public extractMsg(err: any):string {
        if (typeof err === 'string') {
            return err;
        }
        if (typeof err?.response?.data === 'string') { // backend exact error (advice), ? because we can't be sure we will get it
            return err?.response?.data;
        }
        if (Array.isArray(err?.response?.data)) { // array of backend exact errors
            return err?.response?.data[0];
        }
        if (typeof err?.message === 'string') { // must be last
            return err?.message;
        }

        return "An unknown error has occured!";
    }
}

const notify = new Notify();
export default notify;
