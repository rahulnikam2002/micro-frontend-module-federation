import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders remote app", async () => {
  render(<App />);
  // Wait for the lazy-loaded remote Header to appear
  const heading = await screen.findByText(/remote/i);
  expect(heading).toBeInTheDocument();
});
