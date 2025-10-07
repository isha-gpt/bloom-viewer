function extractSystemPrompt(transcript) {
  if (!transcript?.events || !Array.isArray(transcript.events)) {
    console.warn("extractSystemPrompt: transcript.events is not a valid array:", transcript?.events);
    return void 0;
  }
  for (const event of transcript.events) {
    if (event.type === "transcript_event") {
      if (event.edit.operation === "add" && event.edit.message?.role === "system") {
        const content = event.edit.message.content;
        return typeof content === "string" ? content : JSON.stringify(content);
      }
    }
  }
  return void 0;
}
function extractTargetModel(transcript) {
  if (transcript.metadata.target_model && transcript.metadata.target_model !== "unknown") {
    return transcript.metadata.target_model;
  }
  const systemPrompt = extractSystemPrompt(transcript);
  if (systemPrompt) {
    const match = systemPrompt.match(/The target AI is a `([^`]+)` model/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return "unknown";
}
function extractModelName(targetModel) {
  if (!targetModel || targetModel === "unknown") {
    return "unknown";
  }
  const parts = targetModel.split(":");
  if (parts.length > 1) {
    return parts[1];
  }
  return targetModel;
}
function extractFirstSentence(text) {
  if (!text) return "";
  const sentenceEndings = /[.!?](?:\s|$)/;
  const match = text.match(sentenceEndings);
  if (match) {
    const endIndex = match.index + match[0].length - (match[0].endsWith(" ") ? 1 : 0);
    return text.substring(0, endIndex).trim();
  }
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
}
function collectScoreDescriptions(transcripts) {
  const allDescriptions = {};
  for (const transcript of transcripts) {
    if (transcript.scoreDescriptions) {
      for (const [scoreName, description] of Object.entries(transcript.scoreDescriptions)) {
        if (!allDescriptions[scoreName] && description) {
          allDescriptions[scoreName] = description;
        }
      }
    }
  }
  return allDescriptions;
}
function createTranscriptDisplay(transcript, filePath) {
  const targetModel = extractTargetModel(transcript);
  const pathParts = filePath.split("/");
  const behaviorDir = pathParts.length > 1 ? pathParts[pathParts.length - 2] : "";
  const fileName = pathParts[pathParts.length - 1];
  const transcriptNumber = fileName.endsWith(".json") ? fileName.slice(0, -5) : fileName;
  return {
    id: transcript.metadata.transcript_id || transcriptNumber,
    model: extractModelName(targetModel),
    split: behaviorDir,
    concerningScore: transcript.metadata.judge_output?.scores?.concerning || 0,
    summary: transcript.metadata.judge_output?.summary || transcript.metadata.description || "No summary available",
    scores: transcript.metadata.judge_output?.scores || {},
    scoreDescriptions: transcript.metadata.judge_output?.score_descriptions,
    judgeSummary: transcript.metadata.judge_output?.summary || "No judgment summary available",
    justification: transcript.metadata.judge_output?.justification || "No justification available",
    tags: transcript.metadata.tags || [],
    systemPrompt: extractSystemPrompt(transcript),
    transcript,
    _filePath: filePath
  };
}

export { collectScoreDescriptions as a, extractFirstSentence as b, createTranscriptDisplay as c, extractModelName as e };
//# sourceMappingURL=transcript-utils-BY7i01oF.js.map
