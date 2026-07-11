import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "@/components/contact-form";

describe("ContactForm", () => {
  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service interested in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("renders title when showTitle is true (default)", () => {
    render(<ContactForm />);
    expect(screen.getByText(/send us a message/i)).toBeInTheDocument();
  });

  it("does not render title when showTitle is false", () => {
    render(<ContactForm showTitle={false} />);
    expect(screen.queryByText(/send us a message/i)).not.toBeInTheDocument();
  });

  it("has correct service options in dropdown", () => {
    render(<ContactForm />);

    const serviceSelect = screen.getByLabelText(/service interested in/i);
    expect(serviceSelect).toBeInTheDocument();

    const options = serviceSelect.querySelectorAll("option");
    expect(options).toHaveLength(6); // Default + 5 services
    expect(serviceSelect).toHaveValue("");
  });

  it("has correct budget options in dropdown", () => {
    render(<ContactForm />);

    const budgetSelect = screen.getByLabelText(/project budget/i);
    expect(budgetSelect).toBeInTheDocument();

    const options = budgetSelect.querySelectorAll("option");
    expect(options).toHaveLength(5); // Default + 4 budget ranges
    expect(budgetSelect).toHaveValue("");
  });

  it("has required attributes on required fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("required");
    expect(screen.getByLabelText(/service interested in/i)).toHaveAttribute(
      "required",
    );
    expect(screen.getByLabelText(/message/i)).toHaveAttribute("required");
  });

  it("does not have required attribute on optional fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/company/i)).not.toHaveAttribute("required");
    expect(screen.getByLabelText(/project budget/i)).not.toHaveAttribute(
      "required",
    );
  });

  it("has correct input types", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toHaveAttribute("type", "text");
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/company/i)).toHaveAttribute("type", "text");
  });

  it("has correct placeholder text", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/your company name/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/tell us about your project/i),
    ).toBeInTheDocument();
  });

  it("has correct textarea rows", () => {
    render(<ContactForm />);

    const messageTextarea = screen.getByLabelText(/message/i);
    expect(messageTextarea).toHaveAttribute("rows", "5");
  });
});
