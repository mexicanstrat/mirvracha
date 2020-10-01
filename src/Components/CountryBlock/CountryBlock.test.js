import React from 'react'
import {shallow, mount, render} from 'enzyme'
import renderer from 'react-test-renderer'
import {CountryBlock} from './CountryBlock'

describe("CountryBlock", () => {
    it("render text", ()=> {
        const props = {
            country: "USSR",
        }
        const element = renderer.create(<CountryBlock {...props} />).toJSON();

        expect(element).toMatchSnapshot();

    })
})

