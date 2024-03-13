"use client";

import { useState } from "react";

export function useMutliStep(steps: number) {
    const [step, setStep] = useState(3);

    function next() {
        setStep((step) => (step + 1) % steps)
    }

    function previous() {
        setStep((step) => (step - 1 + steps) % steps)
    }

    return { step, next, previous }
}

