import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ChatButton from "../MyChat/ChatButton";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const tree = renderer.create(<ChatButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
