import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Mic,
  Link as LinkIcon,
  Sparkles,
  Send,
  History,
  Video,
  Zap,
  Search,
  Menu,
  X,
  ChevronRight,
  Plus,
  User,
  Upload,
  Play,
  Pause,
  Download,
} from "lucide-react";
import logo from "@/assets/logo.jpeg";
import hiVdo from "@/assets/hi.mp4";
import test2Audio from "@/assets/test2.mp3";

export const Route = createFileRoute("/")({
  component: Index,
});

const SUGGESTED_PROMPTS = [
  { category: "Space", text: "Draft a 60-second script about NASA's newest space discovery" },
  { category: "AI", text: "What are the latest breakthroughs in neural network efficiency?" },
  {
    category: "Future",
    text: "Suggest 5 viral hooks for a video about next-gen solid state batteries",
  },
  { category: "Trends", text: "What tech trends are currently dominating the Nepalese market?" },
];

const HISTORY_ITEMS = [
  {
    id: "nasa-space-discovery",
    title: "NASA Space Discovery",
    date: "10:45 AM",
    topic: "NASA's newest space discovery",
  },
  {
    id: "next-gen-neural-nets",
    title: "Next-Gen Neural Nets",
    date: "Yesterday",
    topic: "latest breakthroughs in neural network efficiency",
  },
  {
    id: "fusion-energy-hook",
    title: "Fusion Energy Hook",
    date: "Oct 14",
    topic: "next-generation fusion energy",
  },
  {
    id: "tiktok-tech-trends",
    title: "TikTok Tech Trends",
    date: "Oct 12",
    topic: "tech trends dominating the Nepalese market",
  },
] as const;

const SCANNER_SETTING_FIELDS = [
  {
    key: "videoLength",
    label: "Video length",
    type: "select",
    options: ["15 seconds", "30 seconds", "45 seconds", "60 seconds"],
  },
  {
    key: "audioType",
    label: "Audio type",
    type: "select",
    options: ["Narration voiceover", "AI voice", "Silent captions", "Mixed audio"],
  },
  {
    key: "format",
    label: "Format",
    type: "select",
    options: ["Vertical 9:16", "Square 1:1", "Landscape 16:9"],
  },
  {
    key: "captionStyle",
    label: "Caption style",
    type: "select",
    options: ["Clean subtitles", "Bold captions", "Minimal captions"],
  },
  {
    key: "visualStyle",
    label: "Visual style",
    type: "select",
    options: ["Minimal documentary", "Clean motion graphics", "Newsroom style"],
  },
  {
    key: "sourceFocus",
    label: "Source focus",
    type: "select",
    options: [
      "AI, space, and tech news",
      "Research updates",
      "General tech news",
      "Mixed current events",
    ],
  },
  {
    key: "sourceCount",
    label: "Source count",
    type: "number",
    min: 1,
    max: 12,
  },
] as const;

const AI_AVATAR_ILLUSTRATION = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
    <rect width="120" height="120" rx="24" fill="#f8fafc"/>
    <circle cx="60" cy="48" r="18" fill="#e2e8f0"/>
    <path d="M30 86c6-16 18-24 30-24s24 8 30 24" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
    <path d="M44 46c4 4 8 6 16 6s12-2 16-6" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="45" r="3" fill="#64748b"/>
    <circle cx="70" cy="45" r="3" fill="#64748b"/>
    <path d="M40 30h40" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
    <path d="M48 28c0-5 5-10 12-10s12 5 12 10" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
  </svg>
`)}`;

const SidebarItem = ({
  title,
  date,
  isActive,
  onClick,
}: {
  title: string;
  date: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: "12px 14px",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginBottom: "6px",
      display: "flex",
      gap: "12px",
      alignItems: "center",
      width: "100%",
      border: isActive ? "1px solid rgba(14, 165, 233, 0.25)" : "1px solid transparent",
      background: isActive ? "rgba(14, 165, 233, 0.06)" : "transparent",
      boxShadow: isActive ? "0 8px 24px rgba(14, 165, 233, 0.08)" : "none",
      textAlign: "left",
    }}
    className="sidebar-item"
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "8px",
        background: isActive ? "#0f172a" : "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {title.charAt(0)}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: "13.5px",
          fontWeight: 600,
          color: isActive ? "#0f172a" : "#334155",
          marginBottom: "2px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "11px", color: isActive ? "#0ea5e9" : "#64748b" }}>{date}</div>
    </div>
  </button>
);

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#0ea5e9",
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function chunkSubtitle(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  const pattern = [3, 2];
  const chunks: string[] = [];
  let index = 0;
  let patternIndex = 0;

  while (index < words.length) {
    const size = pattern[patternIndex % pattern.length];
    chunks.push(words.slice(index, index + size).join(" "));
    index += size;
    patternIndex += 1;
  }

  return chunks;
}

function buildScriptText(topic: string) {
  const hooks = [
    "What if the biggest tech story today could fit into 20 seconds?",
    "This one sounds like sci-fi, but it is already happening.",
    "Here is the short version of a story that matters right now.",
  ];
  const middleLines = [
    "The breakthrough is moving fast, and the practical impact is even bigger than the headline.",
    "The real story is not just the announcement, but what it changes for everyday people and creators.",
    "Behind the headline, there is a clear shift in how teams, tools, and audiences will work next.",
  ];
  const endings = [
    "If you want the next update, keep watching PulseAI.",
    "That is the kind of shift worth understanding before everyone else does.",
    "Save this one, because the next few months will move fast.",
  ];

  const selectedHook = hooks[Math.floor(Math.random() * hooks.length)];
  const selectedMiddle = middleLines[Math.floor(Math.random() * middleLines.length)];
  const selectedEnding = endings[Math.floor(Math.random() * endings.length)];

  return [
    `TITLE: PulseAI script draft for ${topic}`,
    "",
    `HOOK: ${selectedHook}`,
    `INTRO: ${selectedMiddle}`,
    `BODY: Today we are breaking down ${topic} into a short, clear story that is easy to watch and easy to remember.`,
    `BEAT 1: Open with the headline and why it matters right now.`,
    `BEAT 2: Explain the shift in simple language so anyone can follow it.`,
    `BEAT 3: Add one concrete detail that makes the story feel real and current.`,
    `VOICEOVER: Keep the delivery calm, direct, and easy to read over fast visuals.`,
    `ON-SCREEN TEXT: Use short captions, one idea per line, with clean spacing.`,
    `VISUAL DIRECTION: Pair the script with a clean sequence of close-ups, headlines, and motion graphics.`,
    `END: ${selectedEnding}`,
    "",
    "NOTES:",
    "- Keep the pacing quick and punchy.",
    "- Use captions for every key line.",
    "- End with one memorable takeaway.",
    "- Keep the overall tone confident, simple, and polished.",
  ].join("\n");
}

function createScriptDownload(topic: string) {
  const scriptText = buildScriptText(topic);
  const file = new Blob([scriptText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const filename = `pulseai-script-${
    topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "draft"
  }.txt`;

  return { url, filename };
}

function buildHistoryText(title: string, topic: string) {
  return [
    `HISTORY SNAPSHOT: ${title}`,
    "",
    `TOPIC: ${topic}`,
    "",
    "OLDER CHAT FLOW:",
    "User asked for a short, high-energy script that felt current and easy to turn into a reel.",
    "Assistant responded with a concise concept, a hook, and a visual direction for the edit.",
    "The draft was kept lightweight so it could be reused or remixed later.",
    "",
    "TAKEAWAY:",
    "This was treated as a fast-turn content idea, not a final publish-ready asset.",
  ].join("\n");
}

function createHistoryDownload(title: string, topic: string) {
  const historyText = buildHistoryText(title, topic);
  const file = new Blob([historyText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const filename = `pulseai-history-${
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "snapshot"
  }.txt`;

  return { url, filename };
}

function Message({
  msg,
}: {
  msg: {
    role: string;
    content: string | { type: "image" | "video" | "pdf"; src: string; name?: string };
  };
}) {
  const isUser = msg.role === "user";
  const content = msg.content;
  const isFile = typeof content !== "string";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 28,
        animation: "fadeSlideIn 0.3s ease-out",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            flexShrink: 0,
            background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
            marginTop: 4,
            fontSize: 20,
            color: "white",
            boxShadow: "0 8px 16px rgba(14, 165, 233, 0.2)",
          }}
        >
          ✦
        </div>
      )}
      <div
        style={{
          maxWidth: "80%",
          background: isUser ? "#f1f5f9" : "transparent",
          borderRadius: isUser ? "18px 18px 4px 18px" : "0",
          padding: isUser ? "16px 22px" : "8px 0",
          boxShadow: isUser ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
          border: isUser ? "1px solid rgba(0,0,0,0.05)" : "none",
        }}
      >
        {typeof content === "string" ? (
          <p
            style={{
              margin: 0,
              color: isUser ? "#334155" : "#475569",
              fontSize: 16,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {content}
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {content.type === "image" && (
              <img
                src={content.src}
                alt={content.name || "image"}
                style={{ maxWidth: "100%", borderRadius: 12 }}
              />
            )}
            {content.type === "video" && (
              <video src={content.src} controls style={{ maxWidth: "100%", borderRadius: 12 }} />
            )}
            {content.type === "pdf" && (
              <a
                href={content.src}
                download={content.name}
                style={{ color: "#0ea5e9", textDecoration: "underline" }}
              >
                {content.name || "Download PDF"}
              </a>
            )}
            {content.name && <div style={{ fontSize: 12, color: "#64748b" }}>{content.name}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

function Index() {
  const [messages, setMessages] = useState<
    Array<{
      role: string;
      content: string | { type: "image" | "video" | "pdf"; src: string; name?: string };
    }>
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [mode, setMode] = useState<"scanner" | "shorts" | "blank">("shorts");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [currentVdo, setCurrentVdo] = useState(0);
  const [videoDirection, setVideoDirection] = useState<"next">("next");
  const [hasPrompt, setHasPrompt] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoCountdown, setVideoCountdown] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [subtitleChunkIndex, setSubtitleChunkIndex] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [scriptDownloadUrl, setScriptDownloadUrl] = useState<string | null>(null);
  const [scriptDownloadName, setScriptDownloadName] = useState<string>("pulseai-script.txt");
  const [selectedHistoryId, setSelectedHistoryId] = useState<
    (typeof HISTORY_ITEMS)[number]["id"] | null
  >(null);
  const [historyDownloadUrl, setHistoryDownloadUrl] = useState<string | null>(null);
  const [historyDownloadName, setHistoryDownloadName] = useState<string>("pulseai-history.txt");
  const [scannerSettings, setScannerSettings] = useState({
    videoLength: "30 seconds",
    audioType: "Narration voiceover",
    format: "Vertical 9:16",
    captionStyle: "Clean subtitles",
    visualStyle: "Minimal documentary",
    sourceFocus: "AI, space, and tech news",
    sourceCount: 4,
  });
  const [scannerSaveState, setScannerSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoDelayTimeoutRef = useRef<number | null>(null);
  const videoDelayIntervalRef = useRef<number | null>(null);
  const scannerSaveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (videoDelayTimeoutRef.current) window.clearTimeout(videoDelayTimeoutRef.current);
      if (videoDelayIntervalRef.current) window.clearInterval(videoDelayIntervalRef.current);
      if (scannerSaveTimeoutRef.current) window.clearTimeout(scannerSaveTimeoutRef.current);
      if (scriptDownloadUrl) URL.revokeObjectURL(scriptDownloadUrl);
      if (historyDownloadUrl) URL.revokeObjectURL(historyDownloadUrl);
    };
  }, [scriptDownloadUrl, historyDownloadUrl]);

  const videos = [
    {
      src: hiVdo,
      prompt: "Next-gen AI verification workflow for viral content creation...",
      subtitle:
        "Microsoft has released its June security updates, addressing around 200 vulnerabilities across Windows and related products. Among the fixes are dozens of critical flaws and multiple publicly disclosed zero-day vulnerabilities. Security experts recommend updating systems as soon as possible, especially for organizations managing large numbers of Windows devices. The message is simple: if your systems aren't patched, you're giving attackers an opportunity.",
    },
    {
      src: hiVdo,
      prompt: "A cinematic short-form concept generated from latest tech news...",
      subtitle:
        "Microsoft has released its June security updates, addressing around 200 vulnerabilities across Windows and related products. Among the fixes are dozens of critical flaws and multiple publicly disclosed zero-day vulnerabilities. Security experts recommend updating systems as soon as possible, especially for organizations managing large numbers of Windows devices. The message is simple: if your systems aren't patched, you're giving attackers an opportunity.",
    },
  ];
  const subtitleChunks = chunkSubtitle(videos[currentVdo].subtitle);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selectedHistory = selectedHistoryId
    ? (HISTORY_ITEMS.find((item) => item.id === selectedHistoryId) ?? HISTORY_ITEMS[0])
    : null;
  const filteredHistoryItems = HISTORY_ITEMS.filter((item) => {
    const query = sidebarSearch.trim().toLowerCase();
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.topic.toLowerCase().includes(query) ||
      item.date.toLowerCase().includes(query)
    );
  });
  const hasSidebarSearch = sidebarSearch.trim().length > 0;
  const isConversationActive =
    messages.length > 0 || hasPrompt || loading || input.trim().length > 0;
  const updateScannerSetting = (key: keyof typeof scannerSettings, value: string | number) => {
    setScannerSettings((current) => ({ ...current, [key]: value }));
    setScannerSaveState("idle");
  };

  const saveScannerSettings = () => {
    if (scannerSaveTimeoutRef.current) window.clearTimeout(scannerSaveTimeoutRef.current);
    setScannerSaveState("saving");
    scannerSaveTimeoutRef.current = window.setTimeout(() => {
      setScannerSaveState("saved");
      scannerSaveTimeoutRef.current = window.setTimeout(() => {
        setScannerSaveState("idle");
        scannerSaveTimeoutRef.current = null;
      }, 1400) as unknown as number;
    }, 900) as unknown as number;
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.75;
  }, []);

  useEffect(() => {
    if (!audioRef.current || !videoRef.current || !isAudioPlaying) return;
    audioRef.current.currentTime = 0;
    videoRef.current.currentTime = 0;
    setSubtitleChunkIndex(0);
    Promise.all([audioRef.current.play(), videoRef.current.play()]).catch(() =>
      setIsAudioPlaying(false),
    );
  }, [currentVdo]);

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    if (isAudioPlaying) {
      Promise.all([audio.play(), video.play()]).catch(() => setIsAudioPlaying(false));
    } else {
      audio.pause();
      video.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (!hasPrompt) return;
    setSubtitleChunkIndex(0);

    if (!isAudioPlaying || subtitleChunks.length <= 1) return;

    const interval = window.setInterval(() => {
      setSubtitleChunkIndex((prev) => (prev + 1) % subtitleChunks.length);
    }, 1400);

    return () => window.clearInterval(interval);
  }, [hasPrompt, isAudioPlaying, currentVdo, subtitleChunks.length]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
    setShowSuggestions(true);
    setHasPrompt(false);
    setVideoVisible(false);
    setVideoCountdown(0);
    setIsAudioPlaying(false);
    setSubtitleChunkIndex(0);
    setSelectedHistoryId(null);
    setSidebarSearch("");
    if (scriptDownloadUrl) {
      URL.revokeObjectURL(scriptDownloadUrl);
      setScriptDownloadUrl(null);
    }
    if (historyDownloadUrl) {
      URL.revokeObjectURL(historyDownloadUrl);
      setHistoryDownloadUrl(null);
    }
  };

  const sendMessage = async (text?: string) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    setHasPrompt(true);
    setShowSuggestions(false);
    // hide video and start delay before showing it
    setVideoVisible(false);
    if (scriptDownloadUrl) {
      URL.revokeObjectURL(scriptDownloadUrl);
      setScriptDownloadUrl(null);
    }
    if (historyDownloadUrl) {
      URL.revokeObjectURL(historyDownloadUrl);
      setHistoryDownloadUrl(null);
    }
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      // start a 12 second delay (configurable) before showing the video
      const delayMs = 12000; // 12 seconds (user suggested 10-15s)
      // clear any existing timers
      if (videoDelayTimeoutRef.current) window.clearTimeout(videoDelayTimeoutRef.current);
      if (videoDelayIntervalRef.current) window.clearInterval(videoDelayIntervalRef.current);
      setVideoCountdown(Math.ceil(delayMs / 1000));
      videoDelayIntervalRef.current = window.setInterval(() => {
        setVideoCountdown((prev) => {
          if (prev <= 1) {
            if (videoDelayIntervalRef.current) {
              window.clearInterval(videoDelayIntervalRef.current);
              videoDelayIntervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      videoDelayTimeoutRef.current = window.setTimeout(() => {
        const scriptDownload = createScriptDownload(userText);
        setScriptDownloadUrl(scriptDownload.url);
        setScriptDownloadName(scriptDownload.filename);
        setVideoVisible(true);
        setIsAudioPlaying(true);
        const reply = `Here is a short video concept for: "${userText}". I would turn this into a fast hook, a clear middle, and a strong ending for a 15 to 30 second clip.`;
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        setLoading(false);
        if (videoDelayTimeoutRef.current) {
          window.clearTimeout(videoDelayTimeoutRef.current);
          videoDelayTimeoutRef.current = null;
        }
      }, delayMs) as unknown as number;
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Connection error. Please try again." },
      ]);
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#f8fafc",
        display: "flex",
        fontFamily: "'Inter', sans-serif",
        color: "#334155",
        overflow: "hidden",
      }}
    >
      <audio ref={audioRef} src={test2Audio} loop preload="auto" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideFromRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideFromLeft { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes ticker { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        .sidebar-item:hover { background: #f8fafc; }
        .suggestion:hover { border-color: rgba(15, 23, 42, 0.14) !important; background: #ffffff !important; box-shadow: 0 6px 16px rgba(15,23,42,0.04); }
        .suggestion { transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease; }
        .mode-toggle:hover { background: rgba(0,0,0,0.02); }
      `}</style>

      {/* Sidebar */}
      <aside
        style={{
          width: isSidebarOpen ? 320 : 0,
          opacity: isSidebarOpen ? 1 : 0,
          borderRight: isSidebarOpen ? "1px solid rgba(0,0,0,0.05)" : "none",
          display: "flex",
          flexDirection: "column",
          padding: isSidebarOpen ? "32px 20px" : "32px 0",
          background: "#ffffff",
          flexShrink: 0,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <div style={{ marginBottom: 40, position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
              paddingLeft: "14px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  margin: 0,
                }}
              >
                Chats
              </h2>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#94a3b8" }}>
                Search and reopen past drafts
              </p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={startNewChat}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              marginBottom: 12,
              borderRadius: "12px",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              background: "linear-gradient(180deg, #ffffff, #f8fafc)",
              color: "#0f172a",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
            }}
          >
            <Plus size={16} />
            New chat
          </button>

          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search
              size={16}
              style={{ position: "absolute", left: 14, top: 13, color: "#94a3b8" }}
            />
            <input
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder="Search chats"
              aria-label="Search chats"
              style={{
                width: "100%",
                height: 42,
                padding: "0 14px 0 40px",
                borderRadius: "12px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#f8fafc",
                color: "#0f172a",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>

          {hasSidebarSearch && (
            <div
              style={{
                marginBottom: 12,
                borderRadius: "14px",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "#f8fafc",
                padding: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#64748b",
                  }}
                >
                  Search results
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>
                  {filteredHistoryItems.length} match{filteredHistoryItems.length === 1 ? "" : "es"}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {filteredHistoryItems.length > 0 ? (
                  filteredHistoryItems.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedHistoryId(item.id);
                        const download = createHistoryDownload(item.title, item.topic);
                        if (historyDownloadUrl) URL.revokeObjectURL(historyDownloadUrl);
                        setHistoryDownloadUrl(download.url);
                        setHistoryDownloadName(download.filename);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        border: "1px solid rgba(15, 23, 42, 0.06)",
                        background: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}
                      >
                        {item.title}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                        {item.topic}
                      </div>
                    </button>
                  ))
                ) : (
                  <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                    No saved chats matched that search.
                  </div>
                )}
              </div>
            </div>
          )}

          <div
            style={{
              marginBottom: 10,
              paddingLeft: "14px",
              fontSize: 11,
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Recent
          </div>

          {filteredHistoryItems.length > 0 ? (
            filteredHistoryItems.map((item) => (
              <SidebarItem
                key={item.id}
                title={item.title}
                date={item.date}
                isActive={selectedHistoryId === item.id}
                onClick={() => {
                  setSelectedHistoryId(item.id);
                  const download = createHistoryDownload(item.title, item.topic);
                  if (historyDownloadUrl) URL.revokeObjectURL(historyDownloadUrl);
                  setHistoryDownloadUrl(download.url);
                  setHistoryDownloadName(download.filename);
                }}
              />
            ))
          ) : (
            <div
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px dashed rgba(148, 163, 184, 0.35)",
                color: "#64748b",
                fontSize: 13,
              }}
            >
              No chats match that search.
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 40px",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            background: "#ffffff",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  width: 42,
                  height: 42,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#64748b",
                  transition: "all 0.2s",
                }}
                title="Open Sidebar"
              >
                <Menu size={20} />
              </button>
            )}
            <img
              src={logo}
              alt="Pulse AI Logo"
              style={{
                height: 110,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                background: "#f1f5f9",
                padding: "4px",
                borderRadius: "12px",
                display: "flex",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <button
                onClick={() => setMode("blank")}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: mode === "blank" ? "#ffffff" : "transparent",
                  boxShadow: mode === "blank" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: mode === "blank" ? "#0ea5e9" : "#64748b",
                  transition: "all 0.2s",
                }}
              >
                <User size={16} /> Choose your avatar
              </button>
              <button
                onClick={() => setMode("scanner")}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: mode === "scanner" ? "#ffffff" : "transparent",
                  boxShadow: mode === "scanner" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: mode === "scanner" ? "#0ea5e9" : "#64748b",
                  transition: "all 0.2s",
                }}
              >
                <Search size={16} /> Content settings
              </button>
              <button
                onClick={() => setMode("shorts")}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: mode === "shorts" ? "#ffffff" : "transparent",
                  boxShadow: mode === "shorts" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                  color: mode === "shorts" ? "#0ea5e9" : "#64748b",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Video size={14} /> Shorts Mode
              </button>
            </div>

            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Bell size={20} />
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  background: "#ef4444",
                  borderRadius: "50%",
                  border: "2px solid #080d14",
                }}
              />
            </button>
          </div>
        </header>

        {mode === "scanner" ? (
          <div
            style={{
              padding: "22px 0 8px",
            }}
          >
            <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 40px", width: "100%" }}>
              <div
                style={{
                  maxWidth: 680,
                  margin: "0 auto",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "24px",
                  boxShadow: "0 10px 28px rgba(15,23,42,0.05)",
                }}
              >
                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "#64748b",
                      marginBottom: 8,
                    }}
                  >
                    Content settings
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      lineHeight: 1.1,
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: 10,
                    }}
                  >
                    Editable draft settings
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    These controls update locally so the section feels like a real settings editor
                    before backend wiring exists.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  {SCANNER_SETTING_FIELDS.map((field) => (
                    <label
                      key={field.key}
                      style={{
                        border: "1px solid rgba(15, 23, 42, 0.08)",
                        borderRadius: "16px",
                        padding: "14px 15px",
                        background: "#f8fafc",
                        display: "block",
                        cursor: field.type === "number" ? "text" : "pointer",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: "#64748b",
                          marginBottom: 6,
                        }}
                      >
                        {field.label}
                      </div>
                      {field.type === "select" ? (
                        <select
                          value={String(scannerSettings[field.key as keyof typeof scannerSettings])}
                          onChange={(event) =>
                            updateScannerSetting(
                              field.key as keyof typeof scannerSettings,
                              event.target.value,
                            )
                          }
                          style={{
                            width: "100%",
                            border: "1px solid rgba(15, 23, 42, 0.08)",
                            outline: "none",
                            background: "#ffffff",
                            padding: "10px 12px",
                            borderRadius: "12px",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#0f172a",
                          }}
                        >
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          min={field.min}
                          max={field.max}
                          value={scannerSettings.sourceCount}
                          onChange={(event) =>
                            updateScannerSetting("sourceCount", Number(event.target.value) || 1)
                          }
                          style={{
                            width: "100%",
                            border: "1px solid rgba(15, 23, 42, 0.08)",
                            outline: "none",
                            background: "#ffffff",
                            padding: "10px 12px",
                            borderRadius: "12px",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#0f172a",
                          }}
                        />
                      )}
                    </label>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={saveScannerSettings}
                    disabled={scannerSaveState === "saving"}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#ffffff",
                      background: scannerSaveState === "saving" ? "#94a3b8" : "#0f172a",
                      padding: "10px 14px",
                      borderRadius: 999,
                      border: "none",
                      cursor: scannerSaveState === "saving" ? "wait" : "pointer",
                    }}
                  >
                    {scannerSaveState === "saving"
                      ? "Updating..."
                      : scannerSaveState === "saved"
                        ? "Saved locally"
                        : "Update settings"}
                  </button>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                      background: "#f3f4f6",
                      padding: "8px 12px",
                      borderRadius: 999,
                    }}
                  >
                    Draft mode
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.02)",
              borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
              padding: "10px 0",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                display: "inline-block",
                animation: "ticker 30s linear infinite",
                paddingLeft: "100%",
              }}
            >
              <span style={{ color: "#64748b", fontWeight: 700, marginRight: "40px" }}>
                BREAKING:
              </span>
              <span style={{ marginRight: "80px", color: "#94a3b8" }}>
                SpaceX Starship achieves successful orbital insertion test...
              </span>
              <span style={{ color: "#64748b", fontWeight: 700, marginRight: "40px" }}>
                VERIFIED:
              </span>
              <span style={{ marginRight: "80px", color: "#94a3b8" }}>
                New deepfake detection AI reaches 99.9% accuracy...
              </span>
              <span style={{ color: "#64748b", fontWeight: 700, marginRight: "40px" }}>
                TRENDING:
              </span>
              <span style={{ color: "#94a3b8" }}>
                Room-temperature superconductor replication attempts increase globally...
              </span>
            </div>
          </div>
        )}

        <main
          style={{
            flex: 1,
            overflowY: mode === "blank" ? "hidden" : "auto",
            padding: "20px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: isConversationActive || selectedHistory ? "flex-start" : "center",
            minHeight: 0,
          }}
        >
          <div
            style={{
              maxWidth: 840,
              margin: "0 auto",
              padding: isConversationActive || selectedHistory ? "0 40px 40px" : "0 40px",
              width: "100%",
            }}
          >
            {mode !== "blank" &&
              hasPrompt &&
              (videoVisible ? (
                <div
                  style={{
                    animation: "fadeSlideIn 0.8s ease-out",
                    maxWidth: "680px",
                    margin: "0 auto",
                    userSelect: "none",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "24px",
                      overflow: "hidden",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
                      background: "#000",
                      lineHeight: 0,
                      animation:
                        videoDirection === "next"
                          ? "slideFromRight 0.35s ease"
                          : "slideFromLeft 0.35s ease",
                    }}
                  >
                    <video
                      ref={videoRef}
                      key={currentVdo}
                      src={videos[currentVdo].src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        maxHeight: "55vh",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: 14,
                        right: 14,
                        bottom: 16,
                        padding: "12px 14px",
                        borderRadius: 14,
                        background:
                          "linear-gradient(180deg, rgba(15,23,42,0.12), rgba(15,23,42,0.78))",
                        color: "white",
                        textShadow: "0 2px 10px rgba(0,0,0,0.35)",
                        pointerEvents: "none",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 15,
                          lineHeight: 1.55,
                          fontWeight: 700,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        {subtitleChunks[subtitleChunkIndex]}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsAudioPlaying((prev) => !prev)}
                      style={{
                        position: "absolute",
                        left: 16,
                        bottom: 16,
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(15, 23, 42, 0.82)",
                        color: "white",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.22)",
                      }}
                      aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
                      title={isAudioPlaying ? "Pause audio" : "Play audio"}
                    >
                      {isAudioPlaying ? (
                        <Pause size={18} />
                      ) : (
                        <Play size={18} style={{ marginLeft: 2 }} />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setVideoDirection("next");
                        setCurrentVdo((prev) => (prev + 1) % videos.length);
                        setIsAudioPlaying(true);
                      }}
                      style={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(15, 23, 42, 0.88)",
                        color: "white",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.22)",
                      }}
                      aria-label="Next video"
                      title="Next video"
                    >
                      <ChevronRight size={20} />
                    </button>
                    {scriptDownloadUrl && (
                      <a
                        href={scriptDownloadUrl}
                        download={scriptDownloadName}
                        onClick={() => {
                          window.setTimeout(() => {
                            URL.revokeObjectURL(scriptDownloadUrl);
                          }, 0);
                        }}
                        style={{
                          position: "absolute",
                          left: 74,
                          bottom: 16,
                          height: 42,
                          padding: "0 16px",
                          borderRadius: "999px",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          background: "rgba(255, 255, 255, 0.96)",
                          color: "#0f172a",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.16)",
                          textDecoration: "none",
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                        aria-label="Download script text file"
                        title="Download script text file"
                      >
                        <Download size={16} />
                        Download Script
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    animation: "fadeSlideIn 0.8s ease-out",
                    maxWidth: "680px",
                    margin: "0 auto",
                    userSelect: "none",
                    position: "relative",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
                    background: "#000",
                    minHeight: "220px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    flexDirection: "column",
                    gap: 12,
                    padding: 24,
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700 }}>Preparing video...</div>
                  <div style={{ fontSize: 13, color: "#cbd5e1" }}>
                    This will appear in {videoCountdown} second{videoCountdown === 1 ? "" : "s"}.
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <TypingDots />
                  </div>
                </div>
              ))}

            {/* Messages */}
            {mode !== "blank" && selectedHistory && (
              <div
                style={{
                  maxWidth: "680px",
                  margin: "0 auto 20px",
                  padding: "18px 20px",
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.96))",
                  boxShadow: "0 10px 28px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: "#64748b",
                        marginBottom: 4,
                      }}
                    >
                      History selected
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                      {selectedHistory.title}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#0ea5e9",
                      background: "rgba(14, 165, 233, 0.08)",
                      padding: "6px 10px",
                      borderRadius: 999,
                    }}
                  >
                    Saved draft
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#475569" }}>
                  Showing a stored chat draft for {selectedHistory.topic}. It stays local, but the
                  controls react like a live thread.
                </p>
                {historyDownloadUrl && (
                  <a
                    href={historyDownloadUrl}
                    download={historyDownloadName}
                    onClick={() => {
                      window.setTimeout(() => {
                        URL.revokeObjectURL(historyDownloadUrl);
                      }, 0);
                    }}
                    style={{
                      marginTop: 14,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 14px",
                      borderRadius: "999px",
                      background: "#0f172a",
                      color: "white",
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    <Download size={16} />
                    Download history text file
                  </a>
                )}
              </div>
            )}
            {mode !== "blank" &&
              !selectedHistory &&
              messages.length === 0 &&
              !input.trim() &&
              !loading && (
                <div style={{ maxWidth: "680px", margin: "0 auto 18px", padding: "0 4px" }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "#94a3b8",
                      marginBottom: 8,
                    }}
                  >
                    New chat
                  </div>
                  <div
                    style={{
                      fontSize: 30,
                      lineHeight: 1.08,
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: 8,
                    }}
                  >
                    Start with a topic.
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                    Drop a link, paste an idea, or ask for a script. Keep it simple and PulseAI
                    shapes the draft.
                  </p>
                  <div style={{ marginTop: 10, fontSize: 13, color: "#64748b" }}>
                    Try: NASA discovery · AI trends · tech news
                  </div>
                </div>
              )}
            {mode !== "blank" && messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {mode !== "blank" && loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: 28,
                  animation: "fadeSlideIn 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    flexShrink: 0,
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16,
                    color: "#0ea5e9",
                    fontSize: 20,
                  }}
                >
                  ✦
                </div>
                <div style={{ padding: "10px 0" }}>
                  <TypingDots />
                </div>
              </div>
            )}
            {mode === "blank" && (
              <div
                style={{
                  animation: "fadeSlideIn 0.6s ease-out",
                  maxWidth: "800px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setSelectedAvatar(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                {!selectedAvatar ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "24px",
                    }}
                  >
                    <div
                      className="suggestion"
                      style={{
                        background: "#ffffff",
                        padding: "32px 24px",
                        borderRadius: "24px",
                        border: "1px solid rgba(0,0,0,0.05)",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: "18px",
                          background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px",
                          color: "white",
                          boxShadow: "0 10px 20px rgba(14, 165, 233, 0.2)",
                        }}
                      >
                        <Sparkles size={28} />
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          marginBottom: "8px",
                          color: "#1e293b",
                        }}
                      >
                        Create an AI Avatar
                      </h3>
                      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
                        Generate a unique AI persona for your engine.
                      </p>
                    </div>

                    <div
                      className="suggestion"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: "#ffffff",
                        padding: "32px 24px",
                        borderRadius: "24px",
                        border: "1px solid rgba(0,0,0,0.05)",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: "18px",
                          background: "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px",
                          color: "#64748b",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      >
                        <Upload size={28} />
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          marginBottom: "8px",
                          color: "#1e293b",
                        }}
                      >
                        Upload your own
                      </h3>
                      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
                        Use your existing photo or brand assets.
                      </p>
                    </div>

                    <div
                      className="suggestion"
                      onClick={() => setSelectedAvatar(AI_AVATAR_ILLUSTRATION)}
                      style={{
                        background: "#ffffff",
                        padding: "32px 24px",
                        borderRadius: "24px",
                        border: "1px solid rgba(0,0,0,0.05)",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: "20px",
                          overflow: "hidden",
                          margin: "0 auto 20px",
                          border: "1px solid rgba(15, 23, 42, 0.08)",
                          boxShadow: "none",
                          background: "#f8fafc",
                        }}
                      >
                        <img
                          src={AI_AVATAR_ILLUSTRATION}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          alt="Illustration preview"
                        />
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          marginBottom: "8px",
                          color: "#1e293b",
                        }}
                      >
                        Create an AI Avatar
                      </h3>
                      <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>
                        Generate a unique AI persona for your engine.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      background: "#ffffff",
                      padding: "48px",
                      borderRadius: "32px",
                      border: "1px solid rgba(0,0,0,0.05)",
                      maxWidth: "500px",
                      margin: "0 auto",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: 180,
                        height: 180,
                        margin: "0 auto 32px",
                      }}
                    >
                      <img
                        src={selectedAvatar}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "4px solid white",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                        alt="Avatar Preview"
                      />
                      <button
                        onClick={() => setSelectedAvatar(null)}
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        marginBottom: "12px",
                        color: "#1e293b",
                      }}
                    >
                      Photo Selected
                    </h3>
                    <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "32px" }}>
                      Ready to transform this photo into your content avatar?
                    </p>
                    <button
                      style={{
                        padding: "16px 40px",
                        background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
                        borderRadius: "14px",
                        border: "none",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        margin: "0 auto",
                        boxShadow: "0 10px 20px rgba(14, 165, 233, 0.2)",
                      }}
                    >
                      <Sparkles size={20} /> Generate Avatar
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hidden attachment input for chat uploads */}
            <input
              type="file"
              ref={attachmentInputRef}
              style={{ display: "none" }}
              accept="image/*,video/*,application/pdf"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length === 0) return;
                files.forEach((file) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const result = reader.result as string;
                    const type = file.type.startsWith("image/")
                      ? "image"
                      : file.type.startsWith("video/")
                        ? "video"
                        : file.type === "application/pdf"
                          ? "pdf"
                          : "pdf";
                    setMessages((prev) => [
                      ...prev,
                      { role: "user", content: { type, src: result, name: file.name } },
                    ]);
                  };
                  reader.readAsDataURL(file);
                });
                // clear value so same file can be reselected
                if (attachmentInputRef.current) attachmentInputRef.current.value = "";
              }}
            />
            <div ref={bottomRef} />
          </div>
        </main>

        <div
          style={{
            padding: "16px 40px 48px",
            background: "transparent",
          }}
        >
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div
              className="input-wrap"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "24px",
                display: "flex",
                alignItems: "center",
                padding: "16px 16px 16px 24px",
                gap: 16,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", gap: "12px", color: "#64748b" }}>
                <button
                  onClick={() => attachmentInputRef.current?.click()}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  title="Upload media"
                >
                  <Plus size={18} />
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  title="Paste news link"
                >
                  <LinkIcon size={20} />
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  title="Voice input"
                >
                  <Mic size={20} />
                </button>
              </div>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  autoResize();
                }}
                onKeyDown={handleKey}
                placeholder="Drop a topic. Get a viral script."
                rows={1}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  resize: "none",
                  color: "#334155",
                  fontSize: 16,
                  lineHeight: 1.6,
                  padding: 0,
                  fontFamily: "inherit",
                  caretColor: "#0ea5e9",
                  maxHeight: 160,
                  outline: "none",
                }}
              />
              <button
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  border: "none",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  background: input.trim() && !loading ? "#0ea5e9" : "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                  color: input.trim() && !loading ? "white" : "#475569",
                  boxShadow:
                    input.trim() && !loading ? "0 8px 16px rgba(14, 165, 233, 0.3)" : "none",
                }}
              >
                <Send size={20} />
              </button>
            </div>
            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "#475569",
                marginTop: "16px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Pulse AI Media Engine · Press Enter to generate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
