import { app } from "../app";
import { clean, CleanOption } from "../cleaner";

/**
 * Настройки параметров очистки.
 */
const cleanOpt: CleanOption = {
  verbose: false,
};

/**
 * Очистка директории сборки проекта.
 * Очищаются все директории кроме директории со шрифтами, так как их конвертация занимает значительное время,
 * а сами шрифты меняются крайне редко за время разработки проекта.
 */
export const cleaner = (): void => {
  return app.gulp
    .src(app.path.clean, { read: false, allowEmpty: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.plumberNotifyHandler("Ошибка очистки директории сборки")
      )
    )
    .pipe(clean(cleanOpt));
};
