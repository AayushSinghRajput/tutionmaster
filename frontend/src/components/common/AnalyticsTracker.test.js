import { render, act } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import AnalyticsTracker from "./AnalyticsTracker";
import { trackPageView } from "../../analytics/googleAnalytics";
import { trackMetaPageView } from "../../analytics/metaPixel";

jest.mock("../../analytics/googleAnalytics", () => ({
  trackPageView: jest.fn(),
}));

jest.mock("../../analytics/metaPixel", () => ({
  trackMetaPageView: jest.fn(),
}));

const RouteHarness = () => {
  const navigate = useNavigate();

  return (
    <>
      <AnalyticsTracker />
      <button type="button" onClick={() => navigate("/teachers?subject=math")}>
        Go Teachers
      </button>
    </>
  );
};

describe("AnalyticsTracker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("skips Meta Pixel PageView on initial mount and tracks subsequent SPA navigations", () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={["/"]}>
        <RouteHarness />
      </MemoryRouter>
    );

    expect(trackPageView).toHaveBeenCalledTimes(1);
    expect(trackPageView).toHaveBeenCalledWith("/");
    expect(trackMetaPageView).not.toHaveBeenCalled();

    act(() => {
      getByRole("button", { name: "Go Teachers" }).click();
    });

    expect(trackPageView).toHaveBeenCalledTimes(2);
    expect(trackPageView).toHaveBeenLastCalledWith("/teachers?subject=math");
    expect(trackMetaPageView).toHaveBeenCalledTimes(1);
  });
});
