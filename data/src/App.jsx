import { useState } from "react";
import volgrania from "../data/volgrania.json";
import dniprland from "../data/dniprland.json";

const STORIES = { volgrania, dniprland };

function StoryPlayer({ storyKey }) {
  const story = STORIES[storyKey];
  const [nodeId, setNodeId] = useState(story.start);
  const [path, setPath] = useState([story.start]);

  const node = story.nodes[nodeId];
  const isEnding = Boolean(node.ending);

  function choose(next) {
    setNodeId(next);
    setPath((p) => [...p, next]);
  }

  function restart() {
    setNodeId(story.start);
    setPath([story.start]);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 480, margin: "0 auto", padding: 16, direction: "rtl" }}>
      <h2 style={{ marginBottom: 4 }}>{story.country}</h2>
      <p style={{ fontSize: 11, color: "#999", marginTop: 0 }}>
        المحطة {path.length} — {path.join(" ← ")}
      </p>

      <div style={{ background: "#f7f4f0", borderRadius: 10, padding: 14, marginTop: 12, lineHeight: 1.7 }}>
        {node.text}
      </div>

      {isEnding ? (
        <div style={{ marginTop: 16 }}>
          <div style={{ background: "#fff7f2", border: "1px solid #f0d3c5", borderRadius: 10, padding: 12, textAlign: "center", fontWeight: 700 }}>
            🏁 نهاية: {node.ending}
          </div>
          <button
            onClick={restart}
            style={{ marginTop: 10, width: "100%", padding: "10px 0", borderRadius: 8, border: "none", background: "#b35c3c", color: "#fff", fontWeight: 700, cursor: "pointer" }}
          >
            العب تاني من الأول
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {node.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => choose(choice.next)}
              style={{
                textAlign: "right", padding: "12px 14px", borderRadius: 8,
                border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 14,
              }}
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [storyKey, setStoryKey] = useState(null);

  if (!storyKey) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 480, margin: "0 auto", padding: 16, direction: "rtl" }}>
        <h2>اختار الدولة</h2>
        <button onClick={() => setStoryKey("volgrania")} style={{ display: "block", width: "100%", marginBottom: 10, padding: 14, borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer", textAlign: "right" }}>
          🟫 فولغرانيا — مصدر الطاقة
        </button>
        <button onClick={() => setStoryKey("dniprland")} style={{ display: "block", width: "100%", padding: 14, borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer", textAlign: "right" }}>
          🟨 دنيبرالاند — دولة العبور
        </button>
      </div>
    );
  }

  return <StoryPlayer storyKey={storyKey} />;
}
