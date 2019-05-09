import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LinearDeterminate from "../LinearDeterminate";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const tree = renderer.create(<LinearDeterminate />).toJSON();
  expect(tree).toMatchSnapshot();
});
