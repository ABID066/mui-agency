"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) {
      setStatus("Code must be 6 digits");
      return;
    }
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, email }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("Email verified! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setStatus(data.error || "Verification failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-green-600">Email Verification</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter the 6-digit code sent to your email to verify your account.
        </p>
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-green-600 text-white font-medium py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        {status && <p className="text-center text-sm mt-4 text-red-600">{status}</p>}
      </div>
    </div>
  );
}
