import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import DropdownCardStatus from "../DropdownCardStatus";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const tree = renderer.create(<DropdownCardStatus />).toJSON();
  expect(tree).toMatchSnapshot();
});
