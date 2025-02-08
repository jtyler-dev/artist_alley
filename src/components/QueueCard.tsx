import React from "react";

export interface QueueCardProps {
  id: string;
  title: string;
  description?: string;
}

export const QueueCard = () => {
  return (
    <div>
      <h1>Queue Card</h1>
    </div>
  );
};
