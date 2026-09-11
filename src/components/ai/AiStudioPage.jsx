import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { ActionButton } from "@/components/common/ActionButton";
import { AiUsageCard } from "@/components/dashboard/AiUsageCard";
import { AppShell } from "@/components/layout/AppShell";
import { OptionPicker } from "@/components/ai/OptionPicker";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionState } from "@/components/common/SectionState";
import { Surface, SurfaceHeader } from "@/components/common/Surface";
import { DASHBOARD_QUERY_KEYS } from "@/constants/dashboard";
import {
  getAiUsage,
  getPresenters,
  getVoices,
  improveScript,
  queueRender,
} from "@/services/dashboardService";
import { useApiResource } from "@/hooks/useApiResource";

/**
 * Single place for every AI capability: write a script, improve it with AI,
 * pick a presenter and voice, then send the result to the render queue.
 */
export function AiStudioPage() {
  const presenters = useApiResource(DASHBOARD_QUERY_KEYS.presenters, getPresenters);
  const voices = useApiResource(DASHBOARD_QUERY_KEYS.voices, getVoices);
  const usage = useApiResource(DASHBOARD_QUERY_KEYS.usage, getAiUsage);

  const [script, setScript] = useState("");
  const [presenterId, setPresenterId] = useState(null);
  const [voiceId, setVoiceId] = useState(null);

  const improve = useMutation({
    mutationFn: () => improveScript({ script }),
    onSuccess: (data) => {
      if (data?.script) setScript(data.script);
      toast.success("Script improved");
    },
    onError: (error) => toast.error(error.message),
  });

  const render = useMutation({
    mutationFn: () => queueRender({ script, presenterId, voiceId }),
    onSuccess: () => toast.success("Render queued"),
    onError: (error) => toast.error(error.message),
  });

  const canRender = script.trim().length > 0 && presenterId && voiceId;

  return (
    <AppShell>
      <PageHeader
        title="AI studio"
        description="Write your script, improve it with AI, choose a presenter and voice, then render."
      />

      <div className="grid gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Surface>
            <SurfaceHeader title="1. Script" subtitle="Write or paste the announcement" />
            <div className="p-5 sm:p-6">
              <label htmlFor="ai-script" className="sr-only">
                Script
              </label>
              <textarea
                id="ai-script"
                value={script}
                onChange={(event) => setScript(event.target.value)}
                rows={9}
                placeholder="Type the announcement you want the presenter to read…"
                className="w-full resize-y rounded-xl border border-border/70 bg-card p-3.5 text-sm outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus:border-primary/40"
              />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <ActionButton
                  onClick={() => improve.mutate()}
                  disabled={!script.trim() || improve.isPending}
                  className="disabled:opacity-50"
                >
                  <Wand2 className="size-4" />
                  {improve.isPending ? "Improving…" : "Improve with AI"}
                </ActionButton>
                <span className="text-xs text-muted-foreground">
                  {script.trim().length} characters
                </span>
              </div>
              {improve.error ? (
                <p className="mt-3 text-sm text-destructive">{improve.error.message}</p>
              ) : null}
            </div>
          </Surface>

          <OptionPicker
            step="2"
            title="Presenter"
            subtitle="Who delivers the announcement"
            query={presenters}
            selectedId={presenterId}
            onSelect={setPresenterId}
          />

          <OptionPicker
            step="3"
            title="Voice"
            subtitle="How the announcement sounds"
            query={voices}
            selectedId={voiceId}
            onSelect={setVoiceId}
          />

          <Surface>
            <SurfaceHeader title="4. Render" subtitle="Send the result to the render queue" />
            <div className="p-5 sm:p-6">
              <ActionButton
                onClick={() => render.mutate()}
                disabled={!canRender || render.isPending}
                className="disabled:opacity-50"
              >
                <Sparkles className="size-4" />
                {render.isPending ? "Queueing…" : "Send to render queue"}
              </ActionButton>
              {!canRender ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Add a script and choose a presenter and voice to continue.
                </p>
              ) : null}
              {render.error ? (
                <p className="mt-3 text-sm text-destructive">{render.error.message}</p>
              ) : null}
            </div>
          </Surface>
        </div>

        <div className="space-y-5">
          <SectionState query={usage} title="AI usage">
            {usage.data ? <AiUsageCard usage={usage.data} /> : null}
          </SectionState>
        </div>
      </div>
    </AppShell>
  );
}
