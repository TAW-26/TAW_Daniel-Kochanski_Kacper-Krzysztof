import {
  httpRequestsTotal,
  httpRequestDurationMs,
  activeConnections,
} from "../metrics/index.js";
import { logRequest } from "../utils/logger.js";

export function metricsMiddleware(req, res, next) {
  const startMs = Date.now();
  activeConnections.inc();

  res.on("finish", () => {
    const durationMs = Date.now() - startMs;
    const route = req.route?.path ?? req.path; // wzorzec trasy Express (np. /cars/:id), a nie konkretne ID
    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode),
    };

    httpRequestsTotal.inc(labels);
    httpRequestDurationMs.observe(labels, durationMs);
    logRequest(req, res, durationMs);
    activeConnections.dec();
  });

  next();
}
