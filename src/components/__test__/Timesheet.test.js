import { render, screen } from "@testing-library/react";
import Timesheet from "../Timesheet";

describe("Timesheet component", () => {

  test("should render same text passed into header prop", () => {
    render(<Timesheet />);
    const tableHeader = screen.getByText("Monday");
    expect(tableHeader).toBeInTheDocument();
  });

  test("should render same text passed into header prop", () => {
    render(<Timesheet />);
    const tableHeader = screen.getByText("Sunday");
    expect(tableHeader).toBeInTheDocument();
  });

  test("renders view react text", () => {
    render(<Timesheet />);
    const textElement = screen.getByText("Total hours");
    expect(textElement).toBeInTheDocument();
  });

  test("should renders submit button", async () => {
    render(<Timesheet />);
    expect(screen.getAllByRole("button", { name: /submit/i }));
  });

  test("should renders buttons", async () => {
    render(<Timesheet />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).not.toEqual(0);
  });

  test("should renders buttons", async () => {
    render(<Timesheet />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toEqual(2);
  });

  test("should renders send button", async () => {
    render(<Timesheet />);

    expect(screen.getAllByRole("button", { name: /Today/i }));
  });

  test("should renders tables", async () => {
    render(<Timesheet />);

    expect(screen.getAllByRole("table").length).not.toEqual(0);
  });

  test("should renders tables", async () => {
    render(<Timesheet />);

    expect(screen.getAllByRole("table").length).toEqual(1);
  });
});
