"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getUniqueCategoriesEvent } from "@/lib/utils";
import type { Event } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchFilterProps {
  events?: Event[];
}

export function EventSearchFilter({ events = [] }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || []
  );
  const [type, setType] = useState(searchParams.get("type") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = getUniqueCategoriesEvent(events);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedCategories.length > 0)
      params.set("categories", selectedCategories.join(","));
    if (type) params.set("type", type);
    if (status) params.set("status", status);

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setType("");
    setStatus("");
    router.push("");
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(handler);
  }, [selectedCategories, type, status]);

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* ... Bagian search dan filter sama persis */}
        {/* ... Anda bisa meng-copy bagian UI dari kode `SearchFilter` Anda di atas */}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <Input
              placeholder="Cari kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:w-auto w-full justify-between border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {(selectedCategories.length > 0 || type || status) && (
              <Badge
                variant="secondary"
                className="ml-2 bg-zinc-100 dark:bg-zinc-800 text-xs"
              >
                {selectedCategories.length + (type ? 1 : 0) + (status ? 1 : 0)}
              </Badge>
            )}
          </Button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isFilterOpen ? "auto" : 0,
            opacity: isFilterOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  Kategori
                </h3>
                {selectedCategories.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => setSelectedCategories([])}
                  >
                    Reset
                  </Button>
                )}
              </div>

              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between border-zinc-200 dark:border-zinc-800"
                      role="combobox"
                    >
                      {selectedCategories.length > 0
                        ? `${selectedCategories.length} kategori dipilih`
                        : "Pilih kategori"}
                      <Filter className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Cari kategori..." />
                      <CommandList>
                        <CommandEmpty>
                          Tidak ada kategori ditemukan.
                        </CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              key={category}
                              onSelect={() => toggleCategory(category)}
                              className="flex items-center"
                            >
                              <div
                                className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                                  selectedCategories.includes(category)
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-zinc-200 dark:border-zinc-700"
                                }`}
                              >
                                {selectedCategories.includes(category) && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span>{category}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="bg-zinc-100 dark:bg-zinc-800 text-xs flex items-center gap-1 pl-2 pr-1 py-1"
                  >
                    {category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full"
                      onClick={() => toggleCategory(category)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {category}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  Tipe Kelas
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={type === "private" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setType(type === "private" ? "" : "private")}
                    className={
                      type === "private"
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        : "border-zinc-200 dark:border-zinc-800"
                    }
                  >
                    Private
                  </Button>
                  <Button
                    type="button"
                    variant={type === "no private" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setType(type === "no private" ? "" : "no private")
                    }
                    className={
                      type === "no private"
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        : "border-zinc-200 dark:border-zinc-800"
                    }
                  >
                    Group
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={status === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setStatus(status === "active" ? "" : "active")
                    }
                    className={
                      status === "active"
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        : "border-zinc-200 dark:border-zinc-800"
                    }
                  >
                    Active
                  </Button>
                  <Button
                    type="button"
                    variant={status === "upcoming" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setStatus(status === "upcoming" ? "" : "upcoming")
                    }
                    className={
                      status === "upcoming"
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        : "border-zinc-200 dark:border-zinc-800"
                    }
                  >
                    Upcoming
                  </Button>
                  <Button
                    type="button"
                    variant={status === "on going" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setStatus(status === "on going" ? "" : "on going")
                    }
                    className={
                      status === "on going"
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        : "border-zinc-200 dark:border-zinc-800"
                    }
                  >
                    On Going
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="border-zinc-200 dark:border-zinc-800"
              >
                Reset Semua
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white dark:from-zinc-200 dark:to-zinc-50 dark:text-zinc-900 dark:hover:from-zinc-100 dark:hover:to-zinc-200"
              >
                <Search className="mr-2 h-4 w-4" /> Terapkan Filter
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
