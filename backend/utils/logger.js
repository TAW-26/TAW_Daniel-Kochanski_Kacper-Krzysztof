import fs from "fs";
import path from "path";

const LOGS_DIR = path.join(process.cwd(), "logs");
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR);
}

// Log file paths
const errorLogPath = path.join(LOGS_DIR, "error.log");
const requestLogPath = path.join(LOGS_DIR, "request.log");

// Maximum size in bytes before rotation (e.g., 5 MB)
const MAX_LOG_SIZE = 5 * 1024 * 1024;

// Helper to rotate a log file if it exceeds the size limit
function rotateLogIfNeeded(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const { size } = fs.statSync(filePath);
      if (size >= MAX_LOG_SIZE) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const archivePath = `${filePath}.${timestamp}`;
        fs.renameSync(filePath, archivePath);
      }
    }
  } catch (e) {
    console.error("Log rotation error:", e);
  }
}

export function logError(err, req) {
  const timestamp = new Date().toISOString();
  const errorType = err.name || "Error";

  const context = {
    method: req?.method,
    url: req?.url,
    query: req?.query,
    body: req?.body,
    headers: req?.headers,
    stack: err.stack,
  };

  const logMessage = `[${timestamp}] TYPE: ${errorType} | MSG: ${err.message} | CONTEXT: ${JSON.stringify(context)}\n`;

  rotateLogIfNeeded(errorLogPath);
  fs.appendFile(errorLogPath, logMessage, (writeErr) => {
    if (writeErr) {
      console.error("Failed to write to error log:", writeErr);
    }
  });
}

export function logRequest(req, res, durationMs) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${req.method} ${req.url} - Status: ${res.statusCode} - Time: ${durationMs}ms\n`;

  rotateLogIfNeeded(requestLogPath);
  fs.appendFile(requestLogPath, logMessage, (writeErr) => {
    if (writeErr) {
      console.error("Failed to write to request log:", writeErr);
    }
  });
}
