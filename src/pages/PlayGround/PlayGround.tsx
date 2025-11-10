import { useMemo, useState, useEffect, useCallback } from "react";
import { Layout, Model } from "flexlayout-react";
import "flexlayout-react/style/dark.css";
import CodeEditor from "@/components/CodeEditor/CodeEditor"; // import your CodeEditor component
import CustomTooltip from "@/components/CustomTooltip";
import { LayoutPanelLeftIcon } from "lucide-react";

function PlaygroundPage() {
  const [html, setHtml] = useState("<h1>Hello World</h1>");
  const [css, setCss] = useState("h1 { color: tomato; }");
  const [js, setJs] = useState("console.log('Hello from JS');");
  const [srcDoc, setSrcDoc] = useState("");

  // 🔄 Update live preview with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              try { ${js} } catch(e) { 
                document.body.innerHTML += '<pre style="color:red">' + e + '</pre>'; 
              }
            </script>
          </body>
        </html>
      `);
    }, 300);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  // 💠 FlexLayout default model JSON
  const defaultJson = useMemo(() => ({
    global: { splitterSize: 6, enableClose: false },
    layout: {
      type: "row",
      children: [
        {
          type: "tabset",
          weight: 0.6,
          children: [
            { type: "tab", name: "HTML", component: "htmlEditor", enableClose: false },
            { type: "tab", name: "CSS", component: "cssEditor", enableClose: false },
            { type: "tab", name: "JS", component: "jsEditor", enableClose: false }
          ]
        },
        {
          type: "tabset",
          weight: 0.4,
          children: [{ type: "tab", name: "Preview", component: "preview", enableClose: false }]
        }
      ]
    }
  }), []);

  // 🧠 Load saved layout or use default
  const saved = typeof window !== "undefined" ? localStorage.getItem("layout") : null;
  const [model, setModel] = useState(() =>
    Model.fromJson(saved ? JSON.parse(saved) : defaultJson)
  );

  // persist layout on changes
  const onModelChange = useCallback((m: any) => {
    try {
      localStorage.setItem("layout", JSON.stringify(m.toJson()));
    } catch (e) {
      console.error(e)
    }
  }, []);

  // RESET handler: restore default layout and clear saved storage
  const resetLayout = useCallback(() => {
    try {
      localStorage.removeItem("layout");
    } catch (e) { console.error(e) }
    const newModel = Model.fromJson(defaultJson);
    setModel(newModel);
  }, [defaultJson]);

  const factory = useCallback(
    (node: any) => {
      const comp = node.getComponent();
      switch (comp) {
        case "htmlEditor":
          return (
            <CodeEditor
              value={html}
              onChange={(val: string) => setHtml(val)}
              language="html"
            />
          );
        case "cssEditor":
          return (
            <CodeEditor
              value={css}
              onChange={(val: string) => setCss(val)}
              language="css"
            />
          );
        case "jsEditor":
          return (
            <CodeEditor
              value={js}
              onChange={(val: string) => setJs(val)}
              language="javascript"
            />
          );
        case "preview":
          return (
            <iframe
              title="preview"
              sandbox="allow-scripts"
              srcDoc={srcDoc}
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          );
        default:
          return <div />;
      }
    },
    [html, css, js, srcDoc]
  );

  return (
    <div>
      <CustomTooltip content="Reset Layout To Default">
          <button
          className="border fixed bottom-5 right-10"
          onClick={resetLayout}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            background: "transparent",
            color: "#fff",
            cursor: "pointer",
            zIndex: 1000
          }}
        >
          <LayoutPanelLeftIcon />
        </button>
      </CustomTooltip>
      {/* layout area */}
      <div style={{ flex: 1 }}>
        <Layout model={model} factory={factory} onModelChange={onModelChange} />
      </div>
    </div>
  );
}

export default function PlayGround () {
  return (
    <div className="h-[100vh] relative">
      <PlaygroundPage />
    </div>
  );
}