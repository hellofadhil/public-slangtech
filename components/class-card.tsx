"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Class } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ClassCardProps {
  classItem: Class;
}

export default function ClassCard({ classItem }: ClassCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusColors = {
    active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    inactive: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    upcoming:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "on going":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  };

  const typeColors = {
    private:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    "no private":
      "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300",
  };

  const defaultImage = "/placeholder.svg?height=200&width=400";

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card
          className={`overflow-hidden transition-all duration-300 border-zinc-200/60 dark:border-zinc-800/60 h-full flex flex-col ${
            isHovered
              ? "shadow-lg transform border-zinc-300 dark:border-zinc-700"
              : "shadow-sm hover:shadow-md"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={classItem.image || defaultImage}
              alt={classItem.name}
              className={`object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute top-3 right-3 flex gap-2">
              <Badge
                variant="secondary"
                className={statusColors[classItem.status]}
              >
                {classItem.status.charAt(0).toUpperCase() +
                  classItem.status.slice(1)}
              </Badge>
              <Badge variant="secondary" className={typeColors[classItem.type]}>
                {classItem.type === "private" ? "Private" : "Group"}
              </Badge>
            </div>
          </div>

          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl text-zinc-900 dark:text-zinc-50">
                  {classItem.name}
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-1">
                  {classItem.category}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="text-lg font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800"
              >
                {formatCurrency(classItem.price)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-2">
              {classItem.description}
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              onClick={() => setIsDialogOpen(true)}
            >
              Selengkapnya
            </Button>

            <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(classItem.startDate)} -{" "}
                  {formatDate(classItem.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {classItem.type === "private"
                    ? "Kelas Private"
                    : "Kelas Grup"}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Link href={`/register/${classItem.id}`} className="w-full">
              <Button
                className={`w-full bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200 transition-all duration-300 ${
                  isHovered ? "transform scale-105" : ""
                }`}
              >
                Daftar Sekarang
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{classItem.name}</DialogTitle>
            <DialogDescription>{classItem.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Badge
                variant="secondary"
                className={statusColors[classItem.status]}
              >
                {classItem.status.charAt(0).toUpperCase() +
                  classItem.status.slice(1)}
              </Badge>
              <Badge variant="secondary" className={typeColors[classItem.type]}>
                {classItem.type === "private" ? "Private" : "Group"}
              </Badge>
              <Badge
                variant="outline"
                className="text-lg font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800"
              >
                {formatCurrency(classItem.price)}
              </Badge>
            </div>
            <div className="text-zinc-700 dark:text-zinc-300">
              {classItem.description.split("/n").map((paragraph, i) => (
                <p key={i} className="mb-1">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(classItem.startDate)} -{" "}
                  {formatDate(classItem.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {classItem.type === "private"
                    ? "Kelas Private"
                    : "Kelas Grup"}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
