import React from "react";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="bg-cover bg-center bg-no-repeat min-h-screen min-w-screen" 
      style={{ backgroundImage: "url('/bg.svg')" }}
    >
      {children}
    </main>
  );
}
