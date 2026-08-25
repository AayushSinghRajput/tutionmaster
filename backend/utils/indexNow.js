const https = require("https");
const logger = require("./logger");

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY;
const INDEXNOW_HOST = process.env.INDEXNOW_HOST || "www.tuitionmaster.guru";
const INDEXNOW_PROTOCOL = process.env.INDEXNOW_PROTOCOL || "https";

function buildUrl(path) {
  if (!path) return null;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${INDEXNOW_PROTOCOL}://${INDEXNOW_HOST}${normalizedPath}`;
}

/**
 * Notify IndexNow that one or more public URLs have changed.
 *
 * IndexNow failures are intentionally non-blocking.
 * A failed IndexNow request must never cause a successful
 * teacher profile operation to fail.
 *
 * @param {string|string[]} urls
 * @returns {Promise<void>}
 */
async function notifyIndexNow(urls) {
  if (!INDEXNOW_API_KEY) {
    logger.warn(
      "IndexNow skipped: INDEXNOW_API_KEY is not configured",
    );
    return;
  }

  const normalizedUrls = Array.isArray(urls) ? urls : [urls];

  const validUrls = normalizedUrls
    .filter(Boolean)
    .map(buildUrl)
    .filter(Boolean);

  if (!validUrls.length) {
    return;
  }

  const payload = JSON.stringify({
    host: INDEXNOW_HOST,
    key: INDEXNOW_API_KEY,
    keyLocation: `${INDEXNOW_PROTOCOL}://${INDEXNOW_HOST}/${INDEXNOW_API_KEY}.txt`,
    urlList: validUrls,
  });

  return new Promise((resolve) => {
    const request = https.request(
      INDEXNOW_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(payload),
        },
        timeout: 10000,
      },
      (response) => {
        let body = "";

        response.on("data", (chunk) => {
          body += chunk;
        });

        response.on("end", () => {
          if (
            response.statusCode >= 200 &&
            response.statusCode < 300
          ) {
            logger.info(
              `IndexNow notification successful: ${validUrls.join(", ")}`,
            );
          } else {
            logger.warn(
              `IndexNow notification failed (${response.statusCode}): ${body}`,
            );
          }

          resolve();
        });
      },
    );

    request.on("timeout", () => {
      request.destroy();

      logger.warn("IndexNow notification timed out");

      resolve();
    });

    request.on("error", (error) => {
      logger.warn(
        `IndexNow notification error: ${error.message}`,
      );

      resolve();
    });

    request.write(payload);
    request.end();
  });
}

/**
 * Generate the public URL of a teacher profile.
 *
 * @param {string|Object} teacherId
 * @returns {string}
 */
function getTeacherUrl(teacherId) {
  const id = teacherId?.toString();

  if (!id) {
    return null;
  }

  return buildUrl(`/teachers/${id}`);
}

module.exports = {
  notifyIndexNow,
  getTeacherUrl,
};