import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StaticRouter } from "react-router-dom";
import Signup from "../otherpages/SignupComponent";

const errorRE = new RegExp(
  [
    "(Firstname must not be empty)|",
    "(Lastname must not be empty)|",
    "(Please provide a valid email)|",
    "(Password must include a number, a capital letter, and at least 8 characters)|",
    "(Retype password must match)",
  ].join("")
);

const signUpCombo = (
  firstname,
  lastname,
  email,
  password,
  passwordRetype,
  agree
) => {
  render(
    <StaticRouter>
      <Signup />
    </StaticRouter>
  );
  fireEvent.change(screen.getByRole("firstname"), {
    target: { value: firstname },
  });
  fireEvent.change(screen.getByRole("lastname"), {
    target: { value: lastname },
  });
  fireEvent.change(screen.getByRole("email"), { target: { value: email } });
  fireEvent.change(screen.getByRole("password"), {
    target: { value: password },
  });
  fireEvent.change(screen.getByRole("passwordRetype"), {
    target: { value: passwordRetype },
  });
  if (agree) {
    fireEvent.click(screen.getByRole("agree"));
  }
  fireEvent.click(screen.getByRole("submitButton"));
};

describe("Sign up validation", () => {
  test("Valid Case", () => {
    signUpCombo(
      "John",
      "Doe",
      "johndoe@gmail.com",
      "Password123",
      "Password123",
      true
    );
    expect(screen.queryAllByText(errorRE)).toHaveLength(0);
    expect(
      screen.getByText("You must agree to our agreement")
    ).not.toBeVisible();
  });
  test("Empty Firstname", () => {
    signUpCombo(
      "",
      "Doe",
      "johndoe@gmail.com",
      "Password123",
      "Password123",
      true
    );
    expect(screen.queryAllByText(errorRE)).toHaveLength(1);
    expect(
      screen.getByText("You must agree to our agreement")
    ).not.toBeVisible();
  });
  test("Empty Lastname", () => {
    signUpCombo(
      "John",
      "",
      "johndoe@gmail.com",
      "Password123",
      "Password123",
      true
    );
    expect(screen.queryAllByText(errorRE)).toHaveLength(1);
    expect(
      screen.getByText("You must agree to our agreement")
    ).not.toBeVisible();
  });
  test("Invalid Email", () => {
    signUpCombo("John", "Doe", "johndoe@", "Password123", "Password123", true);
    expect(screen.queryAllByText(errorRE)).toHaveLength(1);
    expect(
      screen.getByText("You must agree to our agreement")
    ).not.toBeVisible();
  });
  test("Invalid password", () => {
    signUpCombo(
      "John",
      "Doe",
      "johndoe@gmail.com",
      "password",
      "password",
      true
    );
    expect(screen.queryAllByText(errorRE)).toHaveLength(1);
    expect(
      screen.getByText("You must agree to our agreement")
    ).not.toBeVisible();
  });
  test("Invalid Retype password", () => {
    signUpCombo(
      "John",
      "Doe",
      "johndoe@gmail.com",
      "Password123",
      "password",
      true
    );
    expect(screen.queryAllByText(errorRE)).toHaveLength(1);
    expect(
      screen.getByText("You must agree to our agreement")
    ).not.toBeVisible();
  });
  test("Invalid Agree", () => {
    signUpCombo(
      "John",
      "Doe",
      "johndoe@gmail.com",
      "Password123",
      "Password123",
      false
    );
    expect(screen.queryAllByText(errorRE)).toHaveLength(0);
    expect(screen.getByText("You must agree to our agreement")).toBeVisible();
  });
});
