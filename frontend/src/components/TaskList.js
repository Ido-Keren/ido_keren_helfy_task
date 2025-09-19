import React, { useEffect, useMemo, useRef } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, secondsPerItem = 2, onStartEdit, onDelete, onToggleCompleted }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const lastTsRef = useRef(0);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const halfWidthRef = useRef(0);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const visibleTasks = Array.isArray(tasks) ? tasks : [];
  const duplicated = useMemo(() => [...visibleTasks, ...visibleTasks, ...visibleTasks, ...visibleTasks], [visibleTasks]);

  const animationKey = useMemo(() => visibleTasks.map(t => `${t.id}:${t.title}`).join("|"), [visibleTasks]);



  useEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      const currentOffset = offsetRef.current;
      measure();
      if (halfWidthRef.current > 0) {
        offsetRef.current = ((currentOffset % halfWidthRef.current) + halfWidthRef.current) % halfWidthRef.current * -1;
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
    });
    resizeObserver.observe(trackRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [animationKey]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    cancelAnimationFrame(animationRef.current || 0);
    lastTsRef.current = 0;
    offsetRef.current = 0;
    const speedPxPerSec = secondsPerItem > 0 ? 300 / secondsPerItem : 60;

    const step = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!pausedRef.current && trackRef.current && halfWidthRef.current > 0) {
        offsetRef.current -= speedPxPerSec * dt;
        if (-offsetRef.current >= halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        }
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationRef.current || 0);
  }, [animationKey, prefersReducedMotion, secondsPerItem]);

  if (visibleTasks.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyCard}>No tasks yet</div>
      </div>
    );
  }

  const handleStartEdit = onStartEdit;
  const handleDelete = onDelete;
  const handleToggleCompleted = onToggleCompleted;

  return (
    <div
      ref={containerRef}
      style={styles.carouselContainer}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div ref={trackRef} className="track" key={animationKey} style={styles.track}>
        {duplicated.map((task, index) => (
          <div key={`${task.id}-${index}`} style={styles.itemWrap}>
            <TaskItem
              task={task}
              onStartEdit={handleStartEdit}
              onDelete={handleDelete}
              onToggleCompleted={handleToggleCompleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  carouselContainer: {
    width: "100%",
    maxWidth: "800px",
    overflow: "hidden",
    border: "1px solid #ccc",
    borderRadius: "8px",
    margin: "20px auto",
    background: "#fff",
  },
  track: {
    display: "flex",
    willChange: "transform",
  },
  itemWrap: {
    flex: "0 0 auto",
    width: "300px",
  },
  title: { margin: 0, fontSize: "1.1rem" },
  desc: { margin: "0.5rem 0" },
  metaRow: { display: "flex", justifyContent: "space-between", color: "#555" },
  emptyContainer: {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    border: "1px dashed #ccc",
    borderRadius: "8px",
    overflow: "hidden",
  },
  emptyCard: {
    padding: "1rem",
    textAlign: "center",
    color: "#777",
  },
};

export default TaskList;
