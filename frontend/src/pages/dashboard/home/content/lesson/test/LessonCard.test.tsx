import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LessonCard from "../LessonCard";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Store, UnknownAction } from "@reduxjs/toolkit";

const mockStore = configureStore([]);

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-icons/lu", () => ({
  LuDot: () => <div>LuDot</div>,
}));

jest.mock("react-icons/go", () => ({
  GoHeartFill: () => <div>GoHeartFill</div>,
}));

const mockLesson = {
  _id: "123",
  name: "Test Lesson",
  lives: 2,
  totalQuestions: 10,
  completedPages: 5,
  totalPages: 10,
};

describe("LessonCard Component", () => {
  let store: Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      auth: { jwtToken: "mockToken" },
    });
  });

  test("renders Lesson component with props", () => {
    render(
      <Provider store={store}>
        <Router>
          <LessonCard lesson={mockLesson} isFirst={true} />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Test Lesson")).toBeInTheDocument();
    expect(screen.getByText("10 questions")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getAllByText("GoHeartFill")).toHaveLength(2);
    expect(screen.getAllByText("LuDot")).toHaveLength(1);
  });

  test("navigates to the correct lesson path on click", () => {
    render(
      <Provider store={store}>
        <Router>
          <LessonCard lesson={mockLesson} isFirst={true} />
        </Router>
      </Provider>
    );

    const continueButton = screen.getByText("Continue to learn");
    fireEvent.click(continueButton);

    expect(mockNavigate).toHaveBeenCalledWith("/lesson/123");
  });
});
