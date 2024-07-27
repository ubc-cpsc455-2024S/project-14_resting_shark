import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LessonCard from "../LessonCard";
import * as React from "react";

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
  test("renders Lesson component with props", () => {
    render(
      <Router>
        <LessonCard lesson={mockLesson} isFirst={true} />
      </Router>
    );

    expect(screen.getByText("Test Lesson")).toBeInTheDocument();
    expect(screen.getByText("10 questions")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getAllByText("GoHeartFill")).toHaveLength(2);
    expect(screen.getAllByText("LuDot")).toHaveLength(1);
  });

  test("navigates to the correct lesson path on click", () => {
    const { container } = render(
      <Router>
        <LessonCard lesson={mockLesson} isFirst={true} />
      </Router>
    );

    expect(container.querySelector("a")).toHaveAttribute("href", "/lesson/123");
  });
});
