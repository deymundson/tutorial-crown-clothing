/// <reference types="vite/client" />
declare module "*.svg?react" {
  import { FC } from "react";
  const ReactComponent: FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
