import Register from "@/components/forms/Register";
//import Background from "@/components/common/Background";

export default function Page() {
  return (
    <main className="w-screen h-screen bg-background">
      <div className="flex h-screen w-screen px-[4rem]">
        <div className="w-[70%]" />
        <Register />
      </div>
    </main>
  );
}
