type Callback = (...args: any[]) => void;

function buildUrl(): string {
  const raw = import.meta.env.VITE_SERVER_URL as string | undefined;
  if (raw) {
    const ws = raw.replace(/^http/, 'ws').replace(/\/$/, '');
    return `${ws}/ws`;
  }
  const proto = location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${location.host}/ws`;
}

class WsClient {
  readonly url: string;
  private ws: WebSocket | null = null;
  private events = new Map<string, Set<Callback>>();
  private pending = new Map<string, Callback>();
  private reconnectDelay = 1000;
  private _connected = false;
  private _destroyed = false;

  constructor(url: string) { this.url = url; }

  get connected() { return this._connected; }

  connect() {
    if (this._destroyed || this.ws) return;
    const ws = new WebSocket(this.url);
    this.ws = ws;

    ws.onopen = () => {
      this._connected = true;
      this.reconnectDelay = 1000;
      this._emit('connect');
    };

    ws.onmessage = (ev) => {
      let msg: any;
      try { msg = JSON.parse(ev.data); } catch { return; }

      // Ack for a pending emit-with-callback
      if (msg.type === '_ack' && msg._reqId) {
        const cb = this.pending.get(msg._reqId);
        if (cb) { this.pending.delete(msg._reqId); cb(msg.error ?? null, msg.data); }
        return;
      }

      // Broadcast event (roomUpdate, etc.)
      this._emit(msg.type, msg.data);
    };

    ws.onclose = () => {
      this._connected = false;
      this.ws = null;
      this._emit('disconnect');
      if (!this._destroyed) {
        setTimeout(() => { this.ws = null; this.connect(); }, this.reconnectDelay);
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, 10000);
      }
    };

    ws.onerror = () => { ws.close(); };
  }

  on(event: string, cb: Callback) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event)!.add(cb);
  }

  off(event: string, cb: Callback) {
    this.events.get(event)?.delete(cb);
  }

  emit(type: string, data: any, cb?: Callback) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      if (cb) cb('not_connected', null);
      return;
    }
    const msg: any = { type, ...data };
    if (cb) {
      const reqId = crypto.randomUUID();
      msg._reqId = reqId;
      this.pending.set(reqId, cb);
    }
    this.ws.send(JSON.stringify(msg));
  }

  private _emit(event: string, ...args: any[]) {
    this.events.get(event)?.forEach(cb => cb(...args));
  }

  destroy() { this._destroyed = true; this.ws?.close(); }
}

export const socket = new WsClient(buildUrl());
socket.connect();
