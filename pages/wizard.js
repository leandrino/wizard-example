import React, { useState } from "react";

import { useAsync } from "../hooks/useAsync";

import { usersService } from "../services/users.service";
import { productsService } from "../services/products.service";

import { renderStep } from "./steps/render-step";

export const Wizard = () => {
  const [step, setStep] = useState(1);

  const users = useAsync(usersService);
  const products = useAsync(productsService, false);

  const steps = Object.keys(renderStep);

  const firstStep = Number(steps[0]);
  const lastStep = Number(steps.slice(-1));

  const loadStepData = Array(lastStep + 1).fill(() => null);

  loadStepData[1] = users.execute;
  loadStepData[2] = products.execute;

  const isLoading = () => [users.status, products.status].includes("pending");

  const events = {
    onChangeStep: (step) => {
      loadStepData[step]();
      setStep(step);
    },
    onNext: () => {
      events.onChangeStep(step + 1);
    },
    onBack: () => {
      events.onChangeStep(step - 1);
    },
    onSetUserEnabled: (index, isActive) => {
      const updated = users.value.slice();
      updated[index].ativo = isActive;
      users.setValue(updated);
    },
    onSetProductEnabled: (index, isActive) => {
      const updated = products.value.slice();
      updated[index].ativo = isActive;
      products.setValue(updated);
    }
  };

  const renderLoader = () => {
    return isLoading() ? "Aguarde..." : false;
  };

  return (
    <div>
      <header>
        <h1>Wizard Exemplo</h1>
      </header>
      <main>
        {renderLoader() || renderStep[step]({ users, events, products })}
      </main>
      <br />
      <footer>
        <button
          id="voltar"
          onClick={events.onBack}
          disabled={isLoading() || step === firstStep}
        >
          voltar
        </button>
        <button
          onClick={events.onNext}
          disabled={isLoading() || step === lastStep}
        >
          Próximo Passo
        </button>
      </footer>
    </div>
  );
};
