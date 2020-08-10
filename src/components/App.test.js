import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { AppContextProvider } from "../contexts";

beforeEach(cleanup);

describe("<App />", () => {
  test("should render", () => {
    const { queryByTestId, debug } = render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );
    debug();
  });
});
