import Link from "next/link"

export default function NotFound() {
  return (
    <div>
        <Link href={'/'}>return home</Link>
      <p>Page not found</p>
    </div>
  );
}
