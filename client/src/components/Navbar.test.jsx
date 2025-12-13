import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

vi.mock("../context/AuthContext.jsx", () => ({
  useAuth: () => ({ isAuthed: false, logout: vi.fn() })
}));

describe("Navbar", () => {
  it("shows Sign In / Sign Up when logged out", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Sign In")).toBeTruthy();
    expect(screen.getByText("Sign Up")).toBeTruthy();
  });
});