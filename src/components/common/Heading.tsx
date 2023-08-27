import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ description, title }) => {
  return (
    <div className="space-y-2">
      <h1>{title}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-200 font-medium">
        {description}
      </p>
      {/* <div className="font-semibold text-xs text-neutral-800 dark:text-neutral-100">
        <span className="text-neutral-400 dark:text-neutral-50">ACTIVE</span>: 5
      </div> */}
    </div>
  );
};

export default Heading;
