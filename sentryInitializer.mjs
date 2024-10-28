import * as Sentry from "@sentry/node";
import {config} from './app/config/config.js'

Sentry.init({
  dsn: config.sentryDns,

  // Disables all transactions and leaves only capturing of the errors
  tracesSampleRate: 0.0
});