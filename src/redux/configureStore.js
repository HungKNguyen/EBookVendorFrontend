import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Comments } from "./comments";
import { Ebooks } from "./ebooks";
import { Orders } from "./orders";
import { Users } from "./users";
import { Reviews } from "./reviews";
import thunk from "redux-thunk";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            comments: Comments,
            ebooks: Ebooks,
            orders: Orders,
            users: Users,
            reviews: Reviews
        }),
        applyMiddleware(thunk)
    );

    return store;
}