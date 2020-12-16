import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline dark:text-blue-300">
              Home
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
