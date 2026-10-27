import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

test("shows the API error when the username is not found", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ message: "User not found" }),
  });

  render(<Login onLogin={jest.fn()} />);
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "unknown-user" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect((await screen.findByRole("alert")).textContent).toBe("User not found");
});
