"use client";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full total-balance-amount flex-center gap-2">
      <CountUp end={amount} decimal="2" prefix="$" />
    </div>
  );
};

export default AnimatedCounter;
