"use client";

import { useState } from "react";

export default function EmiCalculator({ defaultPrice = 29500000 }: { defaultPrice?: number }) {
  const [propertyPrice, setPropertyPrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPayment;
  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    monthlyInterestRate > 0
      ? (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-xl">
      <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
        🧮 Financial Planning
      </span>
      <h3 className="mt-1 font-serif text-2xl font-bold text-white">
        EMI & Home Loan Calculator
      </h3>
      <p className="mt-1 text-xs text-slate-400">
        Calculate your monthly mortgage installments and plan your home purchase loan.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Property Price</span>
              <span className="text-teal-400">{formatCurrency(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={2000000}
              max={100000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="mt-2 w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-teal-400">{formatCurrency(downPayment)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="mt-2 w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Interest Rate (% P.A.)</span>
              <span className="text-teal-400">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={6}
              max={15}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-2 w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Loan Tenure (Years)</span>
              <span className="text-teal-400">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="mt-2 w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Results Box matching reference image */}
        <div className="flex flex-col justify-between rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-900 to-slate-950 p-6 text-center shadow-lg">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Estimated Monthly EMI
            </span>
            <div className="mt-2 font-serif text-3xl font-extrabold text-amber-300 sm:text-4xl">
              {formatCurrency(emi)} / mo
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-b border-slate-800 py-4 text-xs">
            <div>
              <span className="block text-slate-500">Loan Amount</span>
              <span className="font-semibold text-white">{formatCurrency(loanAmount)}</span>
            </div>
            <div>
              <span className="block text-slate-500">Total Interest</span>
              <span className="font-semibold text-white">{formatCurrency(totalInterest)}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/919876543210?text=Hi,%20I'd%20like%20to%20apply%20for%20a%20home%20loan%20for%20amount%20${encodeURIComponent(formatCurrency(loanAmount))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 rounded-xl bg-amber-400 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
          >
            Apply for Instant Pre-Approved Home Loan
          </a>
        </div>
      </div>
    </div>
  );
}
