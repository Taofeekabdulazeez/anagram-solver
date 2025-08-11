import * as React from "react";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import duotoneLight from "prism-react-renderer/themes/duotoneLight";
import { useTheme } from "next-themes";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: Language | string;
  title?: string;
  className?: string;
  wrap?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "bash", title, className, wrap }) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? nightOwl : duotoneLight;
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className={cn("group relative rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      {(title || language) && (
        <div className="flex items-center justify-between border-b px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {title && <span className="font-medium text-foreground/80">{title}</span>}
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono">{String(language).toLowerCase()}</span>
          </div>
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs hover:bg-muted transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <Highlight {...defaultProps} theme={theme} code={code.trim()} language={(language as Language) ?? ("bash" as Language)}>
        {({ className: cnPrism, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              cnPrism,
              "m-0 max-h-[520px] overflow-auto p-4 text-sm leading-relaxed font-mono",
              wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
            )}
            style={style as React.CSSProperties}
            aria-label="Code example"
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
