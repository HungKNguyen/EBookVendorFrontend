import React from 'react';
import renderer from 'react-test-renderer';
import {EBOOKS} from "../../shared/ebooks";
import {ORDERS} from "../../shared/orders";
import {COMMENTS} from "../../shared/comments";
import {REVIEWS} from "../../shared/reviews";
import {SALES} from "../../shared/sales";
import {USERS} from "../../shared/users";
import {HomeDisplay, ReviewModal} from "../userpages/HomeComponent";
import {DashBoard} from "../adminpages/AdminComponent";
import {StaticRouter} from "react-router-dom";
import UserTemplate from "../templates/UserTemplate";
import AdminTemplate from "../templates/AdminTemplate";

//Mock Data General Function
const mockData = (loading, content) => ({
    isLoading: loading,
    errMess: null,
    content: loading ? [] : content
})

//Static Route renderer
const staticRender = (component) => {
    return renderer.create(
        <StaticRouter>
            {component}
        </StaticRouter>
    )
}

//NOTE: react-test-renderer doesn't want to create snapshot for modal, issue still open on Github

describe('Testing snapshots', () => {
    test('User Page Template', () => {
        const component = staticRender(
            <UserTemplate />
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Admin Page Template', () => {
        const component = staticRender(
            <AdminTemplate selectedIndex={0} />
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
    test('Home Page: Loading', () => {
        const component = staticRender(
            <HomeDisplay selectedReview={null} isOpen={false}
                         ebooks={mockData(true, null)} reviews={mockData(true, null)}
                         handleOpen={() => {}} handleClose={() => {}}/>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Home Page: Loaded', () => {
        const component = staticRender(
            <HomeDisplay selectedReview={null} isOpen={false}
                         ebooks={mockData(false, EBOOKS)} reviews={mockData(false, REVIEWS)}
                         handleOpen={() => {}} handleClose={() => {}}/>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('Admin Dashboard: Loading', () => {
        const component = staticRender(
            <DashBoard ebooks={mockData(true, null)} orders={mockData(true, null)}
                       sales={mockData(true, null)}/>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()
    });
    test('Admin Dashboard: Loaded', () => {
        const component = staticRender(
            <DashBoard ebooks={mockData(false, EBOOKS)} orders={mockData(false, ORDERS)}
                       sales={mockData(false, SALES)}/>
        )
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()
    });
})