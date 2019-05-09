import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import database from "../firebase/firebaseExport";

import MyChat from "../MyChat/MyChat";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const tree = renderer.create(<MyChat />).toJSON();
  expect(tree).toMatchSnapshot();
});
