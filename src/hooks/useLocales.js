import { useTranslation } from "react-i18next";

export function useLocales() {
  const { t: translation, ready } = useTranslation("ns1", {
    useSuspense: false,
  });

  const t = (l) => {
    return ready ? translation(l) : l;
  };
  return {
    t,
  };
}
