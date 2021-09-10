import React from 'react'
import renderer from 'react-test-renderer'
import { EBOOKS } from '../../shared/ebooks'
import { ORDERS } from '../../shared/orders'
import { REVIEWS } from '../../shared/reviews'
import { SALES } from '../../shared/sales'
import { HomeDisplay } from '../userpages/HomeComponent'
import { DashBoard } from '../adminpages/AdminComponent'
import { StaticRouter } from 'react-router-dom'
import UserTemplate from '../templates/UserTemplate'
import AdminTemplate from '../templates/AdminTemplate'
import { LoginDisplay } from '../otherpages/LoginComponent'
import { SignupDisplay } from '../otherpages/SignupComponent'

// Mock Data General Function
const mockData = (loading, content) => ({
  isLoading: loading,
  errMess: null,
  content: loading ? [] : content
})

// Static Route renderer
const staticRender = (component) => {
  return renderer.create(<StaticRouter>{component}</StaticRouter>)
}

// NOTE: react-test-renderer doesn't want to create snapshot for modal, issue still open on Github

describe('Testing snapshots', () => {
  test('Login Page', () => {
    const component = staticRender(<LoginDisplay />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('Sign Up Page', () => {
    const component = staticRender(<SignupDisplay />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('User Page Template', () => {
    const component = staticRender(<UserTemplate />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('Admin Page Template', () => {
    const component = staticRender(<AdminTemplate selectedIndex={0} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('Home Page: Loading', () => {
    const component = staticRender(
      <HomeDisplay
        selectedReview={null}
        isOpen={false}
        ebooks={mockData(true, null)}
        reviews={mockData(true, null)}
        handleOpen={() => {}}
        handleClose={() => {}}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('Home Page: Loaded', () => {
    const component = staticRender(
      <HomeDisplay
        selectedReview={null}
        isOpen={false}
        ebooks={mockData(false, EBOOKS)}
        reviews={mockData(false, REVIEWS)}
        handleOpen={() => {}}
        handleClose={() => {}}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('Admin Dashboard: Loading', () => {
    const component = staticRender(
      <DashBoard
        ebooks={mockData(true, null)}
        orders={mockData(true, null)}
        sales={mockData(true, null)}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('Admin Dashboard: Loaded', () => {
    const component = staticRender(
      <DashBoard
        ebooks={mockData(false, EBOOKS)}
        orders={mockData(false, ORDERS)}
        sales={mockData(false, SALES)}
      />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
