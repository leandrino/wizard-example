import React, { useState } from "react";

import { useAsync } from "../hooks/useAsync";

import { usersService } from "../services/users.service";
import { productsService } from "../services/products.service";

import { UsersList } from "./users-list";
import { ProductsList } from "./products-list";
import { Review } from "./review";

export const Wizard = () => {
  const [step, setStep] = useState(1);

  const users = useAsync(usersService);
  const products = useAsync(productsService, false);

  const firstStep = 1;
  const lastStep = 3;

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

  const renderStep = (step) => {
    switch (step) {
      case 1:
      default:
        return (
          <UsersList
            users={users.value}
            onSetUserEnabled={events.onSetUserEnabled}
          />
        );
      case 2:
        return (
          <ProductsList
            users={users.value.filter((u) => u.ativo)}
            products={products.value}
            onSetProductEnabled={events.onSetProductEnabled}
          />
        );
      case 3:
        return (
          <Review
            users={users.value.filter((u) => u.ativo)}
            products={products.value.filter((p) => p.ativo)}
          />
        );
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
      <main>{renderLoader() || renderStep(step)}</main>
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
