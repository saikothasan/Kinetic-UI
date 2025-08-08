import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type PropData } from "@/data/components";

interface PropsTableProps {
  props: PropData[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return <p className="text-gray-400">No props for this component.</p>;
  }

  return (
    <div className="rounded-lg border border-white/10 bg-black/30 backdrop-blur-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b-white/10 hover:bg-white/5">
            <TableHead className="text-white">Prop</TableHead>
            <TableHead className="text-white">Type</TableHead>
            <TableHead className="text-white">Default</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name} className="border-b-white/10 hover:bg-white/5">
              <TableCell className="font-mono text-purple-300">{prop.name}</TableCell>
              <TableCell className="font-mono text-cyan-300">{prop.type}</TableCell>
              <TableCell className="font-mono text-amber-300">{prop.defaultValue || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
