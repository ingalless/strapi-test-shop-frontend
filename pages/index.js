import Axios from "axios";
import Link from "next/link";

export async function getStaticProps() {
  const { data } = await Axios.get(`${process.env.STRAPI_URL}/products`);
  return {
    props: {
      products: data,
    },
    revalidate: 1,
  };
}

export default function IndexPage({ products }) {
  return (
    <div>
      <div className="py-20 px-8">
        <h1 className="text-2xl text-gray-600 mb-4">Products</h1>
        <ul>
          {products.map((product) => (
            <li className="text-gray-800" key={product.slug}>
              <Link href={`/products/${product.slug}`}>
                <a>{product.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
