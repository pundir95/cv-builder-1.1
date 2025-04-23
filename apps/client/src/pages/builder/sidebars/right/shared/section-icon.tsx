import type { IconProps } from "@phosphor-icons/react";
import {
  ArrowsOutLineHorizontal,
  Code,
  DiamondsFour,
  DownloadSimple,
  Info,
  Layout,
  Note,
  Palette,
  ReadCvLogo,
  ShareFat,
  TextT,
  Translate,
  TrendUp,
} from "@phosphor-icons/react";
import type { ButtonProps } from "@reactive-resume/ui";
import { Button, Tooltip } from "@reactive-resume/ui";

type MetadataKey =
  | "collapse"
  | "template"
  | "layout"
  | "typography"
  | "theme"
  | "css"
  | "page"
  | "locale"
  | "sharing"
  | "statistics"
  | "export"
  | "notes"
  | "information";

const getSectionIcon = (id: MetadataKey, props: IconProps = {}) => {
  switch (id) {
    // Left Sidebar
    case "collapse": {
      return <ArrowsOutLineHorizontal color="white" size={18} {...props} />;
    }
    case "notes": {
      return <Note color="white" size={18} {...props} />;
    }
    case "template": {
      return <DiamondsFour color="white" size={18} {...props} />;
    }
    case "layout": {
      return <Layout color="white" size={18} {...props} />;
    }
    case "typography": {
      return <TextT color="white" size={18} {...props} />;
    }
    case "theme": {
      return <Palette color="white" size={18} {...props} />;
    }
    case "css": {
      return <Code color="white" size={18} {...props} />;
    }
    case "page": {
      return <ReadCvLogo color="white" size={18} {...props} />;
    }
    case "locale": {
      return <Translate color="white" size={18} {...props} />;
    }
    case "sharing": {
      return <ShareFat color="white" size={18} {...props} />;
    }
    case "statistics": {
      return <TrendUp color="white" size={18} {...props} />;
    }
    case "export": {
      return <DownloadSimple color="white" size={18} {...props} />;
    }
    case "information": {
      return <Info color="white" size={18} {...props} />;
    }

    default: {
      return null;
    }
  }
};

type SectionIconProps = Omit<ButtonProps, "size"> & {
  id: MetadataKey;
  name: string;
  size?: number;
  icon?: React.ReactNode;
};

export const SectionIcon = ({ id, name, icon, size = 14, ...props }: SectionIconProps) => (
  <Tooltip side="left" content={name}>
    <Button size="icon" variant="ghost" className="size-8 rounded-full" {...props}>
      {icon ?? getSectionIcon(id, { size })}
    </Button>
  </Tooltip>
);
