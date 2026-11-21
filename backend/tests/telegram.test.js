const { notifyNewTutorRegistered } = require("../services/telegramService");

describe("Telegram Notification Service", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("gracefully returns false when tokens are not configured", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const result = await notifyNewTutorRegistered({
      teacher: { _id: "teacher123", name: "Test Tutor" },
      user: { email: "test@example.com" },
    });

    expect(result).toBe(false);
  });

  it("sends formatted payload to Telegram API when tokens are present", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11";
    process.env.TELEGRAM_CHAT_ID = "-1001234567890";
    process.env.ADMIN_PANEL_ORIGIN = "https://tutionmaster-adminpanel.vercel.app";

    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, result: { message_id: 999 } }),
    });
    global.fetch = mockFetch;

    const sampleTeacher = {
      _id: "64fa1234567890abcdef1234",
      name: "Sita Sharma",
      contact: { email: "sita@example.com", phone: "+9779812345678" },
      address: { city: "Kathmandu", state: "Bagmati" },
      preferredSubjects: ["Mathematics", "Physics & Chemistry <Advanced>"],
      teachingMode: "Both",
      hourlyRate: 500,
    };

    const result = await notifyNewTutorRegistered({
      teacher: sampleTeacher,
      user: { username: "sitasharma" },
    });

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe(
      "https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/sendMessage"
    );

    const body = JSON.parse(options.body);
    expect(body.chat_id).toBe("-1001234567890");
    expect(body.parse_mode).toBe("HTML");
    expect(body.text).toContain("Sita Sharma");
    expect(body.text).toContain("+9779812345678");
    expect(body.text).toContain("Physics &amp; Chemistry &lt;Advanced&gt;");
    expect(body.reply_markup.inline_keyboard[0][0].url).toBe(
      "https://tutionmaster-adminpanel.vercel.app/teachers/64fa1234567890abcdef1234"
    );
  });

  it("handles Telegram API rejection gracefully without throwing", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "invalid_token";
    process.env.TELEGRAM_CHAT_ID = "123";

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Unauthorized",
      json: async () => ({ ok: false, description: "Unauthorized" }),
    });

    const result = await notifyNewTutorRegistered({
      teacher: { _id: "t1", name: "Tutor" },
    });

    expect(result).toBe(false);
  });
});
