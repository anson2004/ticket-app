import React from "react";
import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { lable: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
  OPEN: { lable: "Open", color: "bg-red-400" },
  CLOSED: { lable: "Closed", color: "bg-green-400" },
  STARTED: { lable: "Started", color: "bg-blue-400" },
};
function TicketStatusBadge({ status }: Props) {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color}`}
    >
      {statusMap[status].lable}
    </Badge>
  );
}

export default TicketStatusBadge;
