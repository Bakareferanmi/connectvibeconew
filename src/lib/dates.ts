import { format, parseISO } from "date-fns";

export function formatDate(iso: string, pattern = "d MMMM yyyy") {
  return format(parseISO(iso), pattern);
}

export function formatDateShort(iso: string) {
  return format(parseISO(iso), "d MMM");
}
