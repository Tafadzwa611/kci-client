import React, { useEffect, useState } from "react";
import { Fetcher } from "../../common";

function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const [query, setQuery] = useState("");

  const formatWhen = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return ts; // backend string fallback
    return d.toLocaleString();
  };

  // IMPORTANT: use pill-badge classes to avoid clashing with navbar .badge
  const badgeClass = (actionType = "") => {
    const v = String(actionType).toLowerCase();
    if (v.includes("create") || v.includes("add")) return "pill-badge pill-badge--success";
    if (v.includes("update") || v.includes("edit")) return "pill-badge pill-badge--warning";
    if (v.includes("delete") || v.includes("remove")) return "pill-badge pill-badge--danger";
    if (v.includes("login")) return "pill-badge pill-badge--success";
    if (v.includes("logout")) return "pill-badge pill-badge--neutral";
    return "pill-badge pill-badge--neutral";
  };

  const buildTimelineText = (log) => {
    const action = log.action_name || log.action_type || "—";
    const entity = log.entity || "—";
    const when = formatWhen(log.event_timestamp) || "—";
    const actor = log.actor_name || "—";
    return `Action: ${action} | Entity: ${entity} | Performed At: ${when} | Performed By: ${actor}`;
  };

  const matchesQuery = (log, q) => {
    if (!q) return true;
    return buildTimelineText(log).toLowerCase().includes(q);
  };

  return (
    <>
      <div className="card">
        <div className="info-box">
          <span>You can use topbar for navigation.</span>
        </div>
      </div>

      <div className="card home-card">
        <div className="home-toolbar">
          <input
            className="home-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by action, entity, user..."
          />
        </div>

        <Fetcher urls={["/reportsapi/audit-trail/?page_num=1&page_size=100&latest_only=1"]}>
          {({ data }) => {
            const entries = data?.[0]?.entries || [];
            const q = query.trim().toLowerCase();
            const filtered = q ? entries.filter((log) => matchesQuery(log, q)) : entries;

            return (
              <div className="home-panel">
                <div className="home-scroll-panel">
                  <div className="home-panel-header">
                    <div className="home-panel-title">Latest Activity</div>
                    <div className="home-panel-meta">
                      Showing {filtered.length} / {entries.length}
                    </div>
                  </div>

                  <div className="home-panel-body">
                    {filtered.length === 0 ? (
                      <div className="home-empty">No activity matches your filter.</div>
                    ) : (
                      filtered.map((log) => {
                        const actionLabel = log.action_name || log.action_type || "Action";

                        return (
                          <div key={log.id} className="timeline__section">
                            <div aria-hidden="true" className="timeline-dot" />

                            <div className="timeline-content">
                              <div className="timeline-top">
                                <div className="timeline-left">
                                  <span className={badgeClass(log.action_type)}>{actionLabel}</span>
                                  <span className="timeline-entity">{log.entity || "—"}</span>
                                </div>

                                <div className="timeline-when">{formatWhen(log.event_timestamp)}</div>
                              </div>

                              {/* Full line already contains: Performed By: <name> */}
                              <div className="timeline-line">
                                Action: <span className="timeline-val">{log.action_name || log.action_type || "—"}</span>{" "}
                                | Entity: <span className="timeline-val">{log.entity || "—"}</span>{" "}
                                | Performed At:{" "}
                                <span className="timeline-val">{formatWhen(log.event_timestamp) || "—"}</span>{" "}
                                | Performed By:{" "}
                                <span className="timeline-performedby">{log.actor_name || "—"}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        </Fetcher>
      </div>
    </>
  );
}

export default Home;
