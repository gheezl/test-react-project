
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("HMAC Generator App", () => {

    beforeEach(() => {
        render(<App />);
    })

    test("renders input fields and button", () => {
        expect(screen.getByPlaceholderText("Enter String")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Secret Key (Optional)")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeDisabled();
    });

    test("enables button when input is provided", async () => {
        const input = screen.getByPlaceholderText("Enter String");
        const button = screen.getByRole('button')
        await userEvent.type(input, "test message");
        expect(button).toBeEnabled();
    });

    test("updates string input", async () => {
        const input = screen.getByPlaceholderText("Enter String");

        await userEvent.type(input, "test message");
        expect(input).toHaveValue("test message");
    });

    test("updates secret key input", async () => {
        const secretInput = screen.getByPlaceholderText("Enter Secret Key (Optional)");

        await userEvent.type(secretInput, "mysecretkey");
        expect(secretInput).toHaveValue("mysecretkey");
    });

});
