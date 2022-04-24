import { isWindowDefined } from '~/utils/window';

export const getApiBaseUrl = () => isWindowDefined() ? window.ENV.API_BASE_URL : '';
