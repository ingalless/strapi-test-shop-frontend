import Axios from "axios";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const { data } = await Axios.get(`${process.env.STRAPI_URL}/products`);
  const paths = data.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { data } = await Axios.get(
    `${process.env.STRAPI_URL}/products?slug=${params.slug}`
  );
  return {
    props: { product: data[0] },
    revalidate: 1,
  };
}

export default function Product(props) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 text-gray-900">
      <div className="block">
        {props.product.name} - £{props.product.price.toFixed(2)}
      </div>
      <div className="block">
        <ReactMarkdown>{props.product.description}</ReactMarkdown>
      </div>
    </div>
  );
}
