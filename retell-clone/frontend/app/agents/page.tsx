"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Settings, Bot } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Agent {
  id: string;
  name: string;
  system_prompt: string;
  voice_id: string;
  language: string;
  llm_model: string;
  tools_enabled: string[];
  call_count: number;
  created_at: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    system_prompt: "You are a helpful voice AI assistant.",
    voice_id: "",
    language: "en-US",
    llm_model: "gpt-4o-mini",
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    try {
      const data = await apiClient.get("/agents");
      setAgents(data);
    } catch {
      // API not available
    }
  }

  async function createAgent(e: React.FormEvent) {
    e.preventDefault();
    try {
      await apiClient.post("/agents", formData);
      setShowForm(false);
      setFormData({
        name: "",
        system_prompt: "You are a helpful voice AI assistant.",
        voice_id: "",
        language: "en-US",
        llm_model: "gpt-4o-mini",
      });
      fetchAgents();
    } catch {
      // handle error
    }
  }

  async function deleteAgent(id: string) {
    try {
      await apiClient.del(`/agents/${id}`);
      fetchAgents();
    } catch {
      // handle error
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Agents</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Agent
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={createAgent}
          className="rounded-xl border border-[var(--border)] bg-white p-6 mb-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Agent Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2"
              placeholder="My Support Agent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              System Prompt
            </label>
            <textarea
              rows={3}
              value={formData.system_prompt}
              onChange={(e) =>
                setFormData({ ...formData, system_prompt: e.target.value })
              }
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Voice ID (ElevenLabs)
              </label>
              <input
                type="text"
                value={formData.voice_id}
                onChange={(e) =>
                  setFormData({ ...formData, voice_id: e.target.value })
                }
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LLM Model</label>
              <select
                value={formData.llm_model}
                onChange={(e) =>
                  setFormData({ ...formData, llm_model: e.target.value })
                }
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2"
              >
                <option value="gpt-4o-mini">GPT-4o Mini</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-90"
            >
              Create Agent
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-[var(--border)] px-4 py-2 rounded-lg hover:bg-[var(--muted)]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {agents.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] bg-white p-12 text-center">
          <Bot className="w-12 h-12 mx-auto mb-4 text-[var(--muted-foreground)]" />
          <h2 className="text-lg font-semibold mb-1">No agents yet</h2>
          <p className="text-[var(--muted-foreground)]">
            Create your first voice AI agent to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-[var(--border)] bg-white p-5 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {agent.llm_model} &middot; {agent.language} &middot;{" "}
                  {agent.call_count} calls
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-[var(--muted)]">
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-[var(--destructive)]"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
