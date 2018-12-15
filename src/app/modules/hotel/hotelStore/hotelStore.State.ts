export class State {
    constructor(
        hotelName: string,
        hotelAddress: {
            street: string,
            city: string,
            state: string,
            pin: string,
            country: string
        },
        imageUrls: {
            img1: string,
            img2: string,
            img3: string
        },
        managerEmail: string,
        hotelRegistrationNumber: string,
        hotelPrice: string,
        hotelCategory: string,
        hotelRoomCount: string,
        hotelFeatures: {
            ac: boolean,
            wifi: boolean,
            food: boolean
        },
        hotelAverageRating: Number,
        hotelReviews: [{
            customerName: string,
            customerEmail: string,
            review: string,
            reply: string
        }],
        hotelDiscount: {
            type: Number
        }
    ) {}
}

export interface Amenities {
    ac: boolean;
    wifi: boolean;
    food: boolean;
}
export interface AuthState {
    token: string;
    authenticated: boolean;
    decoded: Object;
    name: string;
    email: string;
    booked: boolean;
    viewed: boolean;
    admin: boolean;
    adminUpdate: boolean;
    editProfile: boolean;
    manager: boolean;
}


