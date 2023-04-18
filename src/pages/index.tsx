import { QrReader, OnResultFunction, } from "react-qr-reader";
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const handleQr: OnResultFunction = (result, _) => {
    if (!!result) {
      router.push(`/service/${result.getText()}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QrReader
        scanDelay={5000}
        onResult={handleQr}
        constraints={{ facingMode: "environment" }}
        className="w-48"
      />
    </main>
  );
}
