import { OpenAPIConfig, ScriptApiIndex } from 'app/SCRIPTAPIINDEX';
import { useQuasar } from 'quasar';


export let apiIndex: ScriptApiIndex;
let isInited = false;
let token = '';

const API_URL = {
  adm: {
    dev: 'https://scripts01.dev.handyfeeling.com/api/script/adm/v0',
    staging: 'https://scripts01.staging.handyfeeling.com/api/script/adm/v0',
    production: 'https://scripts01.handyfeeling.com/api/script/adm/v0'
  },
  scripter: {
    dev: 'https://scripts01.dev.handyfeeling.com/api/script/scripter/v0',
    staging: 'https://scripts01.staging.handyfeeling.com/api/script/scripter/v0',
    production: 'https://scripts01.handyfeeling.com/api/script/scripter/v0'
  },
  index: {
    dev: 'https://scripts01.dev.handyfeeling.com/api/script/index/v0',
    staging: 'https://scripts01.staging.handyfeeling.com/api/script/index/v0',
    production: 'https://scripts01.handyfeeling.com/api/script/index/v0'
  }
}

export function initApi(_token = '', server = 'production') {
  if (!isInited || token !== _token) {
    console.log('initApi');

    token = _token;
    const config: Partial<OpenAPIConfig> = {
      HEADERS: {
        Authorization: 'Bearer ' + token
      },
      BASE: (API_URL.index as any)[server]
    }
    apiIndex = new ScriptApiIndex(config);
    isInited = true;
  }
}
