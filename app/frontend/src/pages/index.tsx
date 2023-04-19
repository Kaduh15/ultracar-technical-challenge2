import { QrReader, OnResultFunction } from "react-qr-reader";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";

export default function Home() {
  const { push } = useRouter();

  const handleQr: OnResultFunction = (result, error) => {
    if (result) {
      push(`/service/${result.getText()}`)
    }
    if (error) {
      console.error("🚀 ~ file: index.tsx:26 ~ Home ~ error:", error);
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-950">
      <h1 className="font-bold text-white">Pode Escanear o QR Code do Cliente</h1>
      <QrReader
        scanDelay={500}
        onResult={handleQr}
        constraints={{ facingMode: "environment" }}
        className="w-52"
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
