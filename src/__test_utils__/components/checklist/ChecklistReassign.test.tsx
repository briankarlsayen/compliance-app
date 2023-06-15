import {
  fireEvent,
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChecklistReassign from "../../../pages/ChecklistReassign";

describe("<ChecklistReassign />", () => {
  it("renders table", async () => {
    render(
      <MemoryRouter>
        <ChecklistReassign />
      </MemoryRouter>
    );

    expect(screen.queryByAltText("Loading")).toBeInTheDocument;
    await waitForElementToBeRemoved(screen.queryByAltText("Loading"), {
      timeout: 10000,
    });

    expect(screen.getByTestId("reassign-table")).toBeInTheDocument;
    expect(screen.getByRole("table")).toBeInTheDocument;
    expect(screen.getByRole("rowheader")).toBeInTheDocument;
    expect(screen.getAllByRole("columnheader").length).toBe(4);
    expect(screen.getByText("Back")).not.toBeDisabled;
    expect(screen.getByText("Reassign")).not.toBeDisabled;
  });
});
