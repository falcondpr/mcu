import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode";

const customConfig = defineConfig({
  globalCss: {
    body: {
      fontFamily: "HindMysuru",
    },
  },
});

const defaultSystemCustom = createSystem(defaultConfig, customConfig);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystemCustom}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
