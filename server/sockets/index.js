// Socket.io setup. Phase 1 only wires the connection; JWT auth middleware,
// presence (online/offline), chat and notification events come in later phases.
export const initSockets = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("disconnect", () => console.log(`Socket disconnected: ${socket.id}`));
  });
};
