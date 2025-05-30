import React from 'react';
import { render, screen } from "@testing-library/react";
import Table from "./Table";
import { useCountryStore } from "@/store/zustand";

// Test suite for Table component
describe("Table", () => {
  beforeEach(() => {
    // Reset store state before each test
    useCountryStore.setState({
      countryStats: null,
      fetch: jest.fn(),
      updateCountryStats: jest.fn()
    });
  });

  it("renders table headers", () => {
    useCountryStore.setState({
      countryStats: { tr: 2, us: 1 }
    });
    render(<Table />);
    expect(screen.getByText(/Country/i)).toBeInTheDocument();
    expect(screen.getByText(/Visits/i)).toBeInTheDocument();
  });

  it("renders country stats", () => {
    useCountryStore.setState({
      countryStats: { tr: 2, us: 1 }
    });
    render(<Table />);
    expect(screen.getByText('TR')).toBeInTheDocument();
    expect(screen.getByText('US')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it("renders loading state", () => {
    useCountryStore.setState({
      countryStats: null
    });
    render(<Table />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
