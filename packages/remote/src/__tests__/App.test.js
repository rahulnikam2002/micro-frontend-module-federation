import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders remote app", () => {
  render(<App />);
  expect(screen.getByText(/remote/i)).toBeInTheDocument();
});
