import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-4xl text-accent1-primary">Page not found</h1>
      <p className="mt-5">
        The page may have moved or the link may be incorrect.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-accent1-primary px-6 py-3 text-white"
      >
        Back to home
      </Link>
    </section>
  );
}
