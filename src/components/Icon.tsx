import {
  Bike,
  Boxes,
  Briefcase,
  Car,
  Factory,
  FileText,
  HeartPulse,
  Home,
  Layers,
  MapPin,
  Network,
  Package,
  Sofa,
  Truck,
  Users,
  Warehouse,
  Zap,
  type LucideIcon,
} from "lucide-react";

const registry = {
  Bike,
  Boxes,
  Briefcase,
  Car,
  Factory,
  FileText,
  HeartPulse,
  Home,
  Layers,
  MapPin,
  Network,
  Package,
  Sofa,
  Truck,
  Users,
  Warehouse,
  Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof registry;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Cmp = registry[name];
  return <Cmp className={className} aria-hidden="true" />;
}
