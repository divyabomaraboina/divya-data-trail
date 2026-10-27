import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page page--center">
      <p className="eyebrow">404</p>
      <h1 className="page-title">This stop isn’t on the trail.</h1>
      <Link href="/" className="btn btn--solid">Back home</Link>
    </div>
  );
}
