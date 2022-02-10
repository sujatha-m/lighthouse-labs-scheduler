import React from "react";
import ReactDOM from "react-dom";
import {
  render,
  cleanup,
  wait,
  fireEvent,
  getByPlaceholderText,
} from "@testing-library/react";
import Application from "components/Application";
import Empty from "components/Appointment/Empty";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await wait(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { getByText, getByAltText } = render(<Application />);

    await wait(() => getByText("Archie Cohen"));
    fireEvent.click(ReactDOM.findDOMNode(<Empty />)); //Can't find this node
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller Jones" },
    });
    fireEvent.click();
  });
});
