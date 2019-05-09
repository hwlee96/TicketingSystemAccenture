import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LoginPage from "../LoginPage";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const tree = renderer.create(<LoginPage />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a usernameinput", () => {
  expect(shallow(<LoginPage />).find("#username-jest").length).toEqual(1);
});

it("renders a password input", () => {
  expect(shallow(<LoginPage />).find("#password-jest").length).toEqual(1);
});

describe("Username input test", () => {
  it("should respond to change event and change the state of the LoginPage Component", () => {
    const wrapper = shallow(<LoginPage />);
    wrapper.find("#username-jest").simulate("change", {
      target: { name: "username", value: "blah@gmail.com" }
    });
    expect(wrapper.state("username")).toEqual("blah@gmail.com");
  });
});

describe("Password input test", () => {
  it("should respond to change event and change the state of the LoginPage Component", () => {
    const wrapper = shallow(<LoginPage />);
    wrapper.find("#password-jest").simulate("change", {
      target: { name: "password", value: "blahblah" }
    });
    expect(wrapper.state("password")).toEqual("blahblah");
  });
});
