import { x as push, N as ensure_array_like, M as head, P as attr_class, J as escape_html, V as clsx, F as attr, Q as attr_style, z as pop } from './index-CeukPVPf.js';

function _page($$payload, $$props) {
  push();
  const assistants = [
    { id: "model_a", name: "GPT-4o", color: "emerald" },
    { id: "model_b", name: "Claude-3", color: "sky" }
  ];
  function colorForSource(source) {
    const match = assistants.find((a) => a.name === source || a.id === source);
    if (match) return match;
    return { id: "default", name: source || "Unknown", color: "violet" };
  }
  const sampleMessages = [
    {
      id: "u1",
      type: "user",
      metadata: { source: "User UI" },
      content: "Retrieve greeting"
    },
    {
      id: "a1",
      type: "assistant",
      metadata: { source: assistants[0].name },
      content: [
        "Here is the plan:",
        {
          type: "text",
          text: "\n- query kv store\n- return value as greeting"
        }
      ],
      tool_calls: [
        {
          id: "for_tool_call_2796f09a",
          function: "send_message",
          arguments: { key: "greeting" },
          view: { format: "markdown", content: "Retrieve key `greeting`." }
        },
        {
          id: "for_tool_call_2796f09b",
          function: "get_locale",
          arguments: { user_id: "42" },
          view: {
            format: "markdown",
            content: "Determine user locale and format the greeting."
          }
        }
      ]
    },
    {
      id: "a2",
      type: "assistant",
      metadata: { source: assistants[1].name },
      content: "Alternative approach: cache first, then KV fallback."
    },
    {
      id: "t1",
      type: "tool",
      metadata: { source: "KV Store" },
      tool_call_id: "for_tool_call_2796f09a",
      content: '{"value": "Hello, world!"}',
      status: "success"
    },
    {
      id: "a3",
      type: "assistant",
      metadata: { source: assistants[0].name },
      content: "Result: Hello, world!"
    }
  ];
  function isAssistant(m) {
    return m.type === "assistant";
  }
  function isUser(m) {
    return m.type === "user";
  }
  function isTool(m) {
    return m.type === "tool";
  }
  function groupByTurn(messages) {
    const turns2 = [];
    let current = null;
    for (const m of messages) {
      if (isUser(m)) {
        if (current) turns2.push(current);
        current = { user: m, assistants: [], tools: [] };
      } else if (isAssistant(m)) {
        if (!current) current = { user: null, assistants: [], tools: [] };
        current.assistants.push(m);
      } else if (isTool(m)) {
        if (!current) current = { user: null, assistants: [], tools: [] };
        current.tools.push(m);
      }
    }
    if (current) turns2.push(current);
    return turns2;
  }
  const turns = groupByTurn(sampleMessages);
  const colorClasses = {
    emerald: {
      stripe: "border-l-4 border-emerald-500",
      badge: "bg-emerald-600 text-white",
      dot: "bg-emerald-500",
      edge: "border-emerald-500"
    },
    sky: {
      stripe: "border-l-4 border-sky-500",
      badge: "bg-sky-600 text-white",
      dot: "bg-sky-500",
      edge: "border-sky-500"
    },
    violet: {
      stripe: "border-l-4 border-violet-500",
      badge: "bg-violet-600 text-white",
      dot: "bg-violet-500",
      edge: "border-violet-500"
    }
  };
  function stripeClassFor(src) {
    return src ? colorClasses[src.color]?.stripe || "" : "";
  }
  function badgeClassFor(src) {
    return src ? colorClasses[src.color]?.badge || "" : "";
  }
  function dotClassFor(src) {
    return src ? colorClasses[src.color]?.dot || "bg-base-300" : "bg-base-300";
  }
  function edgeClassFor(src) {
    return src ? colorClasses[src.color]?.edge || "" : "";
  }
  function laneForToolCall(tc) {
    const fn = (tc?.function || "").toLowerCase();
    if (fn.includes("kv") || fn.includes("cache")) return "KV";
    if (fn.includes("http") || fn.includes("fetch") || fn.includes("send")) return "HTTP";
    if (fn.includes("file") || fn.includes("fs")) return "Files";
    return "Other";
  }
  const laneClasses = {
    KV: {
      bar: "bg-amber-500",
      dot: "bg-amber-500",
      badge: "bg-amber-600 text-white"
    },
    HTTP: {
      bar: "bg-sky-500",
      dot: "bg-sky-500",
      badge: "bg-sky-600 text-white"
    },
    Files: {
      bar: "bg-emerald-500",
      dot: "bg-emerald-500",
      badge: "bg-emerald-600 text-white"
    },
    Other: {
      bar: "bg-zinc-500",
      dot: "bg-zinc-500",
      badge: "bg-zinc-600 text-white"
    }
  };
  function getInitials(name) {
    if (!name) return "??";
    return name.split(/\s+/).map((p) => p[0]?.toUpperCase()).slice(0, 2).join("");
  }
  function tokenize(str) {
    return (str || "").replace(/\s+/g, " ").trim().split(" ");
  }
  function diffWords(a, b) {
    const aTokens = tokenize(a);
    const bTokens = tokenize(b);
    const aSet = new Set(aTokens);
    const bSet = new Set(bTokens);
    return {
      aTokens: aTokens.map((t) => ({ t, d: !bSet.has(t) })),
      bTokens: bTokens.map((t) => ({ t, d: !aSet.has(t) }))
    };
  }
  let compact = false;
  let openMap = {};
  function isOpenFor(id) {
    if (!id) return true;
    return openMap[id] ?? true;
  }
  const each_array = ensure_array_like(sampleMessages);
  const each_array_2 = ensure_array_like(sampleMessages);
  const each_array_4 = ensure_array_like(sampleMessages);
  const each_array_6 = ensure_array_like(sampleMessages);
  const each_array_8 = ensure_array_like(sampleMessages);
  const each_array_10 = ensure_array_like(sampleMessages);
  const each_array_12 = ensure_array_like(sampleMessages);
  const each_array_14 = ensure_array_like(sampleMessages);
  const each_array_16 = ensure_array_like(sampleMessages);
  const each_array_18 = ensure_array_like(sampleMessages);
  const each_array_20 = ensure_array_like(sampleMessages);
  const each_array_22 = ensure_array_like(sampleMessages);
  const each_array_24 = ensure_array_like(sampleMessages);
  const each_array_26 = ensure_array_like(sampleMessages);
  const each_array_28 = ensure_array_like(sampleMessages);
  const each_array_30 = ensure_array_like(sampleMessages);
  const each_array_32 = ensure_array_like(sampleMessages);
  const each_array_34 = ensure_array_like(sampleMessages.filter(isAssistant));
  const each_array_37 = ensure_array_like(turns);
  const each_array_39 = ensure_array_like(sampleMessages.filter(isAssistant));
  const each_array_41 = ensure_array_like(sampleMessages.filter(isAssistant));
  const each_array_43 = ensure_array_like(sampleMessages);
  const each_array_44 = ensure_array_like(turns);
  const each_array_52 = ensure_array_like(sampleMessages);
  const each_array_53 = ensure_array_like(sampleMessages);
  const each_array_56 = ensure_array_like(sampleMessages);
  const each_array_59 = ensure_array_like(sampleMessages);
  const each_array_62 = ensure_array_like(sampleMessages);
  const each_array_64 = ensure_array_like(sampleMessages);
  const each_array_67 = ensure_array_like(sampleMessages);
  const each_array_69 = ensure_array_like(sampleMessages);
  const each_array_70 = ensure_array_like(sampleMessages);
  const each_array_73 = ensure_array_like(sampleMessages);
  const each_array_77 = ensure_array_like(sampleMessages);
  const each_array_79 = ensure_array_like(sampleMessages);
  const each_array_81 = ensure_array_like(sampleMessages);
  const each_array_84 = ensure_array_like(sampleMessages);
  const each_array_86 = ensure_array_like(sampleMessages);
  const each_array_88 = ensure_array_like(sampleMessages);
  const each_array_91 = ensure_array_like(sampleMessages);
  const each_array_99 = ensure_array_like(sampleMessages);
  const each_array_101 = ensure_array_like(sampleMessages);
  const each_array_103 = ensure_array_like(sampleMessages);
  const each_array_105 = ensure_array_like(sampleMessages);
  const each_array_107 = ensure_array_like(sampleMessages);
  const each_array_109 = ensure_array_like(sampleMessages);
  const each_array_111 = ensure_array_like(sampleMessages);
  const each_array_113 = ensure_array_like(sampleMessages);
  const each_array_115 = ensure_array_like(sampleMessages);
  const each_array_117 = ensure_array_like(sampleMessages);
  const each_array_119 = ensure_array_like(sampleMessages);
  const each_array_121 = ensure_array_like(sampleMessages);
  const each_array_123 = ensure_array_like(sampleMessages);
  const each_array_125 = ensure_array_like(sampleMessages);
  const each_array_127 = ensure_array_like(sampleMessages);
  const each_array_129 = ensure_array_like(sampleMessages);
  const each_array_130 = ensure_array_like(sampleMessages);
  const each_array_132 = ensure_array_like(sampleMessages);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Message Rendering Variants</title>`;
  });
  $$payload.out += `<div class="min-h-screen bg-base-100"><div class="container mx-auto py-8 px-4"><h1 class="text-2xl font-bold mb-6">Message Rendering Variants</h1> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">1C Variations (A–E)</h2> <div class="mb-8 space-y-4"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let msg = each_array[$$index_1];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_1.length; i < $$length2; i++) {
        let tc = each_array_1[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="relative my-3"><div class="h-px bg-base-300"></div> <div class="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-base-300"></div> <div class="absolute -top-[3px] right-0 w-1.5 h-1.5 rounded-full bg-base-300"></div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)} <span class="text-gray-500 ml-2">ID: ${escape_html(tc.id)}</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-8 space-y-4"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
    let msg = each_array_2[$$index_3];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_3 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_3.length; i < $$length2; i++) {
        let tc = each_array_3[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div${attr_class(`h-px my-3 bg-gradient-to-r from-transparent to-transparent ${source?.color === "emerald" ? "via-emerald-400/40" : source?.color === "sky" ? "via-sky-400/40" : source?.color === "violet" ? "via-violet-400/40" : ""}`)}></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <div${attr_class("pl-2 border-l-2", void 0, {
          "border-emerald-500": source?.color === "emerald",
          "border-sky-500": source?.color === "sky",
          "border-violet-500": source?.color === "violet"
        })}><pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-8 space-y-4"><!--[-->`;
  for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
    let msg = each_array_4[$$index_5];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_5 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2"><!--[-->`;
      for (let i = 0, $$length2 = each_array_5.length; i < $$length2; i++) {
        let tc = each_array_5[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="my-2 border-t border-dotted border-base-300"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="flex items-start gap-2"><div class="mt-0.5 w-5 h-5 rounded-full bg-base-200 text-[11px] grid place-items-center">${escape_html(i + 1)}</div> <div class="flex-1"><div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-8 space-y-4"><!--[-->`;
  for (let $$index_7 = 0, $$length = each_array_6.length; $$index_7 < $$length; $$index_7++) {
    let msg = each_array_6[$$index_7];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-xs ${stripeClassFor(source)}`)}><div class="p-2"><div class="flex items-center gap-2 mb-1"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(clsx(`badge badge-ghost badge-xs ${badgeClassFor(source)}`.replace("bg-", "bg-opacity-20 bg-")))}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="leading-snug">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_7 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2"><!--[-->`;
      for (let i = 0, $$length2 = each_array_7.length; i < $$length2; i++) {
        let tc = each_array_7[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="my-1 border-t border-dotted border-base-300"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-[11px] mb-0.5"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.85em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="space-y-4"><!--[-->`;
  for (let $$index_9 = 0, $$length = each_array_8.length; $$index_9 < $$length; $$index_9++) {
    let msg = each_array_8[$$index_9];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_9 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_9.length; i < $$length2; i++) {
        let tc = each_array_9[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="my-2 border-t border-base-200"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="flex items-baseline gap-2 text-sm"><div class="font-semibold">${escape_html(tc.function)}:</div> <div class="text-gray-600 text-xs line-clamp-1 flex-1">${escape_html(tc.view?.content || JSON.stringify(tc.arguments))}</div></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">1C Bold Variations (F–Q)</h2> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_11 = 0, $$length = each_array_10.length; $$index_11 < $$length; $$index_11++) {
    let msg = each_array_10[$$index_11];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="mb-2 flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_11 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_11.length; i < $$length2; i++) {
        let tc = each_array_11[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="h-[2px] my-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-[11px] uppercase tracking-wide font-semibold text-fuchsia-500">TOOL: ${escape_html(tc.function)} <span class="text-gray-500 normal-case ml-2">ID: ${escape_html(tc.id)}</span></div> <div class="mt-1"><div class="h-[2px] bg-white/20"></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_13 = 0, $$length = each_array_12.length; $$index_13 < $$length; $$index_13++) {
    let msg = each_array_12[$$index_13];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    const band = source?.color === "emerald" ? "bg-emerald-500/10" : source?.color === "sky" ? "bg-sky-500/10" : source ? "bg-violet-500/10" : "";
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)} relative overflow-hidden`)}><div${attr_class(`absolute inset-x-0 top-0 h-7 ${band} shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]`)}></div> <div class="p-3 relative"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="mt-1">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_13 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_13.length; i < $$length2; i++) {
        let tc = each_array_13[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="my-3 h-px bg-base-300"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_15 = 0, $$length = each_array_14.length; $$index_15 < $$length; $$index_15++) {
    let msg = each_array_14[$$index_15];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    const diag = source?.color === "emerald" ? "via-emerald-500/70" : source?.color === "sky" ? "via-sky-500/70" : source ? "via-violet-500/70" : "";
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_15 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_15.length; i < $$length2; i++) {
        let tc = each_array_15[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div${attr_class(`h-[6px] my-4 bg-gradient-to-r from-transparent ${diag} to-transparent [clip-path:polygon(0_0,100%_0,85%_100%,15%_100%)]`)}></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <div class="pl-2 border-l-4 border-dotted border-base-300"><pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_17 = 0, $$length = each_array_16.length; $$index_17 < $$length; $$index_17++) {
    let msg = each_array_16[$$index_17];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_17 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_17.length; i < $$length2; i++) {
        let tc = each_array_17[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="h-px my-3 bg-neutral-800/50 dark:bg-neutral-200/30"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="flex items-start gap-3"><div${attr_class(`text-5xl font-black leading-none select-none ${source?.color === "emerald" ? "text-emerald-400/30" : source?.color === "sky" ? "text-sky-400/30" : "text-violet-400/30"}`)}>${escape_html(i + 1)}</div> <div class="flex-1"><div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_19 = 0, $$length = each_array_18.length; $$index_19 < $$length; $$index_19++) {
    let msg = each_array_18[$$index_19];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_19 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3 space-y-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_19.length; i < $$length2; i++) {
        let tc = each_array_19[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="h-[1.5px] bg-white/40 dark:bg-white/20"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md text-[11px]"><span class="badge badge-info badge-xs">TOOL</span> <span>${escape_html(tc.function)}</span> <span class="text-gray-400">ID: ${escape_html(tc.id)}</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_21 = 0, $$length = each_array_20.length; $$index_21 < $$length; $$index_21++) {
    let msg = each_array_20[$$index_21];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_21 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_21.length; i < $$length2; i++) {
        let tc = each_array_21[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="border-t border-dashed border-emerald-400/50 my-3"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="inline-flex items-center gap-2 bg-black text-emerald-400 font-mono px-2 py-0.5 rounded-sm text-[11px] shadow-[0_0_10px_rgba(16,185,129,0.3)]"><span>$</span> <span>${escape_html(tc.function)}</span></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em] text-emerald-300/90">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_23 = 0, $$length = each_array_22.length; $$index_23 < $$length; $$index_23++) {
    let msg = each_array_22[$$index_23];
    $$payload.out += `<div class="rounded-lg p-3 text-sm bg-[#0A2540] text-cyan-200 [background-image:radial-gradient(circle_at_1px_1px,#0d3b66_1px,transparent_1px)] [background-size:12px_12px]"><div class="text-[10px] uppercase tracking-widest text-cyan-300/70 mb-1">Blueprint</div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_23 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2"><!--[-->`;
      for (let i = 0, $$length2 = each_array_23.length; i < $$length2; i++) {
        let tc = each_array_23[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="border-t border-cyan-400/50 my-2"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs">TOOL: ${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em] text-cyan-200/90">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_25 = 0, $$length = each_array_24.length; $$index_25 < $$length; $$index_25++) {
    let msg = each_array_24[$$index_25];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_25 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_25.length; i < $$length2; i++) {
        let tc = each_array_25[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="my-4 h-[6px] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:8px_8px] opacity-20"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="italic inline-flex items-center gap-2 bg-yellow-300 text-black px-2 py-0.5 shadow">SFX</div> <div class="text-xs mb-1">${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-6"><!--[-->`;
  for (let $$index_27 = 0, $$length = each_array_26.length; $$index_27 < $$length; $$index_27++) {
    let msg = each_array_26[$$index_27];
    $$payload.out += `<div class="relative border rounded-lg p-3 text-sm"><div class="mb-1">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_27 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="space-y-4"><!--[-->`;
      for (let $$index_26 = 0, $$length2 = each_array_27.length; $$index_26 < $$length2; $$index_26++) {
        let tc = each_array_27[$$index_26];
        $$payload.out += `<div class="relative"><div class="absolute -top-2 left-4 w-16 h-3 bg-amber-200/70 -rotate-6 shadow"></div> <div class="pl-3 border-l-2 border-amber-500/60"><div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_29 = 0, $$length = each_array_28.length; $$index_29 < $$length; $$index_29++) {
    let msg = each_array_28[$$index_29];
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_29 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_29.length; i < $$length2; i++) {
        let tc = each_array_29[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="h-[4px] my-3 rounded-full bg-[conic-gradient(at_10%_50%,#6366f1,#06b6d4,#22c55e,#6366f1)] opacity-70"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent font-semibold">${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="mb-10 space-y-4"><!--[-->`;
  for (let $$index_31 = 0, $$length = each_array_30.length; $$index_31 < $$length; $$index_31++) {
    let msg = each_array_30[$$index_31];
    $$payload.out += `<div class="border rounded-lg p-3 text-sm relative"><div class="after:content-[''] after:absolute after:left-0 after:right-0 after:-top-2 after:h-2 after:bg-[radial-gradient(circle,#000_2px,transparent_2px)] after:bg-[length:12px_12px] after:opacity-20"></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_31 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_31.length; i < $$length2; i++) {
        let tc = each_array_31[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="border-b-2 border-dotted border-base-300 my-2"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="flex items-center gap-2"><div class="w-5 h-5 rounded-full bg-rose-500 text-white grid place-items-center text-[11px]">${escape_html(i + 1)}</div> <div class="text-xs font-semibold">${escape_html(tc.function)}</div></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="space-y-4"><!--[-->`;
  for (let $$index_33 = 0, $$length = each_array_32.length; $$index_33 < $$length; $$index_33++) {
    let msg = each_array_32[$$index_33];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    const textColor = source?.color === "emerald" ? "text-emerald-500" : source?.color === "sky" ? "text-sky-500" : "text-violet-500";
    $$payload.out += `<div${attr_class(`border rounded-lg p-3 text-sm ${stripeClassFor(source)} ${textColor}`)}><div class="text-current">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_33 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_33.length; i < $$length2; i++) {
        let tc = each_array_33[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="relative h-6 text-current my-1"><div class="absolute inset-0 [background:repeating-linear-gradient(90deg,transparent_0,transparent_6px,currentColor_6px,currentColor_8px)] opacity-60"></div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs uppercase tracking-[0.2em] text-current">${escape_html(tc.function)}</div> <pre class="text-black whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Tri-pane per message</h2> <div class="space-y-6"><!--[-->`;
  for (let $$index_36 = 0, $$length = each_array_34.length; $$index_36 < $$length; $$index_36++) {
    let msg = each_array_34[$$index_36];
    const source = colorForSource(msg?.metadata?.source);
    const each_array_35 = ensure_array_like(msg.tool_calls || []);
    const each_array_36 = ensure_array_like(msg.tool_calls || []);
    $$payload.out += `<div class="grid md:grid-cols-3 gap-3"><div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 text-sm"><div class="mb-2 flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">ASSISTANT</span> <span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div></div> <div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 text-sm"><div class="font-semibold mb-2">Steps</div> <ol class="list-decimal list-inside space-y-1 text-xs"><!--[-->`;
    for (let $$index_34 = 0, $$length2 = each_array_35.length; $$index_34 < $$length2; $$index_34++) {
      let tc = each_array_35[$$index_34];
      $$payload.out += `<li><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</li>`;
    }
    $$payload.out += `<!--]--></ol></div> <div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 text-sm"><div class="font-semibold mb-2">Evidence</div> <div class="space-y-2"><!--[-->`;
    for (let $$index_35 = 0, $$length2 = each_array_36.length; $$index_35 < $$length2; $$index_35++) {
      let tc = each_array_36[$$index_35];
      $$payload.out += `<pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
    }
    $$payload.out += `<!--]--></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Duet lanes with connectors</h2> <div class="space-y-8"><!--[-->`;
  for (let $$index_38 = 0, $$length = each_array_37.length; $$index_38 < $$length; $$index_38++) {
    let turn = each_array_37[$$index_38];
    if (turn.assistants.length >= 2) {
      $$payload.out += "<!--[-->";
      const left = turn.assistants[0];
      const right = turn.assistants[1];
      const each_array_38 = ensure_array_like(left.tool_calls || right.tool_calls || []);
      $$payload.out += `<div class="grid grid-cols-[1fr_200px_1fr] gap-4 items-start"><div class="border rounded-lg p-3 text-sm"><div class="text-xs mb-1"><span class="badge badge-xs">${escape_html(left?.metadata?.source)}</span></div> ${escape_html(Array.isArray(left.content) ? left.content.map((c) => typeof c === "string" ? c : c.text).join("") : left.content)}</div> <div class="relative text-xs"><div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-base-300"></div> <div class="space-y-2"><!--[-->`;
      for (let $$index_37 = 0, $$length2 = each_array_38.length; $$index_37 < $$length2; $$index_37++) {
        let tc = each_array_38[$$index_37];
        $$payload.out += `<div class="relative p-2 rounded bg-base-200"><div class="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-base-300"></div> <div class="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-base-300"></div> <div><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <div class="mt-1 line-clamp-3">${escape_html(tc.view?.content || JSON.stringify(tc.arguments))}</div></div>`;
      }
      $$payload.out += `<!--]--></div></div> <div class="border rounded-lg p-3 text-sm"><div class="text-xs mb-1"><span class="badge badge-xs">${escape_html(right?.metadata?.source)}</span></div> ${escape_html(Array.isArray(right.content) ? right.content.map((c) => typeof c === "string" ? c : c.text).join("") : right.content)}</div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Magazine layout</h2> <div class="space-y-8"><!--[-->`;
  for (let $$index_40 = 0, $$length = each_array_39.length; $$index_40 < $$length; $$index_40++) {
    let msg = each_array_39[$$index_40];
    const textContent = Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content;
    $$payload.out += `<article class="prose prose-sm max-w-none"><p><span class="float-left mr-2 text-5xl leading-none font-bold">${escape_html(textContent?.[0] || "")}</span>${escape_html(textContent?.slice(1) || "")}</p> `;
    if (msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_40 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<blockquote>${escape_html(textContent)}</blockquote> <div><!--[-->`;
      for (let $$index_39 = 0, $$length2 = each_array_40.length; $$index_39 < $$length2; $$index_39++) {
        let tc = each_array_40[$$index_39];
        $$payload.out += `<div class="flex items-center gap-2 border-b border-dotted"><span>${escape_html(tc.function)}</span> <div class="flex-1 border-b border-dotted"></div> <span class="text-xs text-gray-500">tool</span></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></article>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Inline chips with inline previews</h2> <div class="space-y-6"><!--[-->`;
  for (let $$index_42 = 0, $$length = each_array_41.length; $$index_42 < $$length; $$index_42++) {
    let msg = each_array_41[$$index_42];
    $$payload.out += `<div class="text-sm"><div class="mb-2">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_42 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="flex flex-wrap gap-2"><!--[-->`;
      for (let $$index_41 = 0, $$length2 = each_array_42.length; $$index_41 < $$length2; $$index_41++) {
        let tc = each_array_42[$$index_41];
        $$payload.out += `<div class="inline-flex items-center gap-2"><span class="px-2 py-0.5 text-[11px] rounded-full bg-base-200"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</span> <code class="text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments))}</code></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Bubbles + avatars + gradient underlines</h2> <div class="space-y-6"><!--[-->`;
  for (let $$index_43 = 0, $$length = each_array_43.length; $$index_43 < $$length; $$index_43++) {
    let msg = each_array_43[$$index_43];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="flex items-start gap-3"><div class="avatar placeholder"><div class="w-8 rounded-full bg-base-200 text-xs"><span>${escape_html(getInitials(source?.name || msg?.metadata?.source || msg.type))}</span></div></div> <div class="rounded-2xl px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-base-100"><div class="mb-1 text-xs">`;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div><span class="bg-gradient-to-r from-transparent via-base-300/40 to-transparent bg-[length:100%_2px] bg-no-repeat bg-[0_100%]">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</span></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Kanban turn view</h2> <div class="space-y-6"><!--[-->`;
  for (let idx = 0, $$length = each_array_44.length; idx < $$length; idx++) {
    let turn = each_array_44[idx];
    const each_array_45 = ensure_array_like(turn.assistants);
    const each_array_46 = ensure_array_like(turn.assistants);
    const each_array_48 = ensure_array_like(turn.assistants);
    $$payload.out += `<div class="grid md:grid-cols-4 gap-3"><div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 text-sm"><div class="font-semibold mb-2">Intent</div> <div>${escape_html(turn.user ? turn.user.content : "System")}</div></div> <div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 text-sm"><div class="font-semibold mb-2">Reasoning</div> <!--[-->`;
    for (let $$index_44 = 0, $$length2 = each_array_45.length; $$index_44 < $$length2; $$index_44++) {
      let a = each_array_45[$$index_44];
      $$payload.out += `<div class="mb-2 last:mb-0"><span class="badge badge-ghost badge-xs mr-2">${escape_html(a?.metadata?.source)}</span> ${escape_html(Array.isArray(a.content) ? a.content.map((c) => typeof c === "string" ? c : c.text).join("") : a.content)}</div>`;
    }
    $$payload.out += `<!--]--></div> <div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 text-sm"><div class="font-semibold mb-2">Calls</div> <!--[-->`;
    for (let $$index_46 = 0, $$length2 = each_array_46.length; $$index_46 < $$length2; $$index_46++) {
      let a = each_array_46[$$index_46];
      if (a.tool_calls?.length) {
        $$payload.out += "<!--[-->";
        const each_array_47 = ensure_array_like(a.tool_calls);
        $$payload.out += `<!--[-->`;
        for (let $$index_45 = 0, $$length3 = each_array_47.length; $$index_45 < $$length3; $$index_45++) {
          let tc = each_array_47[$$index_45];
          $$payload.out += `<div class="text-xs py-1 flex items-center gap-2"><span class="badge badge-info badge-xs">TOOL</span> <span class="font-mono">${escape_html(tc.function)}</span></div>`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div> <div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3 text-sm"><div class="font-semibold mb-2">Results</div> <!--[-->`;
    for (let $$index_48 = 0, $$length2 = each_array_48.length; $$index_48 < $$length2; $$index_48++) {
      let a = each_array_48[$$index_48];
      if (a.tool_calls?.length) {
        $$payload.out += "<!--[-->";
        const each_array_49 = ensure_array_like(a.tool_calls);
        $$payload.out += `<!--[-->`;
        for (let $$index_47 = 0, $$length3 = each_array_49.length; $$index_47 < $$length3; $$index_47++) {
          let tc = each_array_49[$$index_47];
          $$payload.out += `<pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em] mb-2">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Overlay diffs (two models)</h2> <div class="space-y-6">`;
  if (assistants.length >= 2) {
    $$payload.out += "<!--[-->";
    const aMsg = sampleMessages.find((m) => m.type === "assistant" && m?.metadata?.source === assistants[0].name);
    const bMsg = sampleMessages.find((m) => m.type === "assistant" && m?.metadata?.source === assistants[1].name);
    if (aMsg && bMsg) {
      $$payload.out += "<!--[-->";
      const diff = diffWords(
        Array.isArray(aMsg.content) ? aMsg.content.map((c) => typeof c === "string" ? c : c.text).join("") : aMsg.content,
        Array.isArray(bMsg.content) ? bMsg.content.map((c) => typeof c === "string" ? c : c.text).join("") : bMsg.content
      );
      const each_array_50 = ensure_array_like(diff.aTokens);
      const each_array_51 = ensure_array_like(diff.bTokens);
      $$payload.out += `<div class="relative rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-3"><div class="text-xs mb-2 flex items-center gap-2"><span${attr_class(`badge badge-xs ${badgeClassFor(colorForSource(assistants[0].name))}`)}>${escape_html(assistants[0].name)}</span> <span${attr_class(`badge badge-xs ${badgeClassFor(colorForSource(assistants[1].name))}`)}>${escape_html(assistants[1].name)}</span></div> <div class="prose prose-sm max-w-none"><p><!--[-->`;
      for (let $$index_50 = 0, $$length = each_array_50.length; $$index_50 < $$length; $$index_50++) {
        let tok = each_array_50[$$index_50];
        $$payload.out += `<span${attr_class(clsx(tok.d ? "line-through text-red-600/70" : ""))}>${escape_html(tok.t)}</span> `;
      }
      $$payload.out += `<!--]--></p> <p><!--[-->`;
      for (let $$index_51 = 0, $$length = each_array_51.length; $$index_51 < $$length; $$index_51++) {
        let tok = each_array_51[$$index_51];
        $$payload.out += `<span${attr_class(clsx(tok.d ? "underline decoration-green-500/70 underline-offset-4" : ""))}>${escape_html(tok.t)}</span> `;
      }
      $$payload.out += `<!--]--></p></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Density toggle</h2> <div class="mb-2 flex items-center gap-2 text-xs"><label class="label cursor-pointer"><span class="label-text mr-2">Compact</span> <input type="checkbox" class="toggle toggle-xs"${attr("checked", compact, true)}/></label></div> <div${attr_class(`space-y-3 ${"text-sm leading-relaxed"}`)}><!--[-->`;
  for (let $$index_52 = 0, $$length = each_array_52.length; $$index_52 < $$length; $$index_52++) {
    let msg = each_array_52[$$index_52];
    $$payload.out += `<div class="rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-2">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Speech bubbles</h2> <div class="space-y-6"><!--[-->`;
  for (let $$index_55 = 0, $$length = each_array_53.length; $$index_55 < $$length; $$index_55++) {
    let msg = each_array_53[$$index_55];
    const isAssist = isAssistant(msg);
    const source = isAssist ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`flex ${isAssist ? "justify-end" : "justify-start"}`)}><div${attr_class(`relative max-w-3xl ${isAssist ? "items-end" : "items-start"}`)}><div${attr_class(`rounded-2xl px-4 py-3 text-sm shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-base-100 ${isAssist ? "rounded-tr-sm" : "rounded-tl-sm"}`)}><div class="flex items-center gap-2 mb-1"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="leading-relaxed">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssist && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_54 = ensure_array_like(msg.tool_calls);
      const each_array_55 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 flex flex-wrap gap-2"><!--[-->`;
      for (let $$index_53 = 0, $$length2 = each_array_54.length; $$index_53 < $$length2; $$index_53++) {
        let tc = each_array_54[$$index_53];
        $$payload.out += `<div class="text-[11px] px-2 py-0.5 rounded-full bg-base-200"><span class="badge badge-info badge-ghost badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div>`;
      }
      $$payload.out += `<!--]--></div> <div class="mt-2 space-y-2"><!--[-->`;
      for (let $$index_54 = 0, $$length2 = each_array_55.length; $$index_54 < $$length2; $$index_54++) {
        let tc = each_array_55[$$index_54];
        $$payload.out += `<pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <span${attr_class(`absolute ${isAssist ? "right-2" : "left-2"} -bottom-1 block w-3 h-3 bg-base-100 rotate-45 ring-1 ring-black/5 dark:ring-white/10`)}></span></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Margin annotations</h2> <div class="space-y-8"><!--[-->`;
  for (let $$index_58 = 0, $$length = each_array_56.length; $$index_58 < $$length; $$index_58++) {
    let msg = each_array_56[$$index_58];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="grid grid-cols-[1fr_220px] gap-6"><div class="text-sm"><div class="mb-1 flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>`;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_57 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length2 = each_array_57.length; i < $$length2; i++) {
        each_array_57[i];
        $$payload.out += `<sup class="text-[10px] align-super ml-1">[${escape_html(i + 1)}]</sup>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> ${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div></div> <aside class="text-xs space-y-2">`;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_58 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length2 = each_array_58.length; i < $$length2; i++) {
        let tc = each_array_58[i];
        $$payload.out += `<div class="bg-base-200 rounded px-2 py-1"><div class="mb-1 font-medium">[${escape_html(i + 1)}] ${escape_html(tc.function)}</div> <div class="line-clamp-4">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</div></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></aside></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Subway map timeline</h2> <div class="space-y-8"><!--[-->`;
  for (let $$index_61 = 0, $$length = each_array_59.length; $$index_61 < $$length; $$index_61++) {
    let msg = each_array_59[$$index_61];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="relative"><div class="grid grid-cols-[120px_24px_1fr] gap-3 items-start"><div class="text-right text-[11px] text-gray-500 pt-1 space-y-2"><div>KV</div> <div>HTTP</div> <div>Files</div> <div>Other</div></div> <div class="relative"><div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-base-300"></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_60 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length2 = each_array_60.length; i < $$length2; i++) {
        let tc = each_array_60[i];
        const lane = laneForToolCall(tc);
        $$payload.out += `<div class="relative h-8"><div${attr_class(`absolute left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full ${laneClasses[lane].dot}`)}></div></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="text-sm"><div class="flex items-center gap-2 mb-1"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="mb-2">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_61 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="space-y-2"><!--[-->`;
      for (let $$index_60 = 0, $$length2 = each_array_61.length; $$index_60 < $$length2; $$index_60++) {
        let tc = each_array_61[$$index_60];
        const lane = laneForToolCall(tc);
        $$payload.out += `<div class="flex items-start gap-2"><div${attr_class(`mt-1 w-10 h-1.5 rounded ${laneClasses[lane].bar}`)}></div> <div class="text-xs"><div class="mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Ribbons + rings</h2> <div class="space-y-6"><!--[-->`;
  for (let $$index_63 = 0, $$length = each_array_62.length; $$index_63 < $$length; $$index_63++) {
    let msg = each_array_62[$$index_63];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="relative"><div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-base-300 to-transparent rounded"></div> <div class="ml-2 rounded-xl p-3 text-sm shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-base-100"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="prose prose-sm max-w-none"><p>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</p> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_63 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<!--[-->`;
      for (let $$index_62 = 0, $$length2 = each_array_63.length; $$index_62 < $$length2; $$index_62++) {
        let tc = each_array_63[$$index_62];
        $$payload.out += `<pre${attr_class("mt-2 whitespace-pre-wrap leading-snug font-mono text-[0.9em] border-l-2 pl-2", void 0, {
          "border-emerald-500": source?.color === "emerald",
          "border-sky-500": source?.color === "sky",
          "border-violet-500": source?.color === "violet"
        })}>${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Cardless tabs</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_66 = 0, $$length = each_array_64.length; $$index_66 < $$length; $$index_66++) {
    let msg = each_array_64[$$index_66];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_65 = ensure_array_like(msg.tool_calls);
      const each_array_66 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2"><div class="tabs tabs-lifted tabs-xs"><!--[-->`;
      for (let i = 0, $$length2 = each_array_65.length; i < $$length2; i++) {
        let tc = each_array_65[i];
        $$payload.out += `<button type="button" role="tab"${attr_class(`tab ${i === 0 ? "tab-active" : ""}`)}>${escape_html(tc.function)}</button>`;
      }
      $$payload.out += `<!--]--></div> <!--[-->`;
      for (let i = 0, $$length2 = each_array_66.length; i < $$length2; i++) {
        let tc = each_array_66[i];
        $$payload.out += `<div${attr_class(`mt-2 ${i !== 0 ? "hidden" : ""}`)}><pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Evidence stack</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_68 = 0, $$length = each_array_67.length; $$index_68 < $$length; $$index_68++) {
    let msg = each_array_67[$$index_68];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_68 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 divide-y"><!--[-->`;
      for (let $$index_67 = 0, $$length2 = each_array_68.length; $$index_67 < $$length2; $$index_67++) {
        let tc = each_array_68[$$index_67];
        $$payload.out += `<div class="py-2 grid grid-cols-[120px_1fr] items-start gap-3"><div${attr_class(`text-xs font-medium border-l-4 pl-2 ${edgeClassFor(source)}`)}><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <div><pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Source‑accented typography</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_69 = 0, $$length = each_array_69.length; $$index_69 < $$length; $$index_69++) {
    let msg = each_array_69[$$index_69];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="prose prose-sm max-w-none"><p><span${attr_class(`border-b-2 ${edgeClassFor(source)}`)}>Key step:</span> <span>query KV and return greeting.</span></p> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<pre${attr_class("mt-2 whitespace-pre-wrap leading-snug font-mono text-[0.9em] border-l-2 pl-2", void 0, {
        "border-emerald-500": source?.color === "emerald",
        "border-sky-500": source?.color === "sky",
        "border-violet-500": source?.color === "violet"
      })}>${escape_html(msg.tool_calls[0].view?.content || JSON.stringify(msg.tool_calls[0].arguments, null, 2))}</pre>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Status icons row</h2> <div class="space-y-6"><!--[-->`;
  for (let i = 0, $$length = each_array_70.length; i < $$length; i++) {
    let msg = each_array_70[i];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_71 = ensure_array_like(msg.tool_calls);
      const each_array_72 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 flex items-center gap-3"><!--[-->`;
      for (let j = 0, $$length2 = each_array_71.length; j < $$length2; j++) {
        let tc = each_array_71[j];
        $$payload.out += `<a class="tooltip"${attr("href", `#tool_${i}_${j}`)}${attr("data-tip", tc.function)}><span class="text-success">✓</span></a>`;
      }
      $$payload.out += `<!--]--></div> <div class="mt-2 space-y-2"><!--[-->`;
      for (let j = 0, $$length2 = each_array_72.length; j < $$length2; j++) {
        let tc = each_array_72[j];
        $$payload.out += `<div${attr("id", `tool_${i}_${j}`)} class="scroll-mt-16"><div class="text-xs text-gray-500 mb-1">${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Mini swimlane timeline</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_76 = 0, $$length = each_array_73.length; $$index_76 < $$length; $$index_76++) {
    let msg = each_array_73[$$index_76];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_74 = ensure_array_like(["KV", "HTTP", "Files", "Other"]);
      const each_array_76 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3 space-y-2"><div class="grid grid-cols-4 gap-2 text-[11px] text-gray-500"><div class="text-right pr-2">KV</div> <div class="text-right pr-2">HTTP</div> <div class="text-right pr-2">Files</div> <div class="text-right pr-2">Other</div></div> <div class="grid grid-cols-4 gap-2 items-center"><!--[-->`;
      for (let $$index_74 = 0, $$length2 = each_array_74.length; $$index_74 < $$length2; $$index_74++) {
        let laneStr = each_array_74[$$index_74];
        const lane = laneStr;
        const each_array_75 = ensure_array_like(msg.tool_calls.filter((tc) => laneForToolCall(tc) === lane));
        $$payload.out += `<div class="h-2 relative bg-base-200 rounded"><!--[-->`;
        for (let idx = 0, $$length3 = each_array_75.length; idx < $$length3; idx++) {
          each_array_75[idx];
          $$payload.out += `<div${attr_class(`absolute h-2 rounded ${laneClasses[lane].bar}`)}${attr_style(`left:${idx * 18 % 80}%; width:16%`)}></div>`;
        }
        $$payload.out += `<!--]--></div>`;
      }
      $$payload.out += `<!--]--></div> <div class="space-y-1"><!--[-->`;
      for (let $$index_75 = 0, $$length2 = each_array_76.length; $$index_75 < $$length2; $$index_75++) {
        let tc = each_array_76[$$index_75];
        const lane = laneForToolCall(tc);
        $$payload.out += `<div class="flex items-center gap-2"><span${attr_class(`badge badge-ghost badge-xs ${laneClasses[lane].badge}`)}>${escape_html(lane)}</span> <span class="text-xs"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</span> <span class="text-[11px] text-gray-500">ID: ${escape_html(tc.id)}</span></div>`;
      }
      $$payload.out += `<!--]--></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Margin stickies</h2> <div class="space-y-8 relative"><!--[-->`;
  for (let $$index_78 = 0, $$length = each_array_77.length; $$index_78 < $$length; $$index_78++) {
    let msg = each_array_77[$$index_78];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="relative border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_78 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="absolute right-[-12rem] top-0 w-44 space-y-2"><!--[-->`;
      for (let $$index_77 = 0, $$length2 = each_array_78.length; $$index_77 < $$length2; $$index_77++) {
        let tc = each_array_78[$$index_77];
        $$payload.out += `<div class="shadow-sm rounded-md p-2 bg-base-200 text-xs"><div class="mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <div class="line-clamp-3">${escape_html(tc.view?.content || JSON.stringify(tc.arguments))}</div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Notebook cells</h2> <div class="space-y-4"><!--[-->`;
  for (let i = 0, $$length = each_array_79.length; i < $$length; i++) {
    let msg = each_array_79[i];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="grid grid-cols-[80px_1fr] gap-3 items-start"><div class="text-right text-xs text-gray-500 pt-1">`;
    if (isUser(msg)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `In[${escape_html(i)}]`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (isAssistant(msg)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `Out[${escape_html(i)}]`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (isTool(msg)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `Tool[${escape_html(i)}]`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="border rounded p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_80 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
      for (let j = 0, $$length2 = each_array_80.length; j < $$length2; j++) {
        let tc = each_array_80[j];
        $$payload.out += `<div><div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)} <span class="text-gray-500">[${escape_html(i)}.${escape_html(j)}]</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">(Commented out) Chips inline with blocks</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_83 = 0, $$length = each_array_81.length; $$index_83 < $$length; $$index_83++) {
    let msg = each_array_81[$$index_83];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_82 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="flex flex-wrap gap-2 ml-2"><!--[-->`;
      for (let $$index_81 = 0, $$length2 = each_array_82.length; $$index_81 < $$length2; $$index_81++) {
        let tc = each_array_82[$$index_81];
        $$payload.out += `<div class="py-0.5 px-2 text-[11px] border rounded bg-base-200"><span class="badge badge-info badge-ghost badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_83 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
      for (let $$index_82 = 0, $$length2 = each_array_83.length; $$index_82 < $$length2; $$index_82++) {
        let tc = each_array_83[$$index_82];
        $$payload.out += `<div class="border rounded p-2"><pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">1C) Sectional with divider-only</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_85 = 0, $$length = each_array_84.length; $$index_85 < $$length; $$index_85++) {
    let msg = each_array_84[$$index_85];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class(`border rounded-lg text-sm ${stripeClassFor(source)}`)}><div class="p-3"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_85 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_85.length; i < $$length2; i++) {
        let tc = each_array_85[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="my-2 border-t border-dashed border-base-300"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)} <span class="text-gray-500 ml-2">ID: ${escape_html(tc.id)}</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">1C.2) Gutter rail callouts</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_87 = 0, $$length = each_array_86.length; $$index_87 < $$length; $$index_87++) {
    let msg = each_array_86[$$index_87];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="relative border rounded-lg p-3 text-sm">`;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="absolute left-0 top-0 bottom-0 w-1 bg-base-300 rounded-l"></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="ml-3"><div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_87 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-3"><!--[-->`;
      for (let $$index_86 = 0, $$length2 = each_array_87.length; $$index_86 < $$length2; $$index_86++) {
        let tc = each_array_87[$$index_86];
        $$payload.out += `<div class="pl-3 border-l-2 border-base-300"><div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">1C.3) Footnotes style</h2> <div class="space-y-4"><!--[-->`;
  for (let $$index_90 = 0, $$length = each_array_88.length; $$index_90 < $$length; $$index_90++) {
    let msg = each_array_88[$$index_90];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="border rounded-lg p-3 text-sm"><div class="flex items-center gap-2 mb-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>`;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_89 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length2 = each_array_89.length; i < $$length2; i++) {
        each_array_89[i];
        $$payload.out += `<sup class="text-[10px] align-super ml-1">[${escape_html(i + 1)}]</sup>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> ${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_90 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<ol class="mt-2 text-xs space-y-1 list-decimal list-inside"><!--[-->`;
      for (let $$index_89 = 0, $$length2 = each_array_90.length; $$index_89 < $$length2; $$index_89++) {
        let tc = each_array_90[$$index_89];
        $$payload.out += `<li><span class="mr-1"><span class="badge badge-info badge-xs">TOOL</span> ${escape_html(tc.function)}</span> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></li>`;
      }
      $$payload.out += `<!--]--></ol>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></section> <section class="mb-12"><h2 class="text-xl font-semibold mb-3">1C.4) Compact timeline</h2> <div class="relative pl-6"><div class="absolute left-2 top-0 bottom-0 w-px bg-base-300"></div> <div class="space-y-4"><!--[-->`;
  for (let $$index_92 = 0, $$length = each_array_91.length; $$index_92 < $$length; $$index_92++) {
    let msg = each_array_91[$$index_92];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="relative"><div${attr_class(`absolute -left-[7px] top-1 w-3 h-3 rounded-full ${dotClassFor(source)}`)}></div> <div class="border rounded p-2 text-sm"><div class="flex items-center gap-2 mb-1"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div>${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_92 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<ul class="mt-2 space-y-1 list-disc list-inside"><!--[-->`;
      for (let $$index_91 = 0, $$length2 = each_array_92.length; $$index_91 < $$length2; $$index_91++) {
        let tc = each_array_92[$$index_91];
        $$payload.out += `<li><span class="text-xs"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</span> <div class="mt-1 border rounded p-2"><pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div></li>`;
      }
      $$payload.out += `<!--]--></ul>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div></section> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <section class="mb-16"><h2 class="text-2xl font-bold mb-6">Brand‑Inspired Variants</h2> <div class="mb-12 rounded-3xl p-6 bg-gradient-to-b from-white to-base-200 dark:from-zinc-900 dark:to-zinc-800"><h3 class="text-lg font-semibold mb-3">Apple</h3> <div class="space-y-3"><!--[-->`;
  for (let $$index_100 = 0, $$length = each_array_99.length; $$index_100 < $$length; $$index_100++) {
    let msg = each_array_99[$$index_100];
    const isAssist = isAssistant(msg);
    const alignRight = isUser(msg);
    const srcLabel = isAssist ? msg?.metadata?.source || "Assistant" : msg?.metadata?.source || msg.type;
    $$payload.out += `<div${attr_class(`flex ${alignRight ? "justify-end" : "justify-start"}`)}><div${attr_class(`max-w-3xl relative ${alignRight ? "items-end" : "items-start"}`)}><div class="mb-1 flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-300"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> <span class="badge badge-ghost badge-xs">${escape_html(srcLabel)}</span> <button type="button" aria-label="Toggle collapse" class="ml-1 opacity-70 hover:opacity-100"><svg${attr_class(`w-3.5 h-3.5 transition-transform ${isOpenFor(msg.id) ? "rotate-180" : ""}`)} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button></div> <div${attr_class(`px-3 py-2 text-[0.95rem] leading-relaxed shadow-sm ring-1 ring-black/5 dark:ring-white/10 ${alignRight ? "rounded-2xl rounded-tr-sm bg-gradient-to-b from-[#34b3ff] to-[#0a84ff] text-white" : isAssist ? "rounded-2xl rounded-tl-sm backdrop-blur-xl bg-white/60 dark:bg-white/10" : "rounded-xl bg-white/70 dark:bg-white/10"} `)}>`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)} `;
      if (isAssist && msg.tool_calls?.length) {
        $$payload.out += "<!--[-->";
        const each_array_100 = ensure_array_like(msg.tool_calls);
        $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
        for (let $$index_99 = 0, $$length2 = each_array_100.length; $$index_99 < $$length2; $$index_99++) {
          let tc = each_array_100[$$index_99];
          $$payload.out += `<div class="text-xs text-gray-600/90 dark:text-gray-300/90"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}<span class="ml-2 opacity-80">ID: ${escape_html(tc.id)}</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em] text-gray-900 dark:text-gray-100">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> <span${attr_class(`absolute ${alignRight ? "right-2" : "left-2"} -bottom-1 block w-3 h-3 ${alignRight ? "bg-[#0a84ff]" : "bg-white/60 dark:bg-white/10"} rotate-45 ring-1 ring-black/5 dark:ring-white/10`)}></span></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-base-200"><h3 class="text-lg font-semibold mb-3">Material You</h3> <div class="space-y-3"><!--[-->`;
  for (let $$index_102 = 0, $$length = each_array_101.length; $$index_102 < $$length; $$index_102++) {
    let msg = each_array_101[$$index_102];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div${attr_class("rounded-[28px] p-4 shadow-sm", void 0, {
      "bg-emerald-50": source && source.color === "emerald",
      "bg-sky-50": source && source.color === "sky",
      "bg-violet-50": source && source.color === "violet"
    })}><div class="mb-2 flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class("badge badge-xs text-white", void 0, {
        "bg-emerald-600": source?.color === "emerald",
        "bg-sky-600": source?.color === "sky",
        "bg-violet-600": source?.color === "violet"
      })}>${escape_html(source.name)}</span>`;
    } else if (msg?.metadata?.source) {
      $$payload.out += "<!--[1-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs text-gray-500">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button type="button" class="ml-auto text-xs opacity-60 hover:opacity-100">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="rounded-[20px] p-3 bg-base-100">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_102 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3 space-y-2"><!--[-->`;
      for (let $$index_101 = 0, $$length2 = each_array_102.length; $$index_101 < $$length2; $$index_101++) {
        let tc = each_array_102[$$index_101];
        $$payload.out += `<div class="flex flex-wrap gap-2 text-xs"><span class="px-2 py-1 rounded-full bg-base-200">${escape_html(tc.function)}</span> <span class="px-2 py-1 rounded-full bg-base-200">ID: ${escape_html(tc.id)}</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-white dark:bg-base-200"><h3 class="text-lg font-semibold mb-3">Slack</h3> <div class="space-y-2"><!--[-->`;
  for (let $$index_104 = 0, $$length = each_array_103.length; $$index_104 < $$length; $$index_104++) {
    let msg = each_array_103[$$index_104];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="group grid grid-cols-[6px_1fr] gap-3 items-start"><div${attr_class("rounded-full", void 0, {
      "bg-emerald-500": source?.color === "emerald",
      "bg-sky-500": source?.color === "sky",
      "bg-violet-500": source?.color === "violet"
    })}></div> <div class="text-[13px]"><div class="flex items-center gap-2"><span class="font-semibold">${escape_html(msg?.metadata?.source || (isAssistant(msg) ? source?.name : msg.type))}</span> <span class="text-gray-500">·</span> <span class="text-gray-500">now</span> `;
    if (isTool(msg)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs">APP</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <span class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 text-[11px]">⋯</span> <button type="button" class="ml-auto text-[11px] text-gray-500 hover:text-gray-700">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="leading-snug mt-0.5">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_104 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-1 flex flex-wrap gap-2"><!--[-->`;
      for (let $$index_103 = 0, $$length2 = each_array_104.length; $$index_103 < $$length2; $$index_103++) {
        let tc = each_array_104[$$index_103];
        $$payload.out += `<span class="px-2 py-0.5 rounded bg-base-200 text-[11px]">⚙️ ${escape_html(tc.function)} · ID: ${escape_html(tc.id)}</span>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-[#1e1f22] text-gray-100"><h3 class="text-lg font-semibold mb-3">Discord</h3> <div class="space-y-3"><!--[-->`;
  for (let $$index_106 = 0, $$length = each_array_105.length; $$index_106 < $$length; $$index_106++) {
    let msg = each_array_105[$$index_106];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div><div class="flex items-baseline gap-2"><span${attr_class("font-semibold", void 0, {
      "text-emerald-400": source?.color === "emerald",
      "text-sky-400": source?.color === "sky",
      "text-violet-400": source?.color === "violet"
    })}>${escape_html(msg?.metadata?.source || source?.name || msg.type)}</span> <span class="text-xs text-gray-400">today at now</span> <button type="button" class="ml-2 text-[11px] text-gray-400 hover:text-gray-200">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="mt-1 text-sm leading-snug">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_106 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-1"><!--[-->`;
      for (let $$index_105 = 0, $$length2 = each_array_106.length; $$index_105 < $$length2; $$index_105++) {
        let tc = each_array_106[$$index_105];
        $$payload.out += `<div class="bg-[#2b2d31] rounded p-2 text-xs border-l-4 border-[#5865f2]"><span class="text-indigo-300">/tool</span> ${escape_html(tc.function)} <span class="text-gray-400 ml-2">ID: ${escape_html(tc.id)}</span> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.85em] text-gray-300">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-base-100"><h3 class="text-lg font-semibold mb-3">Notion</h3> <div class="space-y-4"><!--[-->`;
  for (let $$index_108 = 0, $$length = each_array_107.length; $$index_108 < $$length; $$index_108++) {
    let msg = each_array_107[$$index_108];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="text-[15px] leading-relaxed">`;
    if (isAssistant(msg)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="rounded-lg p-3 border bg-amber-50/30 dark:bg-amber-900/10"><div class="mb-1 text-xs flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">ASSISTANT</span><span class="badge badge-ghost badge-xs">${escape_html(source?.name || "Assistant")}</span><button type="button" class="ml-auto text-[11px] opacity-60 hover:opacity-100">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div>`;
      if (isOpenFor(msg.id)) {
        $$payload.out += "<!--[-->";
        $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
      }
      $$payload.out += `<!--]--></div></div> `;
      if (msg.tool_calls?.length && isOpenFor(msg.id)) {
        $$payload.out += "<!--[-->";
        const each_array_108 = ensure_array_like(msg.tool_calls);
        $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
        for (let $$index_107 = 0, $$length2 = each_array_108.length; $$index_107 < $$length2; $$index_107++) {
          let tc = each_array_108[$$index_107];
          $$payload.out += `<details class="pl-3 border-l-2 border-base-300"><summary class="cursor-pointer text-xs mb-1 list-none"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)}</summary> <div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)} <span class="text-gray-500 ml-2">ID: ${escape_html(tc.id)}</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></details>`;
        }
        $$payload.out += `<!--]--></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div><div class="mb-1 text-xs flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span>`;
      if (msg?.metadata?.source) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<span class="badge badge-ghost badge-xs">${escape_html(msg.metadata.source)}</span>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--><button type="button" class="ml-auto text-[11px] opacity-60 hover:opacity-100">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> `;
      if (isOpenFor(msg.id)) {
        $$payload.out += "<!--[-->";
        $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
      }
      $$payload.out += `<!--]--></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-base-200"><h3 class="text-lg font-semibold mb-3">Linear</h3> <div class="space-y-3"><!--[-->`;
  for (let $$index_110 = 0, $$length = each_array_109.length; $$index_110 < $$length; $$index_110++) {
    let msg = each_array_109[$$index_110];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="rounded-lg border bg-base-100"><div class="px-3 py-2 text-[12px] uppercase tracking-wide text-gray-500 flex items-center gap-2"><span>${escape_html(msg.type)}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`px-1.5 py-0.5 rounded border ${edgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <span class="ml-auto text-[10px] text-gray-400">⌘K</span> <button type="button" class="ml-2 text-[10px] text-gray-500 hover:text-gray-700">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="px-3 pb-3 border-t"><div class="pt-2">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_110 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
      for (let $$index_109 = 0, $$length2 = each_array_110.length; $$index_109 < $$length2; $$index_109++) {
        let tc = each_array_110[$$index_109];
        $$payload.out += `<div class="text-xs font-semibold">${escape_html(tc.function)} <span class="text-gray-500">(ID: ${escape_html(tc.id)})</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-base-100"><h3 class="text-lg font-semibold mb-3">Superhuman</h3> <div class="space-y-2"><!--[-->`;
  for (let $$index_112 = 0, $$length = each_array_111.length; $$index_112 < $$length; $$index_112++) {
    let msg = each_array_111[$$index_112];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="group rounded-xl border px-4 py-3 bg-white dark:bg-base-200"><div class="flex items-center justify-between"><div class="text-xs flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div> <div class="flex items-center gap-2"><div class="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">E expand · C copy</div> <button type="button" class="text-[10px] text-gray-500 hover:text-gray-700">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div></div> <div class="mt-1 grid md:grid-cols-2 gap-3 items-start"><div>`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_112 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="text-xs space-y-2"><!--[-->`;
      for (let $$index_111 = 0, $$length2 = each_array_112.length; $$index_111 < $$length2; $$index_111++) {
        let tc = each_array_112[$$index_111];
        $$payload.out += `<div class="border rounded p-2"><div class="font-semibold">${escape_html(tc.function)} <span class="text-gray-500">(ID: ${escape_html(tc.id)})</span></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.85em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-[#0a2540] text-slate-100"><h3 class="text-lg font-semibold mb-3">Stripe</h3> <div class="space-y-4"><!--[-->`;
  for (let $$index_114 = 0, $$length = each_array_113.length; $$index_114 < $$length; $$index_114++) {
    let msg = each_array_113[$$index_114];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="rounded-xl overflow-hidden border border-white/10 bg-white/5"><div class="h-1 bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400"></div> <div class="p-4"><div class="text-xs mb-2 flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge badge-xs bg-white/10 text-white">${escape_html(source.name)}</span><span class="text-emerald-300">✔︎</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button type="button" class="ml-auto text-[11px] text-white/70 hover:text-white">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div>`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_114 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3 space-y-2"><!--[-->`;
      for (let i = 0, $$length2 = each_array_114.length; i < $$length2; i++) {
        let tc = each_array_114[i];
        $$payload.out += `<div class="flex items-start gap-2"><div class="mt-1 w-2 h-2 rounded-full bg-cyan-400"></div> <div class="flex-1 text-sm"><div class="text-xs uppercase tracking-wide">${escape_html(tc.function)} <span class="opacity-80 normal-case ml-2">ID: ${escape_html(tc.id)}</span></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-base-200"><h3 class="text-lg font-semibold mb-3">Figma</h3> <div class="space-y-6 relative"><div class="absolute left-3 top-0 bottom-0 w-px bg-base-300"></div> <!--[-->`;
  for (let $$index_116 = 0, $$length = each_array_115.length; $$index_116 < $$length; $$index_116++) {
    let msg = each_array_115[$$index_116];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="grid grid-cols-[24px_1fr] gap-3 items-start"><div class="relative"><div${attr_class("w-3 h-3 rounded-full ring-4 ring-base-200", void 0, {
      "bg-emerald-500": source?.color === "emerald",
      "bg-sky-500": source?.color === "sky",
      "bg-violet-500": source?.color === "violet"
    })}></div></div> <div class="rounded-lg border bg-base-100 p-3 text-sm"><div class="mb-1 flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button type="button" class="ml-auto text-[11px] text-gray-500 hover:text-gray-700">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div>`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_116 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
      for (let $$index_115 = 0, $$length2 = each_array_116.length; $$index_115 < $$length2; $$index_115++) {
        let tc = each_array_116[$$index_115];
        $$payload.out += `<div class="pl-3 border-l-2 border-dashed border-base-300"><div class="text-xs mb-1"><span class="badge badge-info badge-xs mr-1">TOOL</span>${escape_html(tc.function)} <span class="text-gray-500 ml-2">ID: ${escape_html(tc.id)}</span></div> <pre class="whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--> <div class="text-[11px] text-gray-500">Add reply…</div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-white dark:bg-base-200"><h3 class="text-lg font-semibold mb-3">GitHub</h3> <div class="space-y-4"><!--[-->`;
  for (let $$index_118 = 0, $$length = each_array_117.length; $$index_118 < $$length; $$index_118++) {
    let msg = each_array_117[$$index_118];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="rounded-lg border"><div class="px-3 py-2 bg-base-200 text-xs flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (isTool(msg)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge badge-success badge-xs">status: success</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (msg?.metadata?.source && !source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button type="button" class="ml-auto text-[11px] text-gray-500 hover:text-gray-700">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="p-3 text-sm"><div>`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_118 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 divide-y"><!--[-->`;
      for (let $$index_117 = 0, $$length2 = each_array_118.length; $$index_117 < $$length2; $$index_117++) {
        let tc = each_array_118[$$index_117];
        $$payload.out += `<div class="py-2"><div class="text-xs font-semibold"><span class="badge badge-info badge-xs mr-1">CHECK</span>${escape_html(tc.function)}</div> <div class="text-[11px] text-gray-500">ID: ${escape_html(tc.id)}</div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em] bg-gray-50 dark:bg-gray-800 p-2 rounded border">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-base-200"><h3 class="text-lg font-semibold mb-3">Intercom</h3> <div class="space-y-3"><!--[-->`;
  for (let $$index_120 = 0, $$length = each_array_119.length; $$index_120 < $$length; $$index_120++) {
    let msg = each_array_119[$$index_120];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="rounded-2xl bg-white dark:bg-base-100 border p-0 overflow-hidden">`;
    if (isAssistant(msg)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${attr_class("h-6 text-[11px] px-3 grid place-items-center text-white", void 0, {
        "bg-emerald-600": source?.color === "emerald",
        "bg-sky-600": source?.color === "sky",
        "bg-violet-600": source?.color === "violet"
      })}>Automated Assistant</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="p-3 text-sm"><div class="mb-1 flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(msg.type.toUpperCase())}</span> `;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(`badge badge-xs ${badgeClassFor(source)}`)}>${escape_html(source.name)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (msg?.metadata?.source && !source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="badge badge-ghost badge-xs">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button type="button" class="ml-auto text-[11px] text-gray-500 hover:text-gray-700">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div>`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_120 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 flex flex-wrap gap-2 text-xs"><!--[-->`;
      for (let $$index_119 = 0, $$length2 = each_array_120.length; $$index_119 < $$length2; $$index_119++) {
        let tc = each_array_120[$$index_119];
        $$payload.out += `<span class="px-2 py-0.5 rounded-full bg-base-200">${escape_html(tc.function)} · ID: ${escape_html(tc.id)}</span>`;
      }
      $$payload.out += `<!--]--></div> <div class="mt-2 flex gap-2"><button class="btn btn-xs btn-outline">👍 Yes</button> <button class="btn btn-xs btn-outline">👎 No</button> <button class="btn btn-xs btn-outline">Contact support</button></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-rose-50 dark:bg-rose-900/10"><h3 class="text-lg font-semibold mb-3">Airbnb</h3> <div class="space-y-4"><!--[-->`;
  for (let $$index_122 = 0, $$length = each_array_121.length; $$index_122 < $$length; $$index_122++) {
    let msg = each_array_121[$$index_122];
    const source = isAssistant(msg) ? colorForSource(msg?.metadata?.source) : null;
    $$payload.out += `<div class="relative rounded-2xl bg-white dark:bg-base-100 border shadow-sm p-0 overflow-hidden">`;
    if (source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="absolute -top-2 -right-2 text-[10px] px-2 py-1 rounded bg-rose-500 text-white shadow">${escape_html(source.name)}</div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="h-20 w-full bg-[linear-gradient(120deg,#fecdd3,#fce7f3)] opacity-60"></div> <div class="p-4 text-sm">${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}</div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_122 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
      for (let $$index_121 = 0, $$length2 = each_array_122.length; $$index_121 < $$length2; $$index_121++) {
        let tc = each_array_122[$$index_121];
        $$payload.out += `<div class="rounded-lg bg-rose-50 dark:bg-rose-900/20 p-2 border border-rose-200/60 dark:border-rose-800/40 text-sm"><div class="text-xs font-semibold text-rose-600 dark:text-rose-300">${escape_html(tc.function)}</div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-black text-green-100"><h3 class="text-lg font-semibold mb-3">Spotify</h3> <div class="space-y-4"><!--[-->`;
  for (let $$index_124 = 0, $$length = each_array_123.length; $$index_124 < $$length; $$index_124++) {
    let msg = each_array_123[$$index_124];
    $$payload.out += `<div class="rounded-xl border border-green-900/50 bg-green-900/10 p-0 overflow-hidden"><div class="px-3 py-2 flex items-center gap-3 text-sm"><div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> <div class="flex-1">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> <span class="text-[11px] text-emerald-300">${escape_html(msg.type.toUpperCase())}</span> <div class="text-xs text-emerald-300">···</div> <button type="button" class="text-[11px] text-emerald-300 hover:text-white">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_124 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-3"><!--[-->`;
      for (let i = 0, $$length2 = each_array_124.length; i < $$length2; i++) {
        let tc = each_array_124[i];
        if (i > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="h-1 my-3 bg-gradient-to-r from-emerald-400 via-fuchsia-400 to-indigo-400 rounded-full"></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]--> <div class="text-xs text-emerald-300">${escape_html(tc.function)} · ID: ${escape_html(tc.id)}</div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.9em] text-emerald-100/90">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-lime-50 dark:bg-lime-900/10"><h3 class="text-lg font-semibold mb-3">Duolingo</h3> <div class="space-y-3"><!--[-->`;
  for (let $$index_126 = 0, $$length = each_array_125.length; $$index_126 < $$length; $$index_126++) {
    let msg = each_array_125[$$index_126];
    $$payload.out += `<div class="rounded-2xl border bg-white dark:bg-base-100 p-3"><div class="flex items-center gap-2 mb-1"><span class="badge badge-success badge-xs">${escape_html(msg.type.toUpperCase())}</span> <span class="badge badge-warning badge-xs">⭐ Streak</span> <button type="button" class="ml-auto text-[11px] text-gray-500 hover:text-gray-700">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="text-sm">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_126 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2"><!--[-->`;
      for (let $$index_125 = 0, $$length2 = each_array_126.length; $$index_125 < $$length2; $$index_125++) {
        let tc = each_array_126[$$index_125];
        $$payload.out += `<div class="rounded-lg bg-lime-100 dark:bg-lime-900/30 p-2 text-xs"><div class="font-semibold">${escape_html(tc.function)} <span class="text-gray-700 dark:text-gray-300">(ID: ${escape_html(tc.id)})</span></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.85em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div> <div class="mt-2 h-1 rounded bg-lime-200 overflow-hidden"><div class="h-1 bg-lime-500 w-2/3"></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-orange-50 dark:bg-orange-900/10"><h3 class="text-lg font-semibold mb-3">Headspace</h3> <div class="space-y-3"><!--[-->`;
  for (let $$index_128 = 0, $$length = each_array_127.length; $$index_128 < $$length; $$index_128++) {
    let msg = each_array_127[$$index_128];
    $$payload.out += `<div class="rounded-2xl border border-orange-200 dark:border-orange-800/40 bg-white dark:bg-base-100 p-3"><div class="flex items-center gap-2 mb-1"><span class="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span> <span class="text-xs text-orange-700 dark:text-orange-300">mindful</span> <button type="button" class="ml-auto text-[11px] text-orange-700/80 dark:text-orange-300/80 hover:opacity-100">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="text-sm">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_128 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
      for (let $$index_127 = 0, $$length2 = each_array_128.length; $$index_127 < $$length2; $$index_127++) {
        let tc = each_array_128[$$index_127];
        $$payload.out += `<div class="rounded bg-orange-100 dark:bg-orange-900/30 p-2 text-xs"><div class="font-semibold">${escape_html(tc.function)} <span class="text-orange-700/80 dark:text-orange-300/80">(ID: ${escape_html(tc.id)})</span></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.85em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div> <div class="mt-2 grid grid-cols-3 gap-2"><div class="h-2 rounded-full bg-orange-100 overflow-hidden"><div class="h-2 w-1/2 bg-orange-400 animate-pulse"></div></div> <div class="h-2 rounded-full bg-orange-100 overflow-hidden"><div class="h-2 w-1/3 bg-orange-400 animate-pulse"></div></div> <div class="h-2 rounded-full bg-orange-100 overflow-hidden"><div class="h-2 w-2/3 bg-orange-400 animate-pulse"></div></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-black text-white"><h3 class="text-lg font-semibold mb-3">The Verge</h3> <div class="space-y-4"><!--[-->`;
  for (let $$index_129 = 0, $$length = each_array_129.length; $$index_129 < $$length; $$index_129++) {
    let msg = each_array_129[$$index_129];
    $$payload.out += `<div class="rounded-xl overflow-hidden border border-white/10 relative"><div class="h-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-400 [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]"></div> <div class="p-4"><div class="uppercase tracking-widest text-[10px] text-fuchsia-300 mb-1 flex items-center gap-2"><span>${escape_html(msg.type)}</span> `;
    if (msg?.metadata?.source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-[10px] text-white/70">· ${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <button type="button" class="ml-auto text-[11px] text-white/70 hover:text-white">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="text-sm">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 bg-[#0f0f10] text-gray-100"><h3 class="text-lg font-semibold mb-3">Bloomberg</h3> <div class="space-y-3 font-mono text-[13px]"><!--[-->`;
  for (let $$index_131 = 0, $$length = each_array_130.length; $$index_131 < $$length; $$index_131++) {
    let msg = each_array_130[$$index_131];
    $$payload.out += `<div class="rounded border border-white/10 p-3 bg-[#141416]"><div class="grid grid-cols-[120px_1fr] gap-3"><div class="text-gray-400">${escape_html(msg.type.toUpperCase())}</div> <div class="[background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px)],[background-size:6px_1px]"><div class="flex items-center gap-2 text-[11px]"><span class="text-gray-400">SRC</span>`;
    if (msg?.metadata?.source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-gray-200">${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--><button type="button" class="ml-auto text-gray-400 hover:text-gray-200">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> `;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length) {
      $$payload.out += "<!--[-->";
      const each_array_131 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-1"><!--[-->`;
      for (let $$index_130 = 0, $$length2 = each_array_131.length; $$index_130 < $$length2; $$index_130++) {
        let tc = each_array_131[$$index_130];
        $$payload.out += `<div class="grid grid-cols-[120px_1fr] gap-3 items-start"><div class="text-blue-400">${escape_html(tc.function)}<div class="text-[11px] text-gray-400">ID: ${escape_html(tc.id)}</div></div> <pre class="whitespace-pre-wrap leading-snug text-[0.9em] bg-black/30 p-2 rounded border border-white/10">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="mb-12 rounded-3xl p-6 text-cyan-100 bg-[#0b1220] [background-image:radial-gradient(1px_1px_at_20px_20px,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]"><h3 class="text-lg font-semibold mb-3">NASA</h3> <div class="space-y-4"><!--[-->`;
  for (let $$index_133 = 0, $$length = each_array_132.length; $$index_133 < $$length; $$index_133++) {
    let msg = each_array_132[$$index_133];
    $$payload.out += `<div class="rounded-lg border border-cyan-500/20 bg-white/5 p-3"><div class="text-xs mb-1 flex items-center gap-2"><span>🛰️</span><span class="uppercase tracking-wide">${escape_html(msg.type)}</span>`;
    if (msg?.metadata?.source) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="text-cyan-200">· ${escape_html(msg.metadata.source)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--><button type="button" class="ml-auto text-[11px] text-cyan-200/80 hover:text-cyan-100">${escape_html(isOpenFor(msg.id) ? "Collapse" : "Expand")}</button></div> <div class="text-sm">`;
    if (isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      $$payload.out += `${escape_html(Array.isArray(msg.content) ? msg.content.map((c) => typeof c === "string" ? c : c.text).join("") : msg.content)}`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span class="text-xs opacity-70">(collapsed)</span>`;
    }
    $$payload.out += `<!--]--></div> `;
    if (isAssistant(msg) && msg.tool_calls?.length && isOpenFor(msg.id)) {
      $$payload.out += "<!--[-->";
      const each_array_133 = ensure_array_like(msg.tool_calls);
      $$payload.out += `<div class="mt-2 space-y-2"><!--[-->`;
      for (let $$index_132 = 0, $$length2 = each_array_133.length; $$index_132 < $$length2; $$index_132++) {
        let tc = each_array_133[$$index_132];
        $$payload.out += `<div class="pl-3 border-l-2 border-dotted border-cyan-400/50"><div class="text-xs text-cyan-300">Uplink · ${escape_html(tc.function)} <span class="ml-2 text-cyan-200/80">ID: ${escape_html(tc.id)}</span></div> <pre class="mt-1 whitespace-pre-wrap leading-snug font-mono text-[0.85em]">${escape_html(tc.view?.content || JSON.stringify(tc.arguments, null, 2))}</pre></div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></div></div></section></div> <div class="pb-8"></div></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-HP7ZSZ9w.js.map
