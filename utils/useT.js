import { useTranslation } from "../context/TranslationContext";

export function useT() {
  const { t } = useTranslation();
  return t;
}

export default useT;
