import { EventEmitter } from "events"
import { Identifier } from "@/id/id"

export type GlobalEvent = {
  directory?: string
  project?: string
  workspace?: string
  payload: any
}

type GlobalBusEvents = {
  event: [GlobalEvent]
}

class GlobalBusEmitter extends EventEmitter<GlobalBusEvents> {
  override emit(...args: Parameters<EventEmitter<GlobalBusEvents>["emit"]>): boolean {
    const [eventName, ...rest] = args
    if (eventName === "event") {
      const [event] = rest as GlobalBusEvents["event"]
      if (event.payload && typeof event.payload === "object" && !("id" in event.payload)) {
        event.payload.id = event.payload.syncEvent?.id ?? Identifier.create("evt", "ascending")
      }
    }
    return super.emit(...args)
  }
}

export const GlobalBus = new GlobalBusEmitter()
