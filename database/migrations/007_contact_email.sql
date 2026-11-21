-- Switch the public contact email (only if it is still the old default).
UPDATE site_settings SET setting_value = 'cyfiz.null@gmail.com'
WHERE setting_key = 'contact_email' AND setting_value = 'cyfiz@cyfiz.com';
