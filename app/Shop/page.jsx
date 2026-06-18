import ProductPage from "./ProductPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPage />
    </Suspense>
  );
}