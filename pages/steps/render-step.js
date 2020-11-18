import React from "react";

import { ProductsList } from "./products-list";
import { Review } from "./review";
import { UsersList } from "./users-list";

export const renderStep = {
  1: ({ users, events }) => (
    <UsersList users={users.value} onSetUserEnabled={events.onSetUserEnabled} />
  ),
  2: ({ users, events, products }) => (
    <ProductsList
      users={users.value.filter((u) => u.ativo)}
      products={products.value}
      onSetProductEnabled={events.onSetProductEnabled}
    />
  ),
  3: ({ users, events, products }) => (
    <Review
      users={users.value.filter((u) => u.ativo)}
      products={products.value.filter((p) => p.ativo)}
    />
  )
};
