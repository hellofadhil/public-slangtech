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
import { Calendar, Users, MapPin } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Event } from "@/lib/types";
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

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusColors = {
    upcoming:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    ongoing:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
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
              src={event.image || defaultImage}
              alt={event.title}
              className={`object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className={statusColors[event.status]}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
          </div>

          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl text-zinc-900 dark:text-zinc-50">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-1">
                  {event.categoryName}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className="text-lg font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800"
              >
                {formatCurrency(event.price)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-2">
              {event.description}
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
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </span>
              </div>
              {/* <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {event.enrolled || 0} / {event.capacity} peserta
                </span>
              </div> */}
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Link href={`/event/register/${event.id}`} className="w-full">
              <Button
                className={`w-full bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200 transition-all duration-300 ${
                  isHovered ? "transform scale-105" : ""
                }`}
                disabled={
                  event.status === "completed" || event.status === "cancelled"
                }
              >
                {event.status === "completed"
                  ? "Event Selesai"
                  : event.status === "cancelled"
                  ? "Event Dibatalkan"
                  : "Daftar Sekarang"}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
            <DialogDescription>{event.categoryName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Badge variant="secondary" className={statusColors[event.status]}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <Badge
                variant="outline"
                className="text-lg font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-800"
              >
                {formatCurrency(event.price)}
              </Badge>
            </div>
            <div className="text-zinc-700 dark:text-zinc-300">
              {event.description.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-1">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {event.enrolled || 0} / {event.capacity} peserta
                </span>
              </div>
              {event.trainerName && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Pelatih:</span>
                  <span>{event.trainerName}</span>
                </div>
              )}
              {event.partnerName && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Partner:</span>
                  <span>{event.partnerName}</span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
