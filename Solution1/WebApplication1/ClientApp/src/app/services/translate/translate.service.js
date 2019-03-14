"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
function httpLoaderFactory(httpClient) {
    return new TranslateHttpLoader(httpClient, '../../../assets/i18n/', '.json');
}
exports.httpLoaderFactory = httpLoaderFactory;
//# sourceMappingURL=translate.service.js.map