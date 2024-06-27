"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { getIncidents } from "@/actions/Incident";
import { Incident, incidentKeys } from "@/types/Incident";
import { analyticsFileds } from "@/data/analytics";

const sortDescriptors: incidentKeys[] = [
  "data",
  "numberOfIncident",
  "reporter",
  "user",
  "timeRequest",
  "timeSend",
];
export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);

  const list = useAsyncList<Incident, string>({
    async load() {
      let items: Incident[] = await getIncidents();
      setIsLoading(false);

      return {
        items,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column as incidentKeys];
          let second = b[sortDescriptor.column as incidentKeys];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Example table with client side sorting"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      classNames={{
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        {sortDescriptors.map((i) => (
          <TableColumn key={i} allowsSorting>
            {analyticsFileds[i] || i}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Дивись у Zabbix..." />}
      >
        {(item: Incident) => (
          <TableRow
            key={item.numberOfIncident}
            className={`bg-gradient-radial ${
              item.isSLA ? "from-success-900" : "from-danger-900"
            }`}
          >
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
