import { Config } from "@remotion/cli/config";

// O headless shell não dispara requestAnimationFrame em alguns macOS recentes;
// Chrome for Testing renderiza de forma confiável em todos os ambientes testados.
Config.setChromeMode("chrome-for-testing");
Config.setEntryPoint("remotion/index.ts");
Config.setVideoImageFormat("jpeg");
Config.setConcurrency(4);
