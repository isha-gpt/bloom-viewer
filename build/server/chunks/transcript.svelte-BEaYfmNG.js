function createTranscriptLoader(filePath) {
  let metadata = null;
  let transcript = null;
  let metadataLoading = false;
  let transcriptLoading = false;
  let metadataError = null;
  let transcriptError = null;
  const loadMetadata = async () => {
    if (metadata) return metadata;
    metadataLoading = true;
    metadataError = null;
    try {
      const url = `/api/transcripts?filePath=${encodeURIComponent(filePath)}&metadataOnly=true`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          metadataError = `Transcript at "${filePath}" not found`;
        } else {
          let details = "";
          try {
            const errJson = await response.clone().json();
            details = errJson?.message || errJson?.error || "";
          } catch {
            try {
              details = await response.text();
            } catch {
            }
          }
          const extra = details ? ` - ${details}` : "";
          throw new Error(`Failed to load metadata: ${response.status} ${response.statusText}${extra}`);
        }
        return null;
      }
      const result = await response.json();
      if (result.success) {
        metadata = result.data;
        return metadata;
      } else {
        throw new Error(result.error || "Unknown API error");
      }
    } catch (err) {
      metadataError = err instanceof Error ? err.message : "Unknown error loading metadata";
      return null;
    } finally {
      metadataLoading = false;
    }
  };
  const loadTranscript = async () => {
    if (transcript) return transcript;
    transcriptLoading = true;
    transcriptError = null;
    try {
      const url = `/api/transcripts?filePath=${encodeURIComponent(filePath)}`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          transcriptError = `Transcript at "${filePath}" not found`;
        } else {
          let details = "";
          try {
            const errJson = await response.clone().json();
            details = errJson?.message || errJson?.error || "";
          } catch {
            try {
              details = await response.text();
            } catch {
            }
          }
          const extra = details ? ` - ${details}` : "";
          throw new Error(`Failed to load transcript: ${response.status} ${response.statusText}${extra}`);
        }
        return null;
      }
      const result = await response.json();
      if (result.success) {
        transcript = result.data;
        if (!metadata && transcript && "transcript" in transcript && transcript.transcript?.metadata) {
          metadata = transcript.transcript.metadata;
        }
        return transcript;
      } else {
        throw new Error(result.error || "Unknown API error");
      }
    } catch (err) {
      transcriptError = err instanceof Error ? err.message : "Unknown error loading transcript";
      return null;
    } finally {
      transcriptLoading = false;
    }
  };
  const reset = () => {
    metadata = null;
    transcript = null;
    metadataLoading = false;
    transcriptLoading = false;
    metadataError = null;
    transcriptError = null;
  };
  return {
    // Reactive getters
    get metadata() {
      return metadata;
    },
    get transcript() {
      return transcript;
    },
    get metadataLoading() {
      return metadataLoading;
    },
    get transcriptLoading() {
      return transcriptLoading;
    },
    get metadataError() {
      return metadataError;
    },
    get transcriptError() {
      return transcriptError;
    },
    get hasMetadata() {
      return metadata !== null;
    },
    get hasTranscript() {
      return transcript !== null;
    },
    get isLoading() {
      return metadataLoading || transcriptLoading;
    },
    get hasError() {
      return metadataError !== null || transcriptError !== null;
    },
    // Actions
    loadMetadata,
    loadTranscript,
    reset,
    // Convenience method to load both if needed
    loadBoth: async () => {
      await loadMetadata();
      await loadTranscript();
    }
  };
}

export { createTranscriptLoader as c };
//# sourceMappingURL=transcript.svelte-BEaYfmNG.js.map
