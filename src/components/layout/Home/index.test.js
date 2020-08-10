import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import Home from ".";
import { AppContextProvider } from "../../../contexts";

beforeEach(cleanup);

describe("<Home />", () => {
  test("should render", () => {
    const { queryByTestId, debug } = render(
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    );
    debug();
  });
});
