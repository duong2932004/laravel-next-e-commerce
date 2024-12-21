// src/app/i18n/index.ts
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language: string, namespace: string) => {
        if (language === "vi") {
          if (namespace === "common") {
            return await import("../../../public/locales/vi/common.json");
          }
        }
        if (language === "en") {
          if (namespace === "common") {
            return await import("../../../public/locales/en/common.json");
          }
        }
        return {};
      })
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns?: string,
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns ?? "common");
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}