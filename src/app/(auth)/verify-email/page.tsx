"use client";
import { verifyEmailAction } from "@/actions/auth/verifyEmailAction";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hashedEmail = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    if (code.length !== 6) {
      setStatus("Code must be 6 digits");
      return;
    }
    const res = await verifyEmailAction(code, hashedEmail);
    if (res.success) {
      setStatus(res.message);
      router.push("/login")
    } else {
      setStatus(res.message);
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
