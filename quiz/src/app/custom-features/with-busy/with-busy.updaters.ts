import { PartialStateUpdater } from "@ngrx/signals";
import { BusySlice } from "./with-busy.slice";

export function setBusy(): PartialStateUpdater<BusySlice> {
    return _ => ({ isBusy: true });
}

export function setIdle(): PartialStateUpdater<BusySlice> {
    return _ => ({ isBusy: false });
}

export function toggleBusy(): PartialStateUpdater<BusySlice> {
    return state => ({ isBusy: !state.isBusy });
}