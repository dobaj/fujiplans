
import Link from "next/link";


export default function Page() {

  return (
    <div>
      <main>
        <p>hello world</p>
        <Link href={"/login"} className="mr-5">
          Login
        </Link>
        <Link href={"/register"}>Register</Link>
      </main>
    </div>
  );
}
