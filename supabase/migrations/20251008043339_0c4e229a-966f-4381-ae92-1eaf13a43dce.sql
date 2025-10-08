-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the price alerts check to run every 5 minutes
SELECT cron.schedule(
  'check-price-alerts-every-5-min',
  '*/5 * * * *',
  $$
  SELECT
    net.http_post(
        url:='https://jfvtoxxzyfxhjmposjuz.supabase.co/functions/v1/check-price-alerts',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmdnRveHh6eWZ4aGptcG9zanV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MjM2NzgsImV4cCI6MjA3NTA5OTY3OH0.vO2v-BP9-36QS4fkufUMysxHpGMemsIp7LYcZeXU1fs"}'::jsonb,
        body:=concat('{"time": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);