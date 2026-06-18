import ProductDetailPage from "../../Componant/Layout/DetailPage"
import {products} from "../../../Data/Data"


export default async function Page({ params }) {
  const { Id } = await params;



  const product = products.find(
    (item) => String(item.id) === String(Id)
  );



  return <ProductDetailPage product={product} />;
}