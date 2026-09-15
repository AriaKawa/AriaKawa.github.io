import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "node:http";
import { ClimbRoom } from "./rooms/ClimbRoom.js";

const port = Number(process.env.PORT || 2567);
const httpServer = createServer((_, response) => {
  response.writeHead(200, { "content-type": "application/json", "access-control-allow-origin": "*" });
  response.end(JSON.stringify({ game: "Forge Climb Royale", status: "ready" }));
});

const gameServer = new Server({ transport: new WebSocketTransport({ server: httpServer }) });
gameServer.define("climb", ClimbRoom).filterBy(["mapId"]);

await gameServer.listen(port);
console.log(`Forge Climb Royale server ready on ws://localhost:${port}`);
