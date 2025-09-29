import { signalStore, withMethods, withState } from "@ngrx/signals";
import { withService } from "./with-service/with-service.feature";
import { of } from "rxjs";
import { withBusy } from "./with-busy/with-busy.feature";

export interface TestSlice {
    readonly test: string;
    readonly value: number;
}

export const initialTestSlice: TestSlice = {
    test: 'test',
    value: 0, 
};

export const TestStore = signalStore(
    withState(initialTestSlice), 
    withBusy(),
    withService(() => of(42), v => ({ value: v })), 
)