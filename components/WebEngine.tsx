import * as React from "react";
import {
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
  TRenderEngineConfig
} from "react-native-render-html";
import { findOne } from "domutils";

const selectDomRoot: TRenderEngineConfig["selectDomRoot"] = (node) =>
  findOne((e) => e.name === "article", node.children, true);

const ignoredDomTags = ["button"];

export default function WebEngine({ children }: React.PropsWithChildren<{}>) {
  // Every prop is defined outside of the function component.
  // This is important to prevent extraneous rebuilts of the engine.
  return (
    <TRenderEngineProvider
      ignoredDomTags={ignoredDomTags}
      selectDomRoot={selectDomRoot}
    >
      <RenderHTMLConfigProvider enableExperimentalMarginCollapsing>
        {children}
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
}
