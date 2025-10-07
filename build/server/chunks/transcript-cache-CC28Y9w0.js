import { promises } from 'fs';
import path from 'path';
import { watch } from 'chokidar';
import { EventEmitter } from 'events';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { c as createTranscriptDisplay } from './transcript-utils-BY7i01oF.js';
import { a as DEFAULT_TRANSCRIPT_DIR } from './constants-C6XQO3qi.js';

const $defs = /* @__PURE__ */ JSON.parse('{"AddMessage":{"description":"Edit that adds a message to the transcript.","properties":{"operation":{"const":"add","default":"add","title":"Operation","type":"string"},"message":{"discriminator":{"mapping":{"assistant":"#/$defs/ChatMessageAssistant","system":"#/$defs/ChatMessageSystem","tool":"#/$defs/ChatMessageTool","user":"#/$defs/ChatMessageUser"},"propertyName":"role"},"oneOf":[{"$ref":"#/$defs/ChatMessageSystem"},{"$ref":"#/$defs/ChatMessageUser"},{"$ref":"#/$defs/ChatMessageAssistant"},{"$ref":"#/$defs/ChatMessageTool"}],"title":"Message"}},"required":["message"],"title":"AddMessage","type":"object"},"ChatMessageAssistant":{"description":"Assistant chat message.","properties":{"id":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Id"},"content":{"anyOf":[{"type":"string"},{"items":{"anyOf":[{"$ref":"#/$defs/ContentText"},{"$ref":"#/$defs/ContentReasoning"},{"$ref":"#/$defs/ContentImage"},{"$ref":"#/$defs/ContentAudio"},{"$ref":"#/$defs/ContentVideo"},{"$ref":"#/$defs/ContentData"},{"$ref":"#/$defs/ContentToolUse"},{"$ref":"#/$defs/ContentDocument"}]},"type":"array"}],"title":"Content"},"source":{"anyOf":[{"enum":["input","generate"],"type":"string"},{"type":"null"}],"default":null,"title":"Source"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"default":null,"title":"Metadata"},"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"role":{"const":"assistant","default":"assistant","title":"Role","type":"string"},"tool_calls":{"anyOf":[{"items":{"$ref":"#/$defs/ToolCall"},"type":"array"},{"type":"null"}],"default":null,"title":"Tool Calls"},"model":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Model"}},"required":["content"],"title":"ChatMessageAssistant","type":"object"},"ChatMessageSystem":{"description":"System chat message.","properties":{"id":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Id"},"content":{"anyOf":[{"type":"string"},{"items":{"anyOf":[{"$ref":"#/$defs/ContentText"},{"$ref":"#/$defs/ContentReasoning"},{"$ref":"#/$defs/ContentImage"},{"$ref":"#/$defs/ContentAudio"},{"$ref":"#/$defs/ContentVideo"},{"$ref":"#/$defs/ContentData"},{"$ref":"#/$defs/ContentToolUse"},{"$ref":"#/$defs/ContentDocument"}]},"type":"array"}],"title":"Content"},"source":{"anyOf":[{"enum":["input","generate"],"type":"string"},{"type":"null"}],"default":null,"title":"Source"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"default":null,"title":"Metadata"},"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"role":{"const":"system","default":"system","title":"Role","type":"string"}},"required":["content"],"title":"ChatMessageSystem","type":"object"},"ChatMessageTool":{"description":"Tool chat message.","properties":{"id":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Id"},"content":{"anyOf":[{"type":"string"},{"items":{"anyOf":[{"$ref":"#/$defs/ContentText"},{"$ref":"#/$defs/ContentReasoning"},{"$ref":"#/$defs/ContentImage"},{"$ref":"#/$defs/ContentAudio"},{"$ref":"#/$defs/ContentVideo"},{"$ref":"#/$defs/ContentData"},{"$ref":"#/$defs/ContentToolUse"},{"$ref":"#/$defs/ContentDocument"}]},"type":"array"}],"title":"Content"},"source":{"anyOf":[{"enum":["input","generate"],"type":"string"},{"type":"null"}],"default":null,"title":"Source"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"default":null,"title":"Metadata"},"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"role":{"const":"tool","default":"tool","title":"Role","type":"string"},"tool_call_id":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Tool Call Id"},"function":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Function"},"error":{"anyOf":[{"$ref":"#/$defs/ToolCallError"},{"type":"null"}],"default":null}},"required":["content"],"title":"ChatMessageTool","type":"object"},"ChatMessageUser":{"description":"User chat message.","properties":{"id":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Id"},"content":{"anyOf":[{"type":"string"},{"items":{"anyOf":[{"$ref":"#/$defs/ContentText"},{"$ref":"#/$defs/ContentReasoning"},{"$ref":"#/$defs/ContentImage"},{"$ref":"#/$defs/ContentAudio"},{"$ref":"#/$defs/ContentVideo"},{"$ref":"#/$defs/ContentData"},{"$ref":"#/$defs/ContentToolUse"},{"$ref":"#/$defs/ContentDocument"}]},"type":"array"}],"title":"Content"},"source":{"anyOf":[{"enum":["input","generate"],"type":"string"},{"type":"null"}],"default":null,"title":"Source"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"default":null,"title":"Metadata"},"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"role":{"const":"user","default":"user","title":"Role","type":"string"},"tool_call_id":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"default":null,"title":"Tool Call Id"}},"required":["content"],"title":"ChatMessageUser","type":"object"},"ContentAudio":{"description":"Audio content.","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"audio","default":"audio","title":"Type","type":"string"},"audio":{"title":"Audio","type":"string"},"format":{"enum":["wav","mp3"],"title":"Format","type":"string"}},"required":["audio","format"],"title":"ContentAudio","type":"object"},"ContentCitation":{"description":"A generic content citation.","properties":{"cited_text":{"anyOf":[{"type":"string"},{"additionalItems":false,"items":[{"type":"integer"},{"type":"integer"}],"maxItems":2,"minItems":2,"type":"array"},{"type":"null"}],"default":null,"title":"Cited Text"},"title":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Title"},"internal":{"anyOf":[{"additionalProperties":{"$ref":"#/$defs/JsonValue"},"type":"object"},{"type":"null"}],"default":null,"title":"Internal"},"type":{"const":"content","default":"content","title":"Type","type":"string"}},"title":"ContentCitation","type":"object"},"ContentData":{"description":"Model internal.","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"data","default":"data","title":"Type","type":"string"},"data":{"additionalProperties":{"$ref":"#/$defs/JsonValue"},"title":"Data","type":"object"}},"required":["data"],"title":"ContentData","type":"object"},"ContentDocument":{"description":"Document content (e.g. a PDF).","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"document","default":"document","title":"Type","type":"string"},"document":{"title":"Document","type":"string"},"filename":{"title":"Filename","type":"string"},"mime_type":{"title":"Mime Type","type":"string"}},"required":["document"],"title":"ContentDocument","type":"object"},"ContentImage":{"description":"Image content.","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"image","default":"image","title":"Type","type":"string"},"image":{"title":"Image","type":"string"},"detail":{"default":"auto","enum":["auto","low","high"],"title":"Detail","type":"string"}},"required":["image"],"title":"ContentImage","type":"object"},"ContentReasoning":{"description":"Reasoning content.\\n\\nSee the specification for [thinking blocks](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#understanding-thinking-blocks) for Claude models.","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"reasoning","default":"reasoning","title":"Type","type":"string"},"reasoning":{"title":"Reasoning","type":"string"},"signature":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Signature"},"redacted":{"default":false,"title":"Redacted","type":"boolean"}},"required":["reasoning"],"title":"ContentReasoning","type":"object"},"ContentText":{"description":"Text content.","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"text","default":"text","title":"Type","type":"string"},"text":{"title":"Text","type":"string"},"refusal":{"anyOf":[{"type":"boolean"},{"type":"null"}],"default":null,"title":"Refusal"},"citations":{"anyOf":[{"items":{"discriminator":{"mapping":{"content":"#/$defs/ContentCitation","document":"#/$defs/DocumentCitation","url":"#/$defs/UrlCitation"},"propertyName":"type"},"oneOf":[{"$ref":"#/$defs/ContentCitation"},{"$ref":"#/$defs/DocumentCitation"},{"$ref":"#/$defs/UrlCitation"}]},"type":"array"},{"type":"null"}],"default":null,"title":"Citations"}},"required":["text"],"title":"ContentText","type":"object"},"ContentToolUse":{"description":"Server side tool use.","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"tool_use","default":"tool_use","title":"Type","type":"string"},"tool_type":{"title":"Tool Type","type":"string"},"id":{"title":"Id","type":"string"},"name":{"title":"Name","type":"string"},"context":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Context"},"arguments":{"$ref":"#/$defs/JsonValue"},"result":{"$ref":"#/$defs/JsonValue"},"error":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Error"}},"required":["tool_type","id","name","arguments","result"],"title":"ContentToolUse","type":"object"},"ContentVideo":{"description":"Video content.","properties":{"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"type":{"const":"video","default":"video","title":"Type","type":"string"},"video":{"title":"Video","type":"string"},"format":{"enum":["mp4","mpeg","mov"],"title":"Format","type":"string"}},"required":["video","format"],"title":"ContentVideo","type":"object"},"DecisionEvent":{"description":"Event that indicates a something non-deterministic has happened.","properties":{"type":{"const":"decision_event","default":"decision_event","title":"Type","type":"string"},"id":{"title":"Id","type":"string"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"title":"Metadata"},"timestamp":{"format":"date-time","title":"Timestamp","type":"string"},"content":{"title":"Content"}},"required":["content"],"title":"DecisionEvent","type":"object"},"DocumentCitation":{"description":"A citation that refers to a page range in a document.","properties":{"cited_text":{"anyOf":[{"type":"string"},{"additionalItems":false,"items":[{"type":"integer"},{"type":"integer"}],"maxItems":2,"minItems":2,"type":"array"},{"type":"null"}],"default":null,"title":"Cited Text"},"title":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Title"},"internal":{"anyOf":[{"additionalProperties":{"$ref":"#/$defs/JsonValue"},"type":"object"},{"type":"null"}],"default":null,"title":"Internal"},"type":{"const":"document","default":"document","title":"Type","type":"string"},"range":{"anyOf":[{"$ref":"#/$defs/DocumentRange"},{"type":"null"}],"default":null}},"title":"DocumentCitation","type":"object"},"DocumentRange":{"description":"A range specifying a section of a document.","properties":{"type":{"enum":["block","page","char"],"title":"Type","type":"string"},"start_index":{"title":"Start Index","type":"integer"},"end_index":{"title":"End Index","type":"integer"}},"required":["type","start_index","end_index"],"title":"DocumentRange","type":"object"},"InfoEvent":{"description":"Event that adds information to the transcript.","properties":{"type":{"const":"info_event","default":"info_event","title":"Type","type":"string"},"id":{"title":"Id","type":"string"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"title":"Metadata"},"timestamp":{"format":"date-time","title":"Timestamp","type":"string"},"info":{"anyOf":[{"type":"string"},{"additionalProperties":true,"type":"object"}],"title":"Info"}},"required":["info"],"title":"InfoEvent","type":"object"},"JSONPatchEdit":{"description":"Edit that applies a JSON patch to the transcript.","properties":{"operation":{"const":"json_patch","default":"json_patch","title":"Operation","type":"string"},"patch":{"items":{"$ref":"#/$defs/JsonChange"},"title":"Patch","type":"array"},"name":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Name"}},"required":["patch"],"title":"JSONPatchEdit","type":"object"},"JSONSchema":{"description":"JSON Schema for type.","properties":{"type":{"anyOf":[{"enum":["string","integer","number","boolean","array","object","null"],"type":"string"},{"type":"null"}],"default":null,"title":"Type"},"format":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Format"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Description"},"default":{"default":null,"title":"Default"},"enum":{"anyOf":[{"items":{},"type":"array"},{"type":"null"}],"default":null,"title":"Enum"},"items":{"anyOf":[{"$ref":"#/$defs/JSONSchema"},{"type":"null"}],"default":null},"properties":{"anyOf":[{"additionalProperties":{"$ref":"#/$defs/JSONSchema"},"type":"object"},{"type":"null"}],"default":null,"title":"Properties"},"additionalProperties":{"anyOf":[{"$ref":"#/$defs/JSONSchema"},{"type":"boolean"},{"type":"null"}],"default":null,"title":"Additionalproperties"},"anyOf":{"anyOf":[{"items":{"$ref":"#/$defs/JSONSchema"},"type":"array"},{"type":"null"}],"default":null,"title":"Anyof"},"required":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"default":null,"title":"Required"}},"title":"JSONSchema","type":"object"},"JsonChange":{"description":"Describes a change to data using JSON Patch format.","properties":{"op":{"enum":["remove","add","replace","move","test","copy"],"title":"Op","type":"string"},"path":{"title":"Path","type":"string"},"from":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"From"},"value":{"$ref":"#/$defs/JsonValue","default":null},"replaced":{"$ref":"#/$defs/JsonValue","default":null}},"required":["op","path"],"title":"JsonChange","type":"object"},"JsonValue":{},"JudgeOutput":{"description":"Output from the alignment judge evaluation.","properties":{"response":{"title":"Response","type":"string"},"summary":{"title":"Summary","type":"string"},"justification":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Justification"},"scores":{"additionalProperties":{"type":"integer"},"title":"Scores","type":"object"},"score_descriptions":{"anyOf":[{"additionalProperties":{"type":"string"},"type":"object"},{"type":"null"}],"default":null,"title":"Score Descriptions"}},"required":["response","summary","scores"],"title":"JudgeOutput","type":"object"},"Reset":{"description":"Edit that resets the transcript to the initial state.","properties":{"operation":{"const":"reset","default":"reset","title":"Operation","type":"string"},"new_messages":{"items":{"discriminator":{"mapping":{"assistant":"#/$defs/ChatMessageAssistant","system":"#/$defs/ChatMessageSystem","tool":"#/$defs/ChatMessageTool","user":"#/$defs/ChatMessageUser"},"propertyName":"role"},"oneOf":[{"$ref":"#/$defs/ChatMessageSystem"},{"$ref":"#/$defs/ChatMessageUser"},{"$ref":"#/$defs/ChatMessageAssistant"},{"$ref":"#/$defs/ChatMessageTool"}]},"title":"New Messages","type":"array"}},"title":"Reset","type":"object"},"Rollback":{"description":"Edit that rolls back the transcript count messages.","properties":{"operation":{"const":"rollback","default":"rollback","title":"Operation","type":"string"},"count":{"minimum":0,"title":"Count","type":"integer"},"to_id":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"To Id"}},"required":["count"],"title":"Rollback","type":"object"},"ToolCall":{"properties":{"id":{"title":"Id","type":"string"},"function":{"title":"Function","type":"string"},"arguments":{"additionalProperties":true,"title":"Arguments","type":"object"},"internal":{"anyOf":[{"$ref":"#/$defs/JsonValue"},{"type":"null"}],"default":null},"parse_error":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Parse Error"},"view":{"anyOf":[{"$ref":"#/$defs/ToolCallContent"},{"type":"null"}],"default":null},"type":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Type"}},"required":["id","function","arguments"],"title":"ToolCall","type":"object"},"ToolCallContent":{"description":"Content to include in tool call view.","properties":{"title":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Title"},"format":{"enum":["text","markdown"],"title":"Format","type":"string"},"content":{"title":"Content","type":"string"}},"required":["format","content"],"title":"ToolCallContent","type":"object"},"ToolCallError":{"properties":{"type":{"enum":["parsing","timeout","unicode_decode","permission","file_not_found","is_a_directory","limit","approval","unknown","output_limit"],"title":"Type","type":"string"},"message":{"title":"Message","type":"string"}},"required":["type","message"],"title":"ToolCallError","type":"object"},"ToolCreationEvent":{"description":"Event that creates a tool.","properties":{"type":{"const":"tool_creation_event","default":"tool_creation_event","title":"Type","type":"string"},"id":{"title":"Id","type":"string"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"title":"Metadata"},"timestamp":{"format":"date-time","title":"Timestamp","type":"string"},"model":{"title":"Model","type":"string"},"tool":{"$ref":"#/$defs/ToolDefinition"}},"required":["model","tool"],"title":"ToolCreationEvent","type":"object"},"ToolDefinition":{"description":"Serializable representation of a tool definition.\\n\\nThis holds only JSON-serializable fields. Convert to the library\'s\\nInspect `ToolDef` with `to_inspect_tooldef()` when calling model.generate.","properties":{"name":{"title":"Name","type":"string"},"description":{"title":"Description","type":"string"},"parameters":{"$ref":"#/$defs/ToolParams"},"parallel":{"default":true,"title":"Parallel","type":"boolean"},"options":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"default":null,"title":"Options"},"viewer":{"default":null,"title":"Viewer"},"model_input":{"default":null,"title":"Model Input"}},"required":["name","description","parameters"],"title":"ToolDefinition","type":"object"},"ToolParams":{"description":"Description of tool parameters object in JSON Schema format.","properties":{"type":{"const":"object","default":"object","title":"Type","type":"string"},"properties":{"type":"object","additionalProperties":{"$ref":"#/$defs/JSONSchema"},"title":"Properties"},"required":{"items":{"type":"string"},"title":"Required","type":"array"},"additionalProperties":{"default":false,"title":"Additionalproperties","type":"boolean"}},"title":"ToolParams","type":"object"},"TranscriptEvent":{"description":"Event that modifies a transcript.\\n\\nThe view field determines which transcript view(s) this event should be applied to.\\nCan be a single view name or a list of view names.","properties":{"type":{"const":"transcript_event","default":"transcript_event","title":"Type","type":"string"},"id":{"title":"Id","type":"string"},"metadata":{"anyOf":[{"additionalProperties":true,"type":"object"},{"type":"null"}],"title":"Metadata"},"timestamp":{"format":"date-time","title":"Timestamp","type":"string"},"view":{"anyOf":[{"type":"string"},{"items":{"type":"string"},"type":"array"}],"title":"View"},"edit":{"discriminator":{"mapping":{"add":"#/$defs/AddMessage","json_patch":"#/$defs/JSONPatchEdit","reset":"#/$defs/Reset","rollback":"#/$defs/Rollback"},"propertyName":"operation"},"oneOf":[{"$ref":"#/$defs/AddMessage"},{"$ref":"#/$defs/Rollback"},{"$ref":"#/$defs/Reset"},{"$ref":"#/$defs/JSONPatchEdit"}],"title":"Edit"}},"required":["view","edit"],"title":"TranscriptEvent","type":"object"},"TranscriptMetadata":{"properties":{"transcript_id":{"title":"Transcript Id","type":"string"},"auditor_model":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Auditor Model"},"target_model":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Target Model"},"created_at":{"format":"date-time","title":"Created At","type":"string"},"updated_at":{"format":"date-time","title":"Updated At","type":"string"},"version":{"const":"v3.0","default":"v3.0","title":"Version","type":"string"},"description":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Description"},"tags":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Tags"},"judge_output":{"anyOf":[{"$ref":"#/$defs/JudgeOutput"},{"type":"null"}],"default":null}},"required":["transcript_id","created_at","updated_at"],"title":"TranscriptMetadata","type":"object"},"UrlCitation":{"description":"A citation that refers to a URL.","properties":{"cited_text":{"anyOf":[{"type":"string"},{"additionalItems":false,"items":[{"type":"integer"},{"type":"integer"}],"maxItems":2,"minItems":2,"type":"array"},{"type":"null"}],"default":null,"title":"Cited Text"},"title":{"anyOf":[{"type":"string"},{"type":"null"}],"default":null,"title":"Title"},"internal":{"anyOf":[{"additionalProperties":{"$ref":"#/$defs/JsonValue"},"type":"object"},{"type":"null"}],"default":null,"title":"Internal"},"type":{"const":"url","default":"url","title":"Type","type":"string"},"url":{"title":"Url","type":"string"}},"required":["url"],"title":"UrlCitation","type":"object"}}');
const properties = { "metadata": { "$ref": "#/$defs/TranscriptMetadata" }, "events": { "items": { "discriminator": { "mapping": { "decision_event": "#/$defs/DecisionEvent", "info_event": "#/$defs/InfoEvent", "tool_creation_event": "#/$defs/ToolCreationEvent", "transcript_event": "#/$defs/TranscriptEvent" }, "propertyName": "type" }, "oneOf": [{ "$ref": "#/$defs/TranscriptEvent" }, { "$ref": "#/$defs/ToolCreationEvent" }, { "$ref": "#/$defs/InfoEvent" }, { "$ref": "#/$defs/DecisionEvent" }] }, "title": "Events", "type": "array" }, "messages": { "items": {}, "title": "Messages", "type": "array" }, "target_messages": { "items": {}, "title": "Target Messages", "type": "array" } };
const required = ["metadata"];
const title = "Transcript";
const type = "object";
const transcriptSchema = {
  $defs,
  properties,
  required,
  title,
  type
};
const ajv = new Ajv({
  allErrors: true,
  // Collect all errors, not just the first one
  verbose: true,
  // Include schema and data information in errors
  strict: false
  // Allow unknown keywords (for Pydantic-generated schemas)
});
addFormats(ajv);
ajv.addFormat("date-time", {
  type: "string",
  validate: function(dateTimeString) {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(dateTimeString)) {
      return !isNaN(Date.parse(dateTimeString));
    }
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/.test(dateTimeString)) {
      const normalized = dateTimeString.replace(" ", "T");
      return !isNaN(Date.parse(normalized));
    }
    return false;
  }
});
const validateTranscript = ajv.compile(transcriptSchema);
function jsonPointerToPath(pointer) {
  if (!pointer || pointer === "/") return "root";
  const parts = pointer.split("/").filter(Boolean).map(decodeURIComponent);
  let path2 = "";
  for (const part of parts) {
    const isIndex = /^\d+$/.test(part);
    if (path2 === "") {
      path2 = isIndex ? `[${part}]` : part;
    } else if (isIndex) {
      path2 += `[${part}]`;
    } else {
      path2 += `.${part}`;
    }
  }
  return path2 || "root";
}
function validateTranscriptData(data) {
  const valid = validateTranscript(data);
  if (valid) {
    return {
      isValid: true,
      valid: true,
      errors: [],
      transcript: data,
      data
    };
  }
  const errors = (validateTranscript.errors || []).map((error) => {
    let message = error.message || "Unknown validation error";
    if (error.keyword === "required" && error.params?.missingProperty) {
      message = `missing required property "${error.params.missingProperty}"`;
    } else if (error.keyword === "const" && error.params?.allowedValue !== void 0) {
      message = `must be equal to constant (${JSON.stringify(error.params.allowedValue)})`;
    }
    return {
      message,
      path: jsonPointerToPath(error.instancePath || error.schemaPath || ""),
      value: error.data,
      schema: error.schema,
      keyword: error.keyword,
      params: error.params,
      schemaPath: error.schemaPath
    };
  });
  const partialData = extractTranscriptInfo(data);
  return {
    isValid: false,
    valid: false,
    errors,
    partialData,
    data
  };
}
function formatValidationErrors(errors) {
  if (errors.length === 0) return "No validation errors";
  const errorMessages = errors.map((error, index) => {
    const path2 = error.path || "root";
    let valueSnippet = "";
    try {
      const json = JSON.stringify(error.value);
      if (json && json.length <= 80) valueSnippet = ` (value: ${json})`;
    } catch {
    }
    return `${index + 1}. ${path2}: ${error.message}${valueSnippet}`;
  });
  return `Schema validation failed (${errors.length} error${errors.length === 1 ? "" : "s"}):
${errorMessages.join("\n")}`;
}
function validateAndParseTranscript(content, filename) {
  try {
    const data = JSON.parse(content);
    const result = validateTranscriptData(data);
    if (!result.valid) {
      console.error(
        `Transcript validation failed${filename ? ` for ${filename}` : ""}:
` + formatValidationErrors(result.errors)
      );
    }
    return result;
  } catch (parseError) {
    return {
      isValid: false,
      valid: false,
      errors: [{
        message: `JSON parsing failed: ${parseError instanceof Error ? parseError.message : "Unknown parse error"}`,
        path: "root",
        value: content,
        schema: null
      }],
      data: null
    };
  }
}
function extractTranscriptInfo(data) {
  return {
    hasMetadata: !!(data && data.metadata),
    hasEvents: !!(data && Array.isArray(data.events)),
    eventCount: data && Array.isArray(data.events) ? data.events.length : 0,
    version: data?.metadata?.version || null,
    sessionId: data?.metadata?.session_id || null
  };
}
if (typeof window !== "undefined") {
  throw new Error("transcript-loader can only be used on the server side");
}
async function loadTranscriptFromFile(filePath) {
  try {
    const content = await promises.readFile(filePath, "utf-8");
    const validationResult = validateAndParseTranscript(content, path.basename(filePath));
    if (!validationResult.valid) {
      const details = formatValidationErrors(validationResult.errors);
      const err = new Error(`Invalid transcript file: ${filePath}
${details}`);
      err.code = "TRANSCRIPT_VALIDATION_FAILED";
      err.validation = validationResult;
      throw err;
    }
    const transcript = validationResult.data;
    if (!transcript.metadata?.transcript_id) {
      throw new Error(`Missing transcript_id in metadata for file: ${filePath}`);
    }
    return createTranscriptDisplay(transcript, filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw new Error(`Failed to load transcript from ${filePath}: ${error.message}`);
  }
}
async function loadMetadataFromFile(filePath) {
  try {
    const content = await promises.readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    if (!data?.metadata) {
      throw new Error(`Invalid transcript structure in ${filePath}: missing metadata`);
    }
    return data.metadata;
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
    }
    throw new Error(`Failed to load metadata from ${filePath}: ${error.message}`);
  }
}
const TRANSCRIPT_DIR = path.resolve(process.env.TRANSCRIPT_DIR || DEFAULT_TRANSCRIPT_DIR);
console.log(`[CONFIG] Transcript directory resolved to: ${TRANSCRIPT_DIR}`);
if (typeof window !== "undefined") {
  throw new Error("transcript-cache can only be used on the server side");
}
class TranscriptCache {
  metadataCache = /* @__PURE__ */ new Map();
  fullTranscriptCache = /* @__PURE__ */ new Map();
  maxFullTranscripts;
  watcherInitialized = false;
  watcher = null;
  changeEmitter = new EventEmitter();
  versionToken = `${Date.now()}`;
  stats = {
    metadataCount: 0,
    fullTranscriptCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
    fileWatcherActive: false
  };
  constructor(maxFullTranscripts = 200) {
    this.maxFullTranscripts = maxFullTranscripts;
    console.log(`🗄️ [CACHE] TranscriptCache initialized with max ${maxFullTranscripts} full transcripts`);
  }
  /**
   * Initialize file system watcher for the transcript directory
   */
  async initializeWatcher(transcriptDir = DEFAULT_TRANSCRIPT_DIR) {
    if (this.watcherInitialized) {
      console.log("🔍 [CACHE] File watcher already initialized");
      return;
    }
    try {
      await promises.access(transcriptDir);
      console.log(`🔍 [CACHE] Initializing file watcher for: ${transcriptDir}`);
      this.watcher = watch(path.join(transcriptDir, "**/*.json"), {
        ignored: /(^|[\/\\])\../,
        // ignore dotfiles
        persistent: true,
        ignoreInitial: true
        // Don't trigger for existing files
      });
      this.watcher.on("add", (filePath) => {
        console.log(`📄 [CACHE] File added: ${filePath}`);
        this.bumpVersionAndEmit("add", filePath);
        this.invalidateFile(filePath);
      }).on("change", (filePath) => {
        console.log(`📝 [CACHE] File changed: ${filePath}`);
        this.bumpVersionAndEmit("change", filePath);
        this.invalidateFile(filePath);
      }).on("unlink", (filePath) => {
        console.log(`🗑️ [CACHE] File deleted: ${filePath}`);
        this.bumpVersionAndEmit("unlink", filePath);
        this.invalidateFile(filePath);
      }).on("error", (error) => {
        console.error("🚨 [CACHE] File watcher error:", error);
      }).on("ready", () => {
        console.log("✅ [CACHE] File watcher is ready");
        this.stats.fileWatcherActive = true;
      });
      this.watcherInitialized = true;
    } catch (error) {
      console.error(`🚨 [CACHE] Failed to initialize file watcher for ${transcriptDir}:`, error);
    }
  }
  /**
   * Increment version token and emit a structured change event
   */
  bumpVersionAndEmit(eventType, absoluteFilePath) {
    this.versionToken = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    let relativePath;
    try {
      const baseDir = TRANSCRIPT_DIR;
      relativePath = path.relative(baseDir, absoluteFilePath);
    } catch {
      relativePath = absoluteFilePath;
    }
    this.changeEmitter.emit("change", {
      type: eventType,
      absolutePath: absoluteFilePath,
      relativePath,
      version: this.versionToken,
      updatedAt: Date.now()
    });
  }
  /**
   * Get metadata from cache or load from file
   */
  async getMetadata(filePath) {
    const normalizedPath = path.normalize(filePath);
    const cached = this.metadataCache.get(normalizedPath);
    if (cached && await this.isCacheValid(cached)) {
      cached.accessTime = Date.now();
      this.stats.cacheHits++;
      return cached.data;
    }
    this.stats.cacheMisses++;
    const metadata = await loadMetadataFromFile(normalizedPath);
    if (metadata === null) {
      return null;
    }
    const stat = await promises.stat(normalizedPath);
    this.metadataCache.set(normalizedPath, {
      data: metadata,
      filePath: normalizedPath,
      lastModified: stat.mtime.getTime(),
      accessTime: Date.now()
    });
    this.stats.metadataCount = this.metadataCache.size;
    return metadata;
  }
  /**
   * Get full transcript from cache or load from file
   */
  async getFullTranscript(filePath) {
    const normalizedPath = path.normalize(filePath);
    const cached = this.fullTranscriptCache.get(normalizedPath);
    if (cached && await this.isCacheValid(cached)) {
      cached.accessTime = Date.now();
      this.stats.cacheHits++;
      console.log(`💾 [CACHE] Full transcript cache hit: ${normalizedPath}`);
      return cached.data;
    }
    console.log(`📁 [CACHE] Loading full transcript from file: ${normalizedPath}`);
    this.stats.cacheMisses++;
    const transcript = await loadTranscriptFromFile(normalizedPath);
    if (transcript === null) {
      return null;
    }
    const absoluteBaseDir = TRANSCRIPT_DIR;
    const relativePath = path.relative(absoluteBaseDir, normalizedPath).replace(/\\/g, "/");
    const updatedTranscript = {
      ...transcript,
      _filePath: relativePath
    };
    const stat = await promises.stat(normalizedPath);
    const entry = {
      data: updatedTranscript,
      filePath: normalizedPath,
      lastModified: stat.mtime.getTime(),
      accessTime: Date.now()
    };
    this.fullTranscriptCache.set(normalizedPath, entry);
    await this.enforceFullTranscriptLimit();
    this.stats.fullTranscriptCount = this.fullTranscriptCache.size;
    return updatedTranscript;
  }
  /**
   * Check if a cached entry is still valid by comparing modification times
   */
  async isCacheValid(cached) {
    try {
      const stat = await promises.stat(cached.filePath);
      return cached.lastModified >= stat.mtime.getTime();
    } catch (error) {
      return false;
    }
  }
  /**
   * Enforce LRU eviction for full transcript cache
   */
  async enforceFullTranscriptLimit() {
    if (this.fullTranscriptCache.size <= this.maxFullTranscripts) {
      return;
    }
    const entries = Array.from(this.fullTranscriptCache.entries());
    entries.sort(([, a], [, b]) => a.accessTime - b.accessTime);
    const toRemove = entries.slice(0, entries.length - this.maxFullTranscripts);
    for (const [key] of toRemove) {
      this.fullTranscriptCache.delete(key);
      console.log(`🗑️ [CACHE] Evicted full transcript from cache: ${key}`);
    }
    console.log(`📊 [CACHE] LRU eviction completed. Full transcript cache size: ${this.fullTranscriptCache.size}`);
  }
  /**
   * Invalidate cache entries for a specific file
   */
  invalidateFile(filePath) {
    const normalizedPath = path.normalize(filePath);
    let invalidated = false;
    if (this.metadataCache.has(normalizedPath)) {
      this.metadataCache.delete(normalizedPath);
      invalidated = true;
      console.log(`🗑️ [CACHE] Invalidated metadata cache for: ${normalizedPath}`);
    }
    if (this.fullTranscriptCache.has(normalizedPath)) {
      this.fullTranscriptCache.delete(normalizedPath);
      invalidated = true;
      console.log(`🗑️ [CACHE] Invalidated full transcript cache for: ${normalizedPath}`);
    }
    if (invalidated) {
      this.updateStats();
    }
  }
  /**
   * Subscribe to change events (file add/change/delete)
   */
  onChange(listener) {
    this.changeEmitter.on("change", listener);
    return () => this.changeEmitter.off("change", listener);
  }
  /**
   * Get current version token that changes whenever any transcript file changes
   */
  getVersion() {
    return this.versionToken;
  }
  /**
   * Clear all cache entries
   */
  clearCache() {
    const metadataCount = this.metadataCache.size;
    const fullTranscriptCount = this.fullTranscriptCache.size;
    this.metadataCache.clear();
    this.fullTranscriptCache.clear();
    this.updateStats();
    console.log(`🗑️ [CACHE] Cleared all cache entries (${metadataCount} metadata, ${fullTranscriptCount} full transcripts)`);
  }
  /**
   * Get cache statistics
   */
  getStats() {
    return { ...this.stats };
  }
  /**
   * Update internal statistics
   */
  updateStats() {
    this.stats.metadataCount = this.metadataCache.size;
    this.stats.fullTranscriptCount = this.fullTranscriptCache.size;
  }
  /**
   * Shutdown the cache and cleanup resources
   */
  async shutdown() {
    if (this.watcher) {
      console.log("🔍 [CACHE] Shutting down file watcher");
      await this.watcher.close();
      this.watcher = null;
      this.stats.fileWatcherActive = false;
    }
    this.clearCache();
    this.watcherInitialized = false;
    console.log("🗄️ [CACHE] TranscriptCache shutdown completed");
  }
  /**
   * Preload metadata for all files in a directory (for bulk operations)
   */
  async preloadMetadata(transcriptDir = DEFAULT_TRANSCRIPT_DIR) {
    console.log(`🔄 [CACHE] Preloading metadata from: ${transcriptDir}`);
    try {
      const files = await this.findAllTranscriptFiles(transcriptDir);
      console.log(`📁 [CACHE] Found ${files.length} transcript files to preload`);
      const concurrency = 10;
      const chunks = this.chunkArray(files, concurrency);
      for (const chunk of chunks) {
        await Promise.all(
          chunk.map(async (filePath) => {
            try {
              await this.getMetadata(filePath);
            } catch (error) {
              console.warn(`⚠️ [CACHE] Failed to preload metadata for ${filePath}:`, error);
            }
          })
        );
      }
      console.log(`✅ [CACHE] Preloaded metadata for ${this.metadataCache.size} transcripts`);
    } catch (error) {
      console.error("🚨 [CACHE] Failed to preload metadata:", error);
    }
  }
  /**
   * Find all transcript files recursively
   */
  async findAllTranscriptFiles(dir) {
    const files = [];
    async function scanDir(currentDir) {
      const entries = await promises.readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await scanDir(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".json")) {
          files.push(fullPath);
        }
      }
    }
    await scanDir(dir);
    return files;
  }
  /**
   * Utility function to chunk an array
   */
  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
let globalCache = null;
function getTranscriptCache() {
  if (!globalCache) {
    globalCache = new TranscriptCache();
  }
  return globalCache;
}
async function initializeGlobalCache(transcriptDir) {
  const cache = getTranscriptCache();
  await cache.initializeWatcher(transcriptDir);
}
async function shutdownGlobalCache() {
  if (globalCache) {
    await globalCache.shutdown();
    globalCache = null;
  }
}
const transcriptCache = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TranscriptCache,
  getTranscriptCache,
  initializeGlobalCache,
  shutdownGlobalCache
}, Symbol.toStringTag, { value: "Module" }));

export { TRANSCRIPT_DIR as T, getTranscriptCache as g, initializeGlobalCache as i, shutdownGlobalCache as s, transcriptCache as t };
//# sourceMappingURL=transcript-cache-CC28Y9w0.js.map
