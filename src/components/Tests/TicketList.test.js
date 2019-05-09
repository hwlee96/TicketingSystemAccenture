import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// import TicketList from "../TicketList";

configure({ adapter: new Adapter() });

const checkIfMore7Days = a => {
  let todayDate = new Date();

  let temp = a.split("-"); // 0 returns year, 1 returns month
  let temp2 = temp[2].split(" "); //0 returns date

  // console.log(today.getFullYear() >= temp[0]);
  // console.log(today.getMonth() + 1 >= temp[1]);
  // console.log(today.getDate() - 7 >= temp2[0]);
  let dateStr = (temp[1] + "/" + temp2[0] + "/" + temp[0]).toString();
  let oldDate = new Date(dateStr);
  // console.log(oldDate);

  let timeDiff = todayDate.getTime() - oldDate.getTime();
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays >= 7;
};
// console.log("testing");
// console.log(checkIfMore7Days("2019-4-10 12:49:26"));

test("check that 18-2-1996 is more than 7 days ago", () => {
  expect(checkIfMore7Days("1996-2-18 12:49:26")).toBe(true);
});

test("check that 18-2-2020 is not more than 7 days ago", () => {
  expect(checkIfMore7Days("2020-2-18 12:49:26")).toBe(false);
});

let today = new Date();
let time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let date =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  today.getDate() +
  " " +
  time;

test("today is not more than 7 days ago", () => {
  expect(checkIfMore7Days(date)).toBe(false);
});
