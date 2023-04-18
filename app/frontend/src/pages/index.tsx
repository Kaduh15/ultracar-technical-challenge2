import { QrReader, OnResultFunction } from "react-qr-reader";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleQr: OnResultFunction = (result, error) => {
    if (result) {
      router.push({
        pathname: `/service/${result.getText()}`,
      });
    }

    if (error) {
      console.error("🚀 ~ file: index.tsx:26 ~ Home ~ error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QrReader
        scanDelay={500}
        onResult={handleQr}
        constraints={{ facingMode: "environment" }}
        className="w-52"
      />
    </main>
  );
}
