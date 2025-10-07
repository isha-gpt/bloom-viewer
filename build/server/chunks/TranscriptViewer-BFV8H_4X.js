import { x as push, z as pop, J as escape_html, N as ensure_array_like, F as attr, P as attr_class, O as stringify, Q as attr_style, G as store_get, V as clsx, I as unsubscribe_stores } from './index-CeukPVPf.js';
import { c as createTranscriptLoader } from './transcript.svelte-BEaYfmNG.js';
import fastJsonPatch from 'fast-json-patch';
import { t as themeString } from './theme--C4x6dAj.js';
import markdownit from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import plaintext from 'highlight.js/lib/languages/plaintext';
import { b as extractFirstSentence } from './transcript-utils-BY7i01oF.js';

function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const EditOperation = {
  ADD: "add",
  RESET: "reset",
  JSON_PATCH: "json_patch"
};
const isAddOperation = (edit) => edit.operation === EditOperation.ADD;
const isResetOperation = (edit) => edit.operation === EditOperation.RESET;
const isJsonPatchOperation = (edit) => edit.operation === EditOperation.JSON_PATCH;
const { applyPatch } = fastJsonPatch;
function getBranchTitle(branchIndex, edit) {
  if (branchIndex === 0) {
    return "Original";
  }
  if (edit && isJsonPatchOperation(edit) && edit.name) {
    return edit.name;
  }
  return `Branch ${branchIndex}`;
}
function addColumnIfNotEmpty(columns, column) {
  if (column.messages.length > 0) {
    columns.push({ ...column });
  }
}
function createColumn(columnIndex, edit, editNumber = 0) {
  return {
    id: `column-${columnIndex}`,
    title: getBranchTitle(columnIndex, edit),
    messages: [],
    editNumber
  };
}
function getMessageFromAddEdit(edit) {
  if (isAddOperation(edit)) {
    return edit.message;
  }
  return null;
}
function getNewMessagesFromResetEdit(edit) {
  if (isResetOperation(edit)) {
    return edit.new_messages || [];
  }
  return [];
}
function getPatchFromJsonEdit(edit) {
  if (isJsonPatchOperation(edit)) {
    return edit.patch;
  }
  return [];
}
function extractAvailableViews(events) {
  console.log("🔍 [DEBUG] extractAvailableViews called with", events.length, "events");
  const viewSet = /* @__PURE__ */ new Set();
  const transcriptEvents = events.filter((event) => event.type === "transcript_event");
  console.log("📋 [DEBUG] Found", transcriptEvents.length, "transcript events");
  for (const event of transcriptEvents) {
    if (Array.isArray(event.view)) {
      event.view.forEach((view) => viewSet.add(view));
    } else {
      viewSet.add(event.view);
    }
  }
  const result = Array.from(viewSet).sort();
  console.log("✅ [DEBUG] extractAvailableViews returning:", result);
  return result;
}
function eventAppliesToView(event, targetView) {
  if (Array.isArray(event.view)) {
    return event.view.includes(targetView);
  }
  return event.view === targetView;
}
function normalizeRawMessage(raw, viewSource, eventId) {
  const baseProps = {
    id: raw.id ?? void 0,
    metadata: raw.metadata ?? void 0,
    isShared: false,
    viewSource,
    eventId
  };
  switch (raw.role) {
    case "system":
      return { type: "system", content: raw.content, ...baseProps };
    case "user":
      return { type: "user", content: raw.content, ...baseProps };
    case "assistant":
      return {
        type: "assistant",
        content: raw.content,
        tool_calls: raw.tool_calls ?? void 0,
        ...baseProps
      };
    case "tool": {
      return {
        type: "tool",
        content: raw.content,
        tool_call_id: raw.tool_call_id ?? void 0,
        function: raw.function ?? void 0,
        error: raw.error ?? void 0,
        ...baseProps
      };
    }
    default:
      return {
        type: "system",
        content: raw.content,
        ...baseProps
      };
  }
}
function parseTranscriptEvents(events, view, showApiFailures = false) {
  console.log("🔄 [DEBUG] parseTranscriptEvents called:", { eventsLength: events?.length || 0, view, showApiFailures });
  if (!events || !Array.isArray(events)) {
    console.error("🚨 [ERROR] parseTranscriptEvents: events is not a valid array:", events);
    return [];
  }
  const columns = [];
  let currentMessages = [];
  let editNumber = 0;
  let currentColumn = {
    id: "column-0",
    title: "Original",
    messages: [],
    editNumber: 0
  };
  const transcriptEvents = events.filter((event) => event.type === "transcript_event");
  const infoEvents = events.filter((event) => event.type === "info_event");
  console.log("📋 [DEBUG] Filtered transcript events:", transcriptEvents.length, "info events:", infoEvents.length);
  const allRelevantEvents = [
    ...transcriptEvents.filter((event) => eventAppliesToView(event, view)),
    ...infoEvents
    // Info events don't have view filtering - they appear in all views
  ].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
    return 0;
  });
  console.log("🎯 [DEBUG] All relevant events for view", view + ":", allRelevantEvents.length);
  for (let i = 0; i < allRelevantEvents.length; i++) {
    const event = allRelevantEvents[i];
    editNumber++;
    if (event.type === "info_event") {
      const infoMessage = {
        type: "info",
        id: event.id,
        info: event.info,
        timestamp: event.timestamp,
        isShared: false,
        viewSource: "info",
        // Mark as coming from info events
        eventId: event.id
      };
      currentMessages.push(infoMessage);
      currentColumn.messages.push(infoMessage);
    } else if (event.type === "transcript_event" && isAddOperation(event.edit)) {
      const raw = getMessageFromAddEdit(event.edit);
      if (!raw) continue;
      const message = normalizeRawMessage(raw, event.view, event.id);
      if (message.type === "api_failure" && !showApiFailures) {
        continue;
      }
      currentMessages.push(message);
      currentColumn.messages.push(message);
    } else if (event.type === "transcript_event" && event.edit.operation === "rollback") {
      const rollbackEdit = event.edit;
      addColumnIfNotEmpty(columns, currentColumn);
      currentColumn = createColumn(columns.length, event.edit, editNumber);
      let rollbackIndex = currentMessages.length;
      if (rollbackEdit.to_id) {
        const targetIndex = currentMessages.findIndex((msg) => msg.id === rollbackEdit.to_id);
        if (targetIndex !== -1) {
          rollbackIndex = targetIndex + 1;
        }
      } else if (rollbackEdit.count) {
        const rollbackCount = Math.min(rollbackEdit.count, currentMessages.length);
        rollbackIndex = currentMessages.length - rollbackCount;
      }
      currentMessages = currentMessages.slice(0, rollbackIndex);
      currentColumn.messages = currentMessages.map((msg) => ({
        ...msg,
        isShared: true
      }));
    } else if (event.type === "transcript_event" && isResetOperation(event.edit)) {
      addColumnIfNotEmpty(columns, currentColumn);
      currentColumn = createColumn(columns.length, event.edit, editNumber);
      const newMessages = getNewMessagesFromResetEdit(event.edit);
      const messagesWithFlags = newMessages.map(
        (raw) => normalizeRawMessage(raw, event.view, event.id)
      );
      currentMessages = messagesWithFlags;
      currentColumn.messages = [...currentMessages];
    } else if (event.type === "transcript_event" && isJsonPatchOperation(event.edit)) {
      try {
        const ops = getPatchFromJsonEdit(event.edit);
        const result = applyPatch(
          currentMessages,
          ops,
          /*validate*/
          false,
          /*mutateDocument*/
          false
        );
        const nextMessagesRaw = result.newDocument;
        if (!Array.isArray(nextMessagesRaw)) {
          continue;
        }
        const nextMessages = nextMessagesRaw.map((m) => {
          if (m && typeof m === "object" && "role" in m) {
            return normalizeRawMessage(m, event.view, event.id);
          }
          return m;
        });
        const normalize = (msg) => {
          const { isShared, viewSource, eventId, ...rest } = msg || {};
          return rest;
        };
        const areEqual = (a, b) => JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));
        let prefixLen = 0;
        const maxPrefix = Math.min(currentMessages.length, nextMessages.length);
        while (prefixLen < maxPrefix && areEqual(currentMessages[prefixLen], nextMessages[prefixLen])) {
          prefixLen++;
        }
        const oldIsPrefix = prefixLen === currentMessages.length && currentMessages.length <= nextMessages.length;
        if (!oldIsPrefix) {
          addColumnIfNotEmpty(columns, currentColumn);
          currentColumn = createColumn(columns.length, event.edit, editNumber);
          const messagesWithFlags = nextMessages.map((msg, index) => ({
            ...msg,
            isShared: index < prefixLen,
            viewSource: msg.viewSource ?? event.view,
            eventId: msg.eventId ?? event.id
          }));
          currentMessages = messagesWithFlags;
          currentColumn.messages = [...currentMessages];
        } else {
          const messagesWithFlags = nextMessages.map((msg) => ({
            ...msg,
            isShared: msg.isShared ?? false,
            viewSource: msg.viewSource ?? event.view,
            eventId: msg.eventId ?? event.id
          }));
          currentMessages = messagesWithFlags;
          currentColumn.messages = [...currentMessages];
          if (currentColumn.title === "Original" && isJsonPatchOperation(event.edit) && event.edit.name) {
            currentColumn.title = event.edit.name;
          }
        }
      } catch (e) {
        console.error("Failed to apply JSON patch edit", e);
      }
    }
  }
  console.log("➕ [DEBUG] Adding final column with", currentColumn.messages.length, "messages");
  currentColumn.editNumber = editNumber;
  addColumnIfNotEmpty(columns, currentColumn);
  console.log("✅ [DEBUG] parseTranscriptEvents completed, returning", columns.length, "columns");
  return columns;
}
function getJsonType(value) {
  if (value === null) return "null";
  if (value === void 0) return "undefined";
  if (Array.isArray(value)) return "array";
  const type = typeof value;
  if (type === "number") {
    if (isNaN(value)) return "nan";
    if (value % 1 !== 0) return "float";
    return "integer";
  }
  if (type === "object" && value instanceof Date) return "date";
  return type;
}
function isExpandable(value) {
  return Array.isArray(value) || typeof value === "object" && value !== null && !(value instanceof Date);
}
function getObjectSize(value) {
  if (Array.isArray(value)) {
    return value.length;
  }
  if (typeof value === "object" && value !== null) {
    return Object.keys(value).length;
  }
  return 0;
}
function shouldCollapseString(str, collapseAfter) {
  if (typeof collapseAfter !== "number") return false;
  return str.length > collapseAfter;
}
function truncateString(str, length) {
  if (str.length <= length) return str;
  return str.substring(0, length);
}
function escapeString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}
function shouldRenderInline(value, inlineShortContainers, collapseStringsAfterLength) {
  if (!inlineShortContainers) return false;
  let maxLength;
  if (typeof inlineShortContainers === "number") {
    maxLength = inlineShortContainers;
  } else {
    maxLength = 40;
  }
  const inlineString = getInlineString(value, collapseStringsAfterLength);
  return inlineString.length <= maxLength;
}
function getInlineString(value, collapseStringsAfterLength) {
  if (Array.isArray(value)) {
    const items = value.map((item) => {
      if (isExpandable(item)) {
        return getInlineString(item, collapseStringsAfterLength);
      } else {
        return formatPrimitiveValue(item, collapseStringsAfterLength);
      }
    });
    return `[${items.join(", ")}]`;
  }
  if (typeof value === "object" && value !== null && !(value instanceof Date)) {
    const pairs = Object.entries(value).map(([key, val]) => {
      const formattedValue = isExpandable(val) ? getInlineString(val, collapseStringsAfterLength) : formatPrimitiveValue(val, collapseStringsAfterLength);
      return `"${key}": ${formattedValue}`;
    });
    return `{${pairs.join(", ")}}`;
  }
  return formatPrimitiveValue(value, collapseStringsAfterLength);
}
function formatPrimitiveValue(value, collapseStringsAfterLength) {
  if (value === null) return "null";
  if (value === void 0) return "undefined";
  if (typeof value === "string") {
    let stringValue = value;
    if (collapseStringsAfterLength && stringValue.length > collapseStringsAfterLength) {
      stringValue = truncateString(stringValue, collapseStringsAfterLength) + "...";
    }
    return `"${escapeString(stringValue)}"`;
  }
  if (typeof value === "number") {
    if (isNaN(value)) return "NaN";
    if (value === Infinity) return "Infinity";
    if (value === -Infinity) return "-Infinity";
    return String(value);
  }
  if (typeof value === "boolean") return String(value);
  if (value instanceof Date) return value.toISOString();
  return String(value);
}
function JsonMeta($$payload, $$props) {
  push();
  const { value, displayObjectSize = true, displayArrayKey = true } = $$props;
  const size = getObjectSize(value);
  const isArray = Array.isArray(value);
  const isObject = typeof value === "object" && value !== null && !Array.isArray(value);
  const shouldShowMeta = displayObjectSize && (isArray || isObject) && size > 0;
  const metaText = isArray ? size === 1 ? "1 item" : `${size} items` : isObject ? size === 1 ? "1 key" : `${size} keys` : "";
  if (shouldShowMeta) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="json-meta svelte-7teum4">${escape_html(metaText)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function JsonProperty($$payload, $$props) {
  const { name, displayArrayKey = true, isArrayIndex = false } = $$props;
  const shouldShow = !isArrayIndex || displayArrayKey;
  const displayName = isArrayIndex ? `[${name}]` : `"${name}"`;
  if (shouldShow) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="json-property svelte-1juhblb">${escape_html(displayName)}</span><span class="json-colon svelte-1juhblb">: </span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function JsonString($$payload, $$props) {
  push();
  const { value, collapseStringsAfterLength = 50 } = $$props;
  const isCollapsible = shouldCollapseString(value, collapseStringsAfterLength);
  const escapedValue = escapeString(value);
  const displayValue = isCollapsible && true && collapseStringsAfterLength ? truncateString(escapedValue, collapseStringsAfterLength) : escapedValue;
  const showEllipsis = isCollapsible && true;
  const truncatedLength = isCollapsible && true && collapseStringsAfterLength ? collapseStringsAfterLength : null;
  $$payload.out += `<span class="json-string svelte-od3rcy"><span class="json-quote svelte-od3rcy">"</span><span${attr_class("json-string-content svelte-od3rcy", void 0, { "clickable": isCollapsible })}${attr("role", isCollapsible ? "button" : void 0)}${attr("tabindex", isCollapsible ? 0 : void 0)}>${escape_html(displayValue)}`;
  if (showEllipsis) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="json-ellipsis svelte-od3rcy">...</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span><span class="json-quote svelte-od3rcy">"</span>`;
  if (truncatedLength) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="json-truncate-indicator svelte-od3rcy">${escape_html(value.length)} chars</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span>`;
  pop();
}
function JsonValue($$payload, $$props) {
  push();
  const {
    value,
    displayDataTypes = false,
    collapseStringsAfterLength = 50
  } = $$props;
  const type = getJsonType(value);
  const displayValue = (() => {
    switch (type) {
      case "string":
        return value;
      case "integer":
      case "float":
        return String(value);
      case "boolean":
        return String(value);
      case "null":
        return "null";
      case "undefined":
        return "undefined";
      case "nan":
        return "NaN";
      case "date":
        return value.toISOString();
      default:
        return String(value);
    }
  })();
  $$payload.out += `<span${attr_class(`json-value json-${stringify(type)}`, "svelte-feu0by")}>`;
  if (displayDataTypes) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="json-data-type svelte-feu0by">${escape_html(type)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (type === "string") {
    $$payload.out += "<!--[-->";
    JsonString($$payload, { value, collapseStringsAfterLength });
  } else if (type === "null" || type === "undefined" || type === "nan") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<span class="json-special-value svelte-feu0by">${escape_html(displayValue)}</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span class="json-primitive-value svelte-feu0by">${escape_html(displayValue)}</span>`;
  }
  $$payload.out += `<!--]--></span>`;
  pop();
}
function ExpandIcon($$payload, $$props) {
  const { expanded } = $$props;
  $$payload.out += `<button${attr_class("expand-icon svelte-1f2qjvn", void 0, { "expanded": expanded })}${attr("aria-label", expanded ? "Collapse" : "Expand")}><svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="svelte-1f2qjvn"><path d="M4 3L8 6L4 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`;
}
function ContainerWrapper($$payload, $$props) {
  push();
  const {
    hasItems,
    name,
    depth = 0,
    collapsed = false,
    displayArrayKey = true,
    collapseStringsAfterLength = 50,
    indentWidth = 12,
    isLast = false,
    isRoot = false,
    inlineShortContainers = false,
    inline = false,
    inlineView,
    collapsedView,
    expandedView,
    emptyView,
    value
  } = $$props;
  const indentStyle = `margin-left: ${isRoot ? 0 : indentWidth}px`;
  shouldRenderInline(value, inlineShortContainers, collapseStringsAfterLength);
  let expanded = true;
  let hovered = false;
  const isArray = Array.isArray(value);
  const openBrace = isArray ? "[" : "{";
  const braceClass = isArray ? "json-bracket" : "json-brace";
  if (inline) {
    $$payload.out += "<!--[-->";
    inlineView($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class("json-container svelte-yd5q3w", void 0, { "hovered": hovered, "root": isRoot })}${attr_style(indentStyle)} role="group"><div class="json-container-header svelte-yd5q3w">`;
    if (hasItems) {
      $$payload.out += "<!--[-->";
      ExpandIcon($$payload, { expanded });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (name !== void 0) {
      $$payload.out += "<!--[-->";
      JsonProperty($$payload, { name, displayArrayKey, isArrayIndex: false });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (hasItems && expanded) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span${attr_class(clsx(braceClass), "svelte-yd5q3w")}>${escape_html(openBrace)}</span>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (!hasItems) {
      $$payload.out += "<!--[-->";
      emptyView($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[1-->";
    }
    $$payload.out += `<!--]--></div>`;
    if (hasItems && expanded) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="json-expanded-content svelte-yd5q3w">`;
      expandedView($$payload);
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function JsonArray($$payload, $$props) {
  push();
  const {
    value,
    name,
    depth = 0,
    collapsed = false,
    displayObjectSize = true,
    displayArrayKey = true,
    collapseStringsAfterLength = 50,
    displayDataTypes = false,
    sortKeys = false,
    indentWidth = 12,
    isLast = false,
    isRoot = false,
    inlineShortContainers = false,
    inline = false,
    inlineRoot = false
  } = $$props;
  const hasItems = value.length > 0;
  {
    let inlineView = function($$payload2) {
      const each_array = ensure_array_like(value);
      $$payload2.out += `<span class="json-bracket svelte-1ctktzs">[</span><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let item = each_array[index];
        if (isExpandable(item)) {
          $$payload2.out += "<!--[-->";
          if (Array.isArray(item)) {
            $$payload2.out += "<!--[-->";
            JsonArray($$payload2, { value: item, inlineShortContainers, inline: true });
          } else if (item !== null && typeof item === "object") {
            $$payload2.out += "<!--[1-->";
            JsonObject($$payload2, { value: item, inlineShortContainers, inline: true });
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          JsonValue($$payload2, { value: item, displayDataTypes, collapseStringsAfterLength });
        }
        $$payload2.out += `<!--]-->`;
        if (index < value.length - 1) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span class="json-comma svelte-1ctktzs">, </span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]-->`;
      if (!inlineRoot) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="json-bracket svelte-1ctktzs">]</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    }, collapsedView = function($$payload2) {
      $$payload2.out += `<span class="json-bracket svelte-1ctktzs">[</span> `;
      JsonMeta($$payload2, { value, displayObjectSize, displayArrayKey });
      $$payload2.out += `<!----> <span class="json-ellipsis svelte-1ctktzs">...</span> <span class="json-bracket svelte-1ctktzs">]</span>`;
    }, expandedView = function($$payload2) {
      const each_array_1 = ensure_array_like(value);
      $$payload2.out += `<div class="json-array-content svelte-1ctktzs"><!--[-->`;
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let item = each_array_1[index];
        $$payload2.out += `<div class="json-array-item svelte-1ctktzs">`;
        if (isExpandable(item)) {
          $$payload2.out += "<!--[-->";
          if (Array.isArray(item)) {
            $$payload2.out += "<!--[-->";
            JsonArray($$payload2, {
              value: item,
              depth: depth + 1,
              collapsed,
              displayObjectSize,
              displayArrayKey,
              collapseStringsAfterLength,
              displayDataTypes,
              sortKeys,
              indentWidth,
              inlineShortContainers,
              isLast: index === value.length - 1
            });
          } else if (item !== null && typeof item === "object") {
            $$payload2.out += "<!--[1-->";
            JsonObject($$payload2, {
              value: item,
              depth: depth + 1,
              collapsed,
              displayObjectSize,
              displayArrayKey,
              collapseStringsAfterLength,
              displayDataTypes,
              sortKeys,
              indentWidth,
              inlineShortContainers,
              isLast: index === value.length - 1
            });
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div class="json-array-primitive svelte-1ctktzs"${attr_style(`margin-left: ${stringify(indentWidth)}px`)}>`;
          JsonValue($$payload2, { value: item, displayDataTypes, collapseStringsAfterLength });
          $$payload2.out += `<!---->`;
          if (index < value.length - 1) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<span class="json-comma svelte-1ctktzs">,</span>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!--]--></div> <div class="json-array-footer svelte-1ctktzs"><span class="json-bracket svelte-1ctktzs">]</span> `;
      if (!isLast && !isRoot) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="json-comma svelte-1ctktzs">,</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }, emptyView = function($$payload2) {
      $$payload2.out += `<span class="json-bracket svelte-1ctktzs">[]</span> `;
      if (!isLast && !isRoot) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="json-comma svelte-1ctktzs">,</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    };
    ContainerWrapper($$payload, {
      value,
      name,
      depth,
      collapsed,
      displayArrayKey,
      collapseStringsAfterLength,
      indentWidth,
      isLast,
      isRoot,
      inlineShortContainers,
      inline,
      hasItems,
      inlineView,
      collapsedView,
      expandedView,
      emptyView
    });
  }
  pop();
}
function JsonObject($$payload, $$props) {
  push();
  const {
    value,
    name,
    depth = 0,
    collapsed = false,
    displayObjectSize = true,
    displayArrayKey = true,
    collapseStringsAfterLength = 50,
    displayDataTypes = false,
    sortKeys = false,
    indentWidth = 12,
    isLast = false,
    isRoot = false,
    inlineShortContainers = false,
    inline = false,
    inlineRoot = false
  } = $$props;
  const keys = Object.keys(value || {});
  const hasItems = keys.length > 0 || Object.keys(value).length > 0;
  {
    let inlineView = function($$payload2) {
      const each_array = ensure_array_like(keys);
      $$payload2.out += `<span class="json-brace svelte-1iuouau">{</span><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let key = each_array[index];
        JsonProperty($$payload2, { name: key, displayArrayKey: false, isArrayIndex: false });
        $$payload2.out += `<!---->`;
        if (isExpandable(value[key])) {
          $$payload2.out += "<!--[-->";
          if (Array.isArray(value[key])) {
            $$payload2.out += "<!--[-->";
            JsonArray($$payload2, { value: value[key], inlineShortContainers, inline: true });
          } else {
            $$payload2.out += "<!--[!-->";
            JsonObject($$payload2, { value: value[key], inlineShortContainers, inline: true });
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          JsonValue($$payload2, {
            value: value[key],
            displayDataTypes,
            collapseStringsAfterLength
          });
        }
        $$payload2.out += `<!--]-->`;
        if (index < keys.length - 1) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span class="json-comma svelte-1iuouau">, </span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]-->`;
      if (!inlineRoot) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="json-brace svelte-1iuouau">}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    }, collapsedView = function($$payload2) {
      $$payload2.out += `<span class="json-brace svelte-1iuouau">{</span> `;
      JsonMeta($$payload2, { value, displayObjectSize, displayArrayKey });
      $$payload2.out += `<!----> <span class="json-ellipsis svelte-1iuouau">...</span> <span class="json-brace svelte-1iuouau">}</span>`;
    }, expandedView = function($$payload2) {
      const each_array_1 = ensure_array_like(keys);
      $$payload2.out += `<div class="json-object-content svelte-1iuouau"><!--[-->`;
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let key = each_array_1[index];
        $$payload2.out += `<div class="json-object-item svelte-1iuouau">`;
        if (isExpandable(value[key])) {
          $$payload2.out += "<!--[-->";
          if (Array.isArray(value[key])) {
            $$payload2.out += "<!--[-->";
            JsonArray($$payload2, {
              value: value[key],
              name: key,
              depth: depth + 1,
              collapsed,
              displayObjectSize,
              displayArrayKey,
              collapseStringsAfterLength,
              displayDataTypes,
              sortKeys,
              indentWidth,
              inlineShortContainers,
              isLast: index === keys.length - 1
            });
          } else {
            $$payload2.out += "<!--[!-->";
            JsonObject($$payload2, {
              value: value[key],
              name: key,
              depth: depth + 1,
              collapsed,
              displayObjectSize,
              displayArrayKey,
              collapseStringsAfterLength,
              displayDataTypes,
              sortKeys,
              indentWidth,
              inlineShortContainers,
              isLast: index === keys.length - 1
            });
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div class="json-object-primitive svelte-1iuouau"${attr_style(`margin-left: ${stringify(indentWidth)}px`)}>`;
          JsonProperty($$payload2, { name: key, displayArrayKey, isArrayIndex: false });
          $$payload2.out += `<!---->`;
          JsonValue($$payload2, {
            value: value[key],
            displayDataTypes,
            collapseStringsAfterLength
          });
          $$payload2.out += `<!---->`;
          if (index < keys.length - 1) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<span class="json-comma svelte-1iuouau">,</span>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!--]--></div><div class="json-object-footer svelte-1iuouau"><span class="json-brace svelte-1iuouau">}</span> `;
      if (!isLast && !isRoot) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="json-comma svelte-1iuouau">,</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }, emptyView = function($$payload2) {
      $$payload2.out += `<span class="json-brace svelte-1iuouau">{}</span> `;
      if (!isLast && !isRoot) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="json-comma svelte-1iuouau">,</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    };
    ContainerWrapper($$payload, {
      value,
      name,
      depth,
      collapsed,
      displayArrayKey,
      collapseStringsAfterLength,
      indentWidth,
      isLast,
      isRoot,
      inlineShortContainers,
      inline,
      hasItems,
      inlineView,
      collapsedView,
      expandedView,
      emptyView
    });
  }
  pop();
}
function JsonViewer($$payload, $$props) {
  push();
  const {
    value,
    theme = "light",
    collapsed = false,
    collapseStringsAfterLength = 50,
    indentWidth = 12,
    sortKeys = false,
    displayDataTypes = false,
    displayObjectSize = true,
    displayArrayKey = false,
    inlineShortContainers = false
  } = $$props;
  const jsonType = getJsonType(value);
  const expandableValue = isExpandable(value);
  $$payload.out += `<div${attr_class("json-viewer svelte-cnbzbd", void 0, {
    "light": (
      // Apply theme when it changes
      theme === "light"
    ),
    "dark": theme === "dark"
  })}>`;
  if (expandableValue) {
    $$payload.out += "<!--[-->";
    if (jsonType === "array") {
      $$payload.out += "<!--[-->";
      JsonArray($$payload, {
        value,
        depth: 0,
        collapsed,
        displayObjectSize,
        displayArrayKey,
        collapseStringsAfterLength,
        displayDataTypes,
        sortKeys,
        indentWidth,
        inlineShortContainers,
        isRoot: true
      });
    } else {
      $$payload.out += "<!--[!-->";
      JsonObject($$payload, {
        value,
        depth: 0,
        collapsed,
        displayObjectSize,
        displayArrayKey,
        collapseStringsAfterLength,
        displayDataTypes,
        sortKeys,
        indentWidth,
        inlineShortContainers,
        isRoot: true
      });
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    JsonValue($$payload, { value, displayDataTypes, collapseStringsAfterLength });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function toolMessage($$payload, message) {
  $$payload.out += `<div class="space-y-2">`;
  if (message.error) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="whitespace-pre-wrap leading-snug text-[0.9em] text-red-600 dark:text-red-400 overflow-x-auto">${escape_html(message.error.message)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (message.content) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="whitespace-pre-wrap font-mono text-[0.9em] leading-snug text-sm text-gray-900 dark:text-gray-100 overflow-x-auto">${escape_html(message.content)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
}
function apiFailureMessage($$payload, message) {
  $$payload.out += `<div class="space-y-2"><div class="flex items-center gap-2 mb-2"><span class="badge badge-error badge-sm">API FAILURE</span> <span class="text-xs text-red-600 dark:text-red-400">${escape_html(message.error_category)}</span> `;
  if (message.recoverable) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="text-xs text-orange-600 dark:text-orange-400">(recoverable)</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="font-mono text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-700/50 text-gray-900 dark:text-red-100">${escape_html(message.error_message)}</div></div>`;
}
function MessageCard($$payload, $$props) {
  push();
  var $$store_subs;
  hljs.registerLanguage("python", python);
  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("plaintext", plaintext);
  let {
    message,
    messageIndex,
    isOpen,
    isVisible = true
  } = $$props;
  function extractTextFromContent(content) {
    if (typeof content === "string") {
      return content;
    }
    if (Array.isArray(content)) {
      const textParts = [];
      for (const item of content) {
        if (typeof item === "string") {
          textParts.push(item);
        } else if (typeof item === "object" && item !== null && item.type === "text") {
          textParts.push(item.text || "");
        }
      }
      return textParts.join("");
    }
    return null;
  }
  function hashStringToColor(str) {
    if (!str) return "badge-neutral";
    let hash = 42;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const colors = [
      "badge-primary",
      "badge-secondary",
      "badge-accent",
      "badge-info",
      "badge-success",
      "badge-warning"
    ];
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  }
  const md = markdownit({
    html: true,
    linkify: true,
    breaks: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
        } catch {
        }
      }
      return "";
    }
  });
  function renderMarkdown(content) {
    try {
      return md.render(content || "");
    } catch {
      return content || "";
    }
  }
  function leftEdgeClassForAssistant(message2) {
    if (message2.type !== "assistant") return "";
    const name = getMessageSourceLabel(message2) || "";
    const badge = hashStringToColor(name);
    const badgeToBorder = {
      // DaisyUI defaults: primary≈blue, secondary≈violet, accent≈pink, info≈sky, success≈emerald/green, warning≈amber, neutral≈zinc
      "badge-primary": "border-l border-blue-500",
      "badge-secondary": "border-l border-violet-500",
      "badge-accent": "border-l border-pink-500",
      "badge-info": "border-l border-sky-500",
      "badge-success": "border-l border-emerald-500",
      "badge-warning": "border-l border-amber-500",
      "badge-neutral": "border-l border-zinc-500"
    };
    return badgeToBorder[badge] || "border-l border-zinc-500";
  }
  function toYaml(value, indent = 0) {
    const pad = (n) => "  ".repeat(n);
    const isPlainObject = (v) => Object.prototype.toString.call(v) === "[object Object]";
    if (value === null || value === void 0) return "null";
    if (typeof value === "string") {
      let unescaped;
      try {
        unescaped = JSON.parse('"' + value.replace(/"/g, '\\"') + '"');
      } catch {
        unescaped = value;
      }
      if (unescaped.includes("\n")) {
        const lines = unescaped.split("\n");
        return lines.map((line) => pad(indent + 1) + line).join("\n");
      }
      const needsQuotes = /^[\s]*$|^[>|]|[:#\[\]{}*&!%@`]/.test(unescaped) || unescaped.startsWith("-") || unescaped.match(/^\d/) || ["true", "false", "null", "yes", "no", "on", "off"].includes(unescaped.toLowerCase());
      return needsQuotes ? JSON.stringify(unescaped) : unescaped;
    }
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";
      return value.map((item) => {
        const rendered = toYaml(item, indent + 1);
        if (rendered.includes("\n")) {
          const lines = rendered.split("\n").map((l) => pad(indent + 1) + l).join("\n");
          return `${pad(indent)}-
${lines}`;
        }
        return `${pad(indent)}- ${rendered}`;
      }).join("\n");
    }
    if (isPlainObject(value)) {
      const entries = Object.entries(value);
      if (entries.length === 0) return "{}";
      return entries.map(([k, v]) => {
        const rendered = toYaml(v, indent + 1);
        if (rendered.includes("\n")) {
          const lines = rendered.split("\n").map((l) => pad(indent + 1) + l).join("\n");
          return `${pad(indent)}${k}:
${lines}`;
        }
        return `${pad(indent)}${k}: ${rendered}`;
      }).join("\n");
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  function getMessageSourceLabel(message2) {
    const meta = message2.metadata;
    if (meta && typeof meta.source === "string" && meta.source) {
      return meta.source;
    }
    if ("name" in message2 && typeof message2.name === "string") {
      return message2.name;
    }
    if (message2.type === "api_failure") return "API Error";
    if (message2.type === "info") return "Info";
    return null;
  }
  let collapsedToolCallById = {};
  function isToolCallCollapsed(id) {
    return !!collapsedToolCallById[id];
  }
  function messageHeader($$payload2) {
    $$payload2.out += `<div class="w-full rounded-t-lg"><div role="button" tabindex="0"${attr("aria-expanded", isOpen)} class="w-full p-2 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 rounded-t-lg">`;
    headerBadges($$payload2);
    $$payload2.out += `<!----> <div class="flex items-center gap-2">`;
    expandButton($$payload2);
    $$payload2.out += `<!----> `;
    copyMenu($$payload2);
    $$payload2.out += `<!----></div></div></div>`;
  }
  function headerBadges($$payload2) {
    const messageName = getMessageSourceLabel(message);
    $$payload2.out += `<div class="flex items-center gap-2"><span class="badge badge-outline badge-xs font-mono">${escape_html(message.type.toUpperCase())}</span> <span class="badge badge-outline badge-xs">Message ${escape_html(messageIndex + 1)}</span> `;
    if (messageName) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span${attr_class(`badge ${stringify(hashStringToColor(messageName))} badge-sm`)}>${escape_html(messageName.toUpperCase())}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (message.type === "tool") {
      $$payload2.out += "<!--[-->";
      if (message.function) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="text-xs font-mono">${escape_html(message.function)}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (message.error) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="badge badge-error badge-xs">ERROR</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div>`;
  }
  function expandButton($$payload2) {
    $$payload2.out += `<svg${attr_class(`w-4 h-4 transition-transform ${stringify(isOpen ? "" : "rotate-180")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
  }
  function copyMenu($$payload2) {
    $$payload2.out += `<div class="dropdown dropdown-end ml-2" tabindex="0" role="menu" aria-label="Message actions"><button type="button" class="btn btn-ghost btn-xs btn-square" aria-label="Message menu"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"></path></svg></button> <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow-lg border border-base-300"><li><button class="text-left"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"></path></svg> ${escape_html("Show raw JSON")}</button></li> <div class="divider my-1"></div> <li><button class="text-left"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 0 1 3.75 20.625V9.375c0-.621.504-1.125 1.125-1.125H7.5a9.75 9.75 0 0 1 1.5.124m5.25 10.501v-3.375c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125h-3.375A1.125 1.125 0 0 1 15.75 17.25Z"></path></svg> Copy history up to here (${escape_html(messageIndex + 1)} messages)</button></li> <li><button class="text-left"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"></path></svg> Copy events up to here</button></li> <li><button class="text-left"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.124-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"></path></svg> Copy this message only</button></li> <li><button class="text-left"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"></path></svg> Copy tools created up to here</button></li></ul></div>`;
  }
  function messageContent($$payload2) {
    $$payload2.out += `<div class="px-3 pb-3 border-t border-base-300 dark:border-white/10">`;
    {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<div class="text-sm leading-relaxed mt-2 message-content text-gray-900 dark:text-gray-100 overflow-x-auto">`;
      if (message.type === "system") {
        $$payload2.out += "<!--[-->";
        systemMessage($$payload2, message);
      } else if (message.type === "user") {
        $$payload2.out += "<!--[1-->";
        userMessage($$payload2, message);
      } else if (message.type === "assistant") {
        $$payload2.out += "<!--[2-->";
        assistantMessage($$payload2, message);
      } else if (message.type === "tool") {
        $$payload2.out += "<!--[3-->";
        toolMessage($$payload2, message);
      } else if (message.type === "api_failure") {
        $$payload2.out += "<!--[4-->";
        apiFailureMessage($$payload2, message);
      } else if (message.type === "info") {
        $$payload2.out += "<!--[5-->";
        infoMessage($$payload2, message);
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div class="text-red-500">Unknown message type: ${escape_html(JSON.stringify(message))}</div>`;
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--></div>`;
  }
  function systemMessage($$payload2, message2) {
    const textContent = extractTextFromContent(message2.content);
    if (textContent !== null) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">${escape_html(textContent)}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
      JsonViewer($$payload2, {
        value: message2.content,
        theme: store_get($$store_subs ??= {}, "$themeString", themeString),
        inlineShortContainers: 80
      });
    }
    $$payload2.out += `<!--]-->`;
  }
  function userMessage($$payload2, message2) {
    const textContent = extractTextFromContent(message2.content);
    if (textContent !== null) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">${escape_html(textContent)}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
      JsonViewer($$payload2, {
        value: message2.content,
        theme: store_get($$store_subs ??= {}, "$themeString", themeString),
        inlineShortContainers: 80
      });
    }
    $$payload2.out += `<!--]-->`;
  }
  function assistantMessage($$payload2, message2) {
    const textContent = extractTextFromContent(message2.content);
    if (message2.reasoning) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="mt-3 space-y-2"><i>${escape_html(message2.reasoning.trim())}</i></div><div class="my-2 border-t border-black/10 dark:border-white/10"></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
    if (textContent !== null) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">${escape_html(textContent)}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
      JsonViewer($$payload2, {
        value: message2.content,
        theme: store_get($$store_subs ??= {}, "$themeString", themeString),
        inlineShortContainers: 80
      });
    }
    $$payload2.out += `<!--]-->`;
    if (message2.tool_calls && message2.tool_calls.length > 0) {
      $$payload2.out += "<!--[-->";
      toolCalls($$payload2, message2.tool_calls);
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  function infoMessage($$payload2, message2) {
    $$payload2.out += `<div class="space-y-2"><div class="flex items-center gap-2 mb-2"><span class="badge badge-info badge-sm">INFO</span> `;
    if (message2.timestamp) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="text-xs text-gray-500 dark:text-gray-400">${escape_html(new Date(message2.timestamp).toLocaleString())}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    if (message2.id) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="text-xs text-gray-500 dark:text-gray-400">ID: ${escape_html(message2.id)}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div> <div class="font-mono text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-700/50 text-gray-900 dark:text-blue-100">`;
    if (typeof message2.info === "string") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `${escape_html(message2.info)}`;
    } else {
      $$payload2.out += "<!--[!-->";
      JsonViewer($$payload2, {
        value: message2.info,
        theme: store_get($$store_subs ??= {}, "$themeString", themeString),
        inlineShortContainers: 80
      });
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  function toolCalls($$payload2, toolCallsList) {
    const each_array = ensure_array_like(toolCallsList);
    $$payload2.out += `<div class="mt-3"><!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let toolCall = each_array[i];
      const tcId = toolCall.id || String(i);
      if (i > 0) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="my-2 border-t border-dashed border-base-300 dark:border-white/20"></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="grid grid-cols-[16px_1fr] gap-x-2 items-start"><div class="flex items-center justify-center"><button type="button" class="p-0.5 rounded hover:bg-black/5 dark:hover:bg-white/5" aria-label="Toggle tool call"${attr("aria-expanded", !isToolCallCollapsed(tcId))}${attr("aria-controls", `toolcall-${tcId}`)}><svg${attr_class(`w-3 h-3 transition-transform ${stringify(isToolCallCollapsed(tcId) ? "-rotate-90" : "rotate-0")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button></div> <div class="text-xs mb-1 flex items-center overflow-x-auto"><span class="badge badge-info badge-xs mr-1 flex-shrink-0">TOOL</span> <span class="font-mono flex-shrink-0">${escape_html(toolCall.function)}</span> <span class="text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">ID: ${escape_html(toolCall.id)}</span></div> `;
      if (!isToolCallCollapsed(tcId)) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="col-start-1 self-stretch justify-self-center"><div class="h-full w-px bg-base-300 dark:bg-white/20 mt-[2px] mx-auto"></div></div> `;
        if (toolCall.view) {
          $$payload2.out += "<!--[-->";
          if (toolCall.view.format === "markdown") {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div${attr("id", `toolcall-${tcId}`)} class="prose max-w-none text-sm [font-size-adjust:from-font] prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-headings:my-1 prose-blockquote:my-0 prose-pre:my-0 prose-pre:p-0 prose-code:my-0 prose-pre:bg-transparent prose-code:bg-transparent prose-pre:text-inherit prose-code:text-inherit prose-pre:leading-snug prose-pre:whitespace-pre-wrap prose-code:whitespace-pre-wrap prose-pre:break-words prose-code:break-words prose-table:text-xs overflow-x-auto">${html(renderMarkdown(toolCall.view.content))}</div>`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<div${attr("id", `toolcall-${tcId}`)} class="whitespace-pre-wrap leading-snug font-mono text-[0.9em] overflow-x-auto">${escape_html(toolCall.view.content)}</div>`;
          }
          $$payload2.out += `<!--]-->`;
        } else if (toolCall.arguments && Object.keys(toolCall.arguments || {}).length > 0) {
          $$payload2.out += "<!--[1-->";
          $$payload2.out += `<div${attr("id", `toolcall-${tcId}`)} class="whitespace-pre-wrap leading-snug font-mono text-[0.9em] overflow-x-auto">${escape_html(toYaml(toolCall.arguments))}</div>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--></div>`;
  }
  $$payload.out += `<div${attr_class(`border rounded-lg bg-base-100 ${leftEdgeClassForAssistant(message)} ${message.isShared ? "border-dashed" : ""} ${!isVisible ? "invisible pointer-events-none" : ""}`)}${attr("data-message-id", message.id)}${attr_style(message.isShared ? "margin-bottom: 0.5rem;" : "")}>`;
  messageHeader($$payload);
  $$payload.out += `<!----> `;
  if (isOpen) {
    $$payload.out += "<!--[-->";
    messageContent($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function ScoreTooltip($$payload, $$props) {
  push();
  let { score, scoreName, description, badgeClass = "" } = $$props;
  function getScoreColor(score2) {
    if (score2 >= 8) {
      return "badge-error";
    } else if (score2 >= 6) {
      return "badge-warning";
    } else if (score2 >= 4) {
      return "badge-info";
    } else if (score2 >= 2) {
      return "badge-neutral";
    } else {
      return "badge-ghost";
    }
  }
  let finalBadgeClass = badgeClass || getScoreColor(score);
  let tooltipText = description ? extractFirstSentence(description) : void 0;
  if (description && tooltipText) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="tooltip tooltip-bottom"${attr("data-tip", tooltipText)}><div${attr_class(`badge ${stringify(finalBadgeClass)} gap-1 p-3 justify-between min-w-0 cursor-help`)}><span class="text-xs truncate"${attr("title", scoreName)}>${escape_html(scoreName)}</span> <span class="font-mono font-bold">${escape_html(score)}/10</span></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class(`badge ${stringify(finalBadgeClass)} gap-1 p-3 justify-between min-w-0`)}><span class="text-xs truncate"${attr("title", scoreName)}>${escape_html(scoreName)}</span> <span class="font-mono font-bold">${escape_html(score)}/10</span></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function TranscriptViewer($$payload, $$props) {
  push();
  let { filePath } = $$props;
  const loader = createTranscriptLoader(filePath);
  let selectedView = "combined";
  let showApiFailures = false;
  let showSharedHistory = true;
  let showSystemPrompt = false;
  let openMessages = {};
  let conversationColumns = (() => {
    if (!loader.transcript?.transcript?.events || selectedView === "raw") {
      return [];
    }
    return parseTranscriptEvents(loader.transcript.transcript.events, selectedView, showApiFailures);
  })();
  let availableViews = (() => {
    if (!loader.transcript?.transcript?.events) {
      return ["combined"];
    }
    return extractAvailableViews(loader.transcript.transcript.events);
  })();
  function isMessageOpen(messageId) {
    return openMessages[messageId] !== false;
  }
  function shouldShowSharedMessage(message, messageIndex, columnMessages) {
    if (!message.isShared) return true;
    return showSharedHistory;
  }
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
  }
  function transcriptContent($$payload2) {
    $$payload2.out += `<div class="p-4 space-y-6">`;
    transcriptHeader($$payload2);
    $$payload2.out += `<!----> `;
    viewControls($$payload2);
    $$payload2.out += `<!----></div> `;
    {
      $$payload2.out += "<!--[!-->";
      conversationView($$payload2);
    }
    $$payload2.out += `<!--]-->`;
  }
  function transcriptHeader($$payload2) {
    const each_array = ensure_array_like(Object.entries(loader.transcript?.scores || {}));
    $$payload2.out += `<div class="card bg-base-100 shadow-sm max-w-6xl mx-auto"><div class="card-body"><div class="flex justify-between items-start mb-4"><div><h1 class="text-2xl font-bold mb-2">${escape_html(loader.transcript?.split)} - ${escape_html(loader.transcript?.model)}</h1> <p class="text-base-content/70">Transcript #${escape_html(loader.transcript?.id)}</p></div></div> <div class="mb-6"><h3 class="text-lg font-semibold mb-3">Scores</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [key, value] = each_array[$$index];
      ScoreTooltip($$payload2, {
        score: value,
        scoreName: key,
        description: loader.transcript?.scoreDescriptions?.[key]
      });
    }
    $$payload2.out += `<!--]--></div></div> `;
    if (loader.metadata?.tags && loader.metadata.tags.length > 0) {
      $$payload2.out += "<!--[-->";
      const each_array_1 = ensure_array_like(loader.metadata.tags);
      $$payload2.out += `<div class="mb-4"><h3 class="text-lg font-semibold mb-2">Tags</h3> <div class="flex flex-wrap gap-2"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let tag = each_array_1[$$index_1];
        $$payload2.out += `<span class="badge badge-outline">${escape_html(tag)}</span>`;
      }
      $$payload2.out += `<!--]--></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="mb-4"><h3 class="text-lg font-semibold mb-2">Judge Summary</h3> <p class="text-sm leading-relaxed">${escape_html(loader.transcript?.judgeSummary)}</p></div> <div class="mb-4"><h3 class="text-lg font-semibold mb-2">Judge Justification</h3> <p class="text-sm leading-relaxed">${escape_html(loader.transcript?.justification)}</p></div> `;
    if (loader.transcript?.systemPrompt) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="collapse collapse-arrow bg-base-200"><input type="checkbox"${attr("checked", showSystemPrompt, true)}/> <div class="collapse-title text-lg font-semibold">Agent System Prompt</div> <div class="collapse-content"><div class="bg-base-300 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">${escape_html(loader.transcript.systemPrompt)}</div></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  function viewControls($$payload2) {
    const each_array_2 = ensure_array_like(availableViews);
    $$payload2.out += `<div class="card bg-base-100 shadow-sm max-w-6xl mx-auto"><div class="card-body"><h2 class="text-xl font-bold mb-4">Conversation</h2> <div class="tabs tabs-boxed justify-center mb-4"><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let view = each_array_2[$$index_2];
      $$payload2.out += `<button${attr_class(`tab ${stringify(selectedView === view ? "tab-active" : "")}`)}>${escape_html(toTitleCase(view))}</button>`;
    }
    $$payload2.out += `<!--]--> <button${attr_class(`tab ${stringify("")}`)}>Raw JSON</button></div> `;
    {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="flex justify-center mb-4 gap-6"><div class="form-control"><label class="label cursor-pointer"><span class="label-text mr-2">Show API Failures</span> <input type="checkbox" class="toggle toggle-error"${attr("checked", showApiFailures, true)}/></label></div> `;
      if (conversationColumns.length > 1) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="form-control"><label class="label cursor-pointer"><span class="label-text mr-2">Show Shared History</span> <input type="checkbox" class="toggle toggle-primary"${attr("checked", showSharedHistory, true)}/></label></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>`;
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  function conversationView($$payload2) {
    if (conversationColumns.length === 0) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="p-4"><div class="card bg-base-200 p-8 text-center max-w-6xl mx-auto"><p class="text-gray-500">No conversation data available for the selected view.</p></div></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      const each_array_3 = ensure_array_like(conversationColumns);
      $$payload2.out += `<div class="relative w-full"><div class="overflow-x-auto overscroll-x-contain scroll-smooth"><div class="flex gap-6 snap-x snap-mandatory px-6"${attr_style("justify-content: center;")}><!--[-->`;
      for (let columnIndex = 0, $$length = each_array_3.length; columnIndex < $$length; columnIndex++) {
        let column = each_array_3[columnIndex];
        $$payload2.out += `<div class="snap-start w-[clamp(350px,calc((100vw-3rem)/3),500px)] max-w-full flex-none">`;
        conversationColumn($$payload2, column);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]--></div></div></div>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  function conversationColumn($$payload2, column, columnIndex) {
    const each_array_4 = ensure_array_like(column.messages);
    $$payload2.out += `<div class="space-y-4"><div class="card bg-base-300 p-3"><h3 class="font-semibold text-sm">${escape_html(column.title)}</h3> <p class="text-xs text-gray-500">${escape_html(column.messages.length)} messages</p></div> <div class="space-y-2"><!--[-->`;
    for (let messageIndex = 0, $$length = each_array_4.length; messageIndex < $$length; messageIndex++) {
      let message = each_array_4[messageIndex];
      const isVisible = shouldShowSharedMessage(message, messageIndex, column.messages);
      MessageCard($$payload2, {
        message,
        messageIndex,
        isOpen: isMessageOpen(message.id || ""),
        isVisible
      });
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<div class="w-full">`;
  if (loader.transcriptLoading) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex items-center justify-center p-8"><span class="loading loading-spinner loading-lg"></span> <span class="ml-4">Loading transcript...</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (loader.transcriptError) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="alert alert-error max-w-6xl mx-auto m-4"><svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${escape_html(loader.transcriptError)}</span></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (loader.transcript) {
    $$payload.out += "<!--[-->";
    transcriptContent($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}

export { TranscriptViewer as T };
//# sourceMappingURL=TranscriptViewer-BFV8H_4X.js.map
