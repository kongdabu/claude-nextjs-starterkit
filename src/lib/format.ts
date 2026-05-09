import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(date: string | Date, pattern = "yyyy.MM.dd"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern, { locale: ko });
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, "yyyy.MM.dd HH:mm");
}

export function formatRelative(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: ko });
}
