"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Selection,
  DropdownItem,
  Button,
  DateRangePicker,
  RangeValue,
  DateValue,
  Chip,
} from "@nextui-org/react";

import { getIncidents } from "@/db/queries/incidents";
import { Incident } from "@/types/Incident";
import { analyticsFileds, sortDescriptors } from "@/data/analytics";
import { FaSortDown } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import moment from "moment";
import { User } from "@/types/User";

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  // filters
  const [userFilter, setUserFilter] = useState<Selection>("all");
  const [dateFilter, setdateFilter] = useState<RangeValue<DateValue> | null>(
    null
  );
  const [items, setItems] = useState<Incident[]>([]);

  const resetdata = () => {
    setdateFilter(null);
  };
  // get initial Data
  useEffect(() => {
    (async () => {
      try {
        const incidents = await getIncidents();
        setItems(incidents);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const usersList = items.reduce((acc: User[], item: Incident) => {
    if (!acc?.find((el) => el.id === item.user.id)) {
      acc.push(item?.user);
    }
    return acc;
  }, []);
  // filter Data
  const filteredItems = useMemo(() => {
    let filteredItemsArray = items.map(({ user, ...rest }) => ({
      ...rest,
      user: user.name,
    }));
    const startDate = dateFilter?.start?.toString();
    const endDate = dateFilter?.end?.toString();
    if (startDate && endDate) {
      const startDateMoment = moment(startDate);
      const endDateMoment = moment(endDate);
      filteredItemsArray = filteredItemsArray.filter(
        (item) =>
          item.startDate &&
          moment(item.startDate).isBetween(
            startDateMoment,
            endDateMoment,
            null,
            "[]"
          )
      );
    }
    if (
      userFilter !== "all" &&
      Array.from(userFilter).length !== usersList.length
    ) {
      filteredItemsArray = filteredItemsArray.filter((item) =>
        Array.from(userFilter).includes(item?.user)
      );
    }
    return filteredItemsArray;
  }, [items, userFilter, usersList, dateFilter]);

  const slaCount = filteredItems.filter((item) => item.isSLA).length;
  const slaCountPerc = +((+slaCount / +filteredItems?.length) * 100)?.toFixed(
    2
  );
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 justify-between items-center">
        <div className="flex gap-3 ">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                className="w-44"
                variant="flat"
                endContent={<FaSortDown />}
              >
                Черговий
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={userFilter}
              selectionMode="multiple"
              onSelectionChange={setUserFilter}
            >
              {usersList?.map((user, index) => (
                <DropdownItem key={user.name} className="capitalize">
                  {user.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <DateRangePicker
            hideTimeZone
            disableAnimation
            value={dateFilter}
            onChange={setdateFilter}
          />
          <Button
            variant="bordered"
            isIconOnly
            className="z-10  text-red-300 "
            onClick={resetdata}
          >
            <FaXmark />
          </Button>
        </div>
        {!!slaCountPerc && (
          <Chip>
            SLA:{" "}
            <span
              className={slaCountPerc > 93 ? "text-success-300" : "text-danger"}
            >
              {slaCountPerc}%
            </span>
          </Chip>
        )}
      </div>
      <Table
        aria-label="Example table with client side sorting"
        classNames={{
          table: "min-h-[100px]",
        }}
      >
        <TableHeader>
          {sortDescriptors.map((i) => (
            <TableColumn key={i}>{analyticsFileds[i] || i}</TableColumn>
          ))}
        </TableHeader>
        <TableBody
          items={filteredItems}
          isLoading={isLoading}
          loadingContent={<Spinner label="Дивись у Zabbix..." />}
        >
          {(item) => (
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
    </div>
  );
}
