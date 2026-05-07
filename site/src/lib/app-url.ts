// Centralna definicja URL aplikacji BusiKM. Na czas pilotażu MVP używamy staging.
// Po deploy produkcyjnym (DNS busikm.pl + app.busikm.pl) zmień APP_URL na
// 'https://app.busikm.pl' — wszystkie CTA przepną się jednocześnie.
export const APP_URL = 'https://staging.busikm.pl';

// Login/Register routes na app — używane w CTA "Wypróbuj demo" / "Zaloguj się".
export const APP_LOGIN_URL = `${APP_URL}/login/`;
export const APP_PILOT_REGISTER_URL = `${APP_URL}/pilot/register/`;
