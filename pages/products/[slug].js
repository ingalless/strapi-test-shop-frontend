import Axios from "axios";
import ReactMarkdown from "react-markdown";

export async function getStaticPaths() {
  const { data } = await Axios.get(`${process.env.STRAPI_URL}/products`);
  const paths = data.map(({ slug }) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data } = await Axios.get(
    `${process.env.STRAPI_URL}/products?slug=${params.slug}`
  );
  return {
    props: { product: data[0] },
  };
}

export default function Product(props) {
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
