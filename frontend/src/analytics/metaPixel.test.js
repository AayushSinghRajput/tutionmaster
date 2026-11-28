import {
  META_PIXEL_ID,
  trackMetaPageView,
  trackMetaEvent,
  trackMetaCustomEvent,
} from "./metaPixel";

describe("metaPixel analytics helper", () => {
  afterEach(() => {
    delete window.fbq;
  });

  test("exports the configured Meta Pixel ID", () => {
    expect(META_PIXEL_ID).toBe("1089127377466763");
  });

  test("does not throw when window.fbq is unavailable", () => {
    expect(() => trackMetaPageView()).not.toThrow();
    expect(() => trackMetaEvent("Lead", { content_name: "Math" })).not.toThrow();
    expect(() => trackMetaCustomEvent("TutorInquiry")).not.toThrow();
  });

  test("forwards PageView, standard, and custom events to window.fbq", () => {
    const fbqMock = jest.fn();
    window.fbq = fbqMock;

    trackMetaPageView();
    trackMetaEvent("CompleteRegistration", { status: "success" });
    trackMetaCustomEvent("TutorProfileViewed", { teacherId: "123" });

    expect(fbqMock).toHaveBeenNthCalledWith(1, "track", "PageView");
    expect(fbqMock).toHaveBeenNthCalledWith(2, "track", "CompleteRegistration", {
      status: "success",
    });
    expect(fbqMock).toHaveBeenNthCalledWith(3, "trackCustom", "TutorProfileViewed", {
      teacherId: "123",
    });
  });
});
