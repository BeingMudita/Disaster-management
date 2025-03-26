import React from "react";
import Marquee from "react-fast-marquee";

const AlertTicker = () => {
  return (
    <div className="alert-ticker">
      <Marquee speed={60} gradient={false}>
        🚨 Earthquake in California | 🌊 Tsunami Warning in Japan | 🔥 Wildfires in Australia | 🌪️ Tornado in Texas | ⚡ Power Outage in New York |
      </Marquee>
    </div>
  );
};

export default AlertTicker;
