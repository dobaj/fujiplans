import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Refetch data every n ms, Ref: https://www.youtube.com/watch?v=thQ-6hFpd4I&t=309s
export default function usePolling(ms: number) {
  const router = useRouter();
  useEffect(() => {
    const intervalId = setInterval(() => {
      router.refresh();
    }, ms);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <div>usePolling</div>;
}
